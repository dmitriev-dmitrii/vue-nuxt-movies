<template>

<div class="">
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

		<div class=" txt-shadow flex flex-col justify-center items-center p-4 w-full md:pl-8 md:justify-start md:items-start  ">
			
			<h1  :title="movie.name" class="  font-bold text-3xl md:text-4xl lg:text-5xl font-heading mb-4 xl:max-w-xs capitalize"> 
				<span v-if="!!movie.name" >{{ movie.name }}</span>
				<span v-else > {{ movie.title }}</span>
			</h1>

			<h2  class="text-lg font-bold mb-4"><span-ru-en ru=' О фильме :' en =' About Movie :'/> </h2>
			
			<ul>
				<h3 class="font-medium "><span-ru-en ru='Жанры:' en ='Genres :'/></h3>
				<li v-for="genre in movie.genres" :key=genre.id class="ml-2">
					{{genre.name}}
				</li>
				<!-- <div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green ">{{ movie.vote_average }}</div> -->
				<li class="mb-2"><span-ru-en class="font-medium" ru='Оценка Пользователей:' en ='Vote Average:'/>{{ movie.vote_average }}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Язык Оригинала:' en ='Original Language:'/> {{movie.original_language}}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Статус:' en ='Status:'/> {{movie.status}}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Дата релиза:' en ='Release Date:'/> {{movie.release_date}}</li>
				<li class="mb-2" v-if="!!movie.belongs_to_collection"><span-ru-en class="font-medium" ru='Входит в коллекцию:' en ='Collection:'/><NuxtLink class="border border-green bg-green-light p-1 rounded-md" :to="`/collection/${movie.belongs_to_collection.id}`">{{movie.belongs_to_collection.name}}</NuxtLink></li>
			</ul>

		</div>
			<defalutImage :type="'movie'" :srcset="`https://image.tmdb.org//t/p/w400/${movie.poster_path}`" :src="`https://image.tmdb.org//t/p/original/${movie.poster_path}`"   :alt="`${movie.title}`"   class="movie__avatar border-b border-gray w-full max-w-xs  overflow-hidden  rounded-lg shadow-md" />
	</div>

<movie-player   :id='movie.id' />

<appDetails >
	<span-ru-en slot="summary" ru="Описание" en="Overview" />
	{{ movie.overview }}
</appDetails>

<div class="pt-8" v-if="!!movie.credits.cast">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Актёрский состав" en="Acting" /> </h3>
	<small-persons-list :personsList="movie.credits.cast"></small-persons-list>
</div>  

<div class="pt-8" v-if="!!movie.credits.crew">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Команда" en="Crew" /> </h3>
	<small-persons-list :personsList="movie.credits.crew"></small-persons-list>
</div> 

</div>

</template>

<script>

import { mapGetters } from 'vuex';
import moviePlayer from '@/components/movies/movie-player';
import appDetails from "@/components/ui/app-details";


export default {
components:{moviePlayer,appDetails},
	computed : {
		...mapGetters( 
			{
				movie:'movies/page/getMovie',
			},

		),

	},

	validate({ params }) {
    // Must be a number
    	return /^\d+$/.test(params.id)
	}
	,
	async fetch (context) {
		const id = context.route.params.id ;
        await context.store.dispatch('movies/page/axiosMovie', id );
	},

}
</script>

<style >
.movie__avatar {
	min-height:480px;
}
.txt-shadow{
	text-shadow: 0px 0 5px #fff;
}
.my-bg{ 

animation: my-bg-slide 2s  ;

}
@keyframes my-bg-slide {
0% {
transform: translateX(-100%)  ;
opacity: 0;
}
90%  {
	transform: translateX(0%)   ;
	opacity: 0.05;
}
100%  {
	opacity: 1;
}

}

</style>