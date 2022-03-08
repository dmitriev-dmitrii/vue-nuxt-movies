<template>

<div class="">
	<div class=" rounded-lg overflow-hidden mb-6  flex  flex-col items-center  justify-between md:flex-row-reverse md:items-stretch relative z-10">
<div class="my-bg rounded-lg overflow-hidden  hidden xl:block"
:style="`
    background: linear-gradient(to right ,rgba(255, 255, 255, 1)40% , rgba(255, 255, 255, 0.9)45%,  rgba(255, 255, 255, 0.0)60% ), no-repeat  url(https://image.tmdb.org//t/p/original//${tv.backdrop_path}) ;
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
			
			<h1  :title="tv.name" class="  font-bold text-3xl md:text-4xl lg:text-5xl font-heading mb-4 xl:max-w-xs capitalize"> 
				<span v-if="!!tv.name" >{{ tv.name }}</span>
				<span v-else > {{ tv.title }}</span>
			</h1>

			<h2  class="text-lg font-bold mb-4"><span-ru-en ru=' О фильме :' en =' About Movie :'/> </h2>
			
			<ul>
				<h3 class="font-medium "><span-ru-en ru='Жанры:' en ='Genres :'/></h3>
				<li v-for="genre in tv.genres" :key=genre.id class="ml-2">
					{{genre.name}}
				</li>
				<!-- <div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green ">{{ tv.vote_average }}</div> -->
				<li class="mb-2"><span-ru-en class="font-medium" ru='Оценка Пользователей:' en ='Vote Average:'/>{{ tv.vote_average }}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Язык Оригинала:' en ='Original Language:'/> {{tv.original_language}}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Статус:' en ='Status:'/> {{tv.status}}</li>
				<li class="mb-2" v-if="!!tv.belongs_to_collection"><span-ru-en class="font-medium" ru='Входит в коллекцию:' en ='Collection:'/><NuxtLink class="border border-green bg-green-light p-1 rounded-md" :to="`/collection/${tv.belongs_to_collection.id}`">{{tv.belongs_to_collection.name}}</NuxtLink></li>
			</ul>

		</div>
			<defalutImage :type="'movie'" :srcset="`https://image.tmdb.org//t/p/w400/${tv.poster_path}`" :src="`https://image.tmdb.org//t/p/original/${tv.poster_path}`"   :alt="`${tv.title}`"   class="movie__avatar border-b border-gray w-full max-w-xs  overflow-hidden  rounded-lg shadow-md" />
	</div>
<appPlayer type='tv' :id=tv.id />
<appDetails >
	<span-ru-en slot="summary" ru="Описание" en="Overview" />
	{{ tv.overview }}
</appDetails>

<div class="pt-8" v-if="!!tv.created_by">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Cоздатели" en="Created By:" /> </h3>
	<small-persons-list :personsList="tv.created_by"></small-persons-list>
</div> 

<div v-if="tv.seasons"  class="grid  gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	<div v-for="item in tv.seasons" :key="item.id" >
		<seasonItem :item='item' />
	</div>
</div>

<!-- <div class="pt-8" v-if="!!tv.credits.cast">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Актёрский состав" en="Acting" /> </h3>
	<small-persons-list :personsList="tv.credits.cast"></small-persons-list>
</div>   -->

</div>

</template>


<script>
import appDetails from '@/components/ui/app-details'
import seasonItem from '@/components/tv/season-item'
import appPlayer from '@/components/ui/app-player';

import {mapGetters} from 'vuex'

export default { 
	components:{appDetails,seasonItem,appPlayer},

	computed : {
		...mapGetters( 
			{
				tv:'tv/item/getTv',
			},
		),
	},
	validate({ params }) {
		return /^\d+$/.test(params.id)
	},
	async fetch (context) {
		try {
			const id = context.route.params.id ;
			await context.store.dispatch('tv/item/axiosTv', id )
		} 
		catch (error) {
			console.log(error);
		}
	},
}
</script>