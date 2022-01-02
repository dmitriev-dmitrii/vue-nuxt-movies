<template>

<div >
	<div class=" rounded-lg overflow-hidden mb-6  flex  flex-col items-center  justify-between md:flex-row-reverse md:items-stretch relative z-10">
<div class="my-bg rounded-lg overflow-hidden  hidden xl:block"
:style="`
background: linear-gradient(to right ,rgba(255, 255, 255, 1)40% , rgba(255, 255, 255, 0.9)45%,  rgba(255, 255, 255, 0.0)60% ), no-repeat  url(https://image.tmdb.org//t/p/original//${movie.backdrop_path}) ;
position: absolute;
width: 100%;
height: 100%;
left: 0;

top: 0;
z-index: -1;
background-size: auto 100% ;
background-position: 100% 100% ;
`">
</div>

		<div class="flex flex-col justify-center items-center p-4 w-full md:pl-8 md:justify-start md:items-start  ">
			
			<h1 :title="movie.name" class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading mb-4 xl:max-w-xs"> 
				<span v-if="!!movie.name" >{{ movie.name }}</span>
				<span v-else > {{ movie.title }}</span>
			</h1>

			<h2  class="text-lg font-bold mb-4"><span-ru-en ru=' О фильме :' en =' About Movie :'/> </h2>
			
			<ul>
				<h3 class="font-medium "><span-ru-en ru='Жанры:' en ='Genres :'/></h3>
				<li v-for="genre in movie.genres" :key=genre.id class="ml-2">
					{{genre.name}}
				</li>
				
				<li class="mb-2"><span-ru-en class="font-medium" ru='Оценка Пользователей:' en ='Vote Average:'/>{{ movie.vote_average }}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Язык Оригинала:' en ='Original Language:'/> {{movie.original_language}}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Статус:' en ='Status:'/> {{movie.status}}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Дата релиза:' en ='Release Date:'/> {{movie.release_date}}</li>
				<li class="mb-2" v-if="!!movie.belongs_to_collection"><span-ru-en class="font-medium" ru='Входит в коллекцию:' en ='Collection:'/><NuxtLink class="border-b border-green" :to="`/collection/${movie.belongs_to_collection.id}`">{{movie.belongs_to_collection.name}}</NuxtLink></li>
			</ul>

		</div>
			<img  
			:src="`https://image.tmdb.org//t/p/w150_and_h225_bestv2/${movie.poster_path}`" 
			:srcset="`https://image.tmdb.org//t/p/original/${movie.poster_path}`"
			:alt="`${movie.title}`"
			class="object-center object-cover border-b border-gray rounded-lg max-w-xs shadow-md"/>
	</div>

<iframe id="ytplayer" type="text/html" width="640" height="360"
	:src="`http://www.youtube.com/embed/${movie.videos[0].key}`"
	frameborder="0"/>


	<details v-if="movie.overview" class="mt-4 mb-4 text-sm">
		<summary>
        <span-ru-en ru="Описание" en="Overview" />
		</summary>
		{{ movie.overview }}
    </details>

<h1> cast {{!!movie.credits.cast}}</h1> -->
<div class="pt-8" v-if="!!movie.credits.cast">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Актёрский состав" en="Acting" /> </h3>
	<small-persons-list :personsList="movie.credits.cast"></small-persons-list>
</div> 
<h1>crew {{!!movie.credits.crew}}</h1>
<div class="pt-8" v-if="!!movie.credits.crew">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Команда" en="Crew" /> </h3>
	<small-persons-list :personsList="movie.credits.crew"></small-persons-list>
</div> 


</div>

</template>

<script>

import { mapGetters } from 'vuex';
import SmallMoviesList from '@/components/SmallMoviesList.vue';
import SmallPersonsList from '@/components/SmallPersonsList.vue';
import SpanRuEn from '@/components/SpanRu-En.vue';

export default {
  components: { SpanRuEn, SmallMoviesList, SmallPersonsList },

	computed : {
		...mapGetters( 
			{
				movie:'movie/getMovie',
			},

		),

	},


validate ({route}) {
    // Must be a number
	    const currentPage = route.params.pathMatch;
		// возвращает цифру в url после  persons/1 или ничего если url persons/  страница откроется, 
		// если в url лишние символы кроме цифр кидаем на 404
		return /^\d+$/.test(currentPage)||!currentPage;
    },

	async fetch (context) {
        await context.store.dispatch('movie/axiosMovie',context.route.params.pathMatch )
		await context.store.dispatch('movie/axiosMovieCredits',context.route.params.pathMatch )
		await context.store.dispatch('movie/axiosMovieVideos',context.route.params.pathMatch )
	},

	// async data (context) {
	// 	await context.store.dispatch('movie/axiosMovieVideos',context.route.params.pathMatch )
	// },

}
</script>

<style >

.my-bg{ 

/* background: no-repeat  url("@/static/123.jpg") ;

position: absolute;
width: 100%;
height: 100%;

left: 0;
top: 0;
z-index: -1;

background-size: auto 100% ;
background-position: right; */

animation: my-bg-slide 2s  ;

}
@keyframes my-bg-slide {
0% {
transform: translateX(-100%) ;
opacity: 0;
}
60%  {
	transform: translateX(0%) ;
	opacity: .3;
}
100%  {
    
	opacity: 1;
}

}

</style>