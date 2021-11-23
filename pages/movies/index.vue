<template>
<div class="w-full" style="content-visibility:auto;">
	
	<h1 class=" font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Фильмы" en="Movies"/>
	</h1>

<div class="flex flex-wrap mb-4 mt-4">
	
		<input id="popular" class="hidden" checked name="moviesType" type="radio" value="popular" @input="updateMoviseType">
		<label for="popular" :class=moviesTypeButtonSyles> 
		<span-ru-en ru="Популярные" en="Popular"/>
        </label>

		<input id="top_rated" class="hidden" name="moviesType" type="radio" value="top_rated" @input="updateMoviseType">
	<label for="top_rated" :class=moviesTypeButtonSyles> 	
		<span-ru-en ru="Лучшие в Рейтинге" en="Top Rated"/>
	</label>

		<input id="upcoming" class="hidden" name="moviesType" type="radio" value="upcoming" @input="updateMoviseType">
			<label for="upcoming" :class=moviesTypeButtonSyles> 
		<span-ru-en ru="Самые Ожидаемые" en="Upcoming"/>
	</label>

	<input id="now_playing" class="hidden" name="moviesType" type="radio" value="now_playing" @input="updateMoviseType">
	<label for="now_playing" :class=moviesTypeButtonSyles> 
		<span-ru-en ru="Сейчас Cмотрят" en="Now Playing"/>
	</label>

</div>


<div class="grid grid-cols-1 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" >

    <NuxtLink  :to="`/movies/${movie.id}`"
      class=" rounded-lg h-58 border border-gray overflow-hidden flex justify-between sm:flex-col sm:justify-between"
      v-for="movie in movies" :key="movie.id">
        <img loading="lazy" 
        :src="`https://image.tmdb.org//t/p/w150_and_h225_bestv2/${movie.poster_path}`" 
        :srcset="`https://image.tmdb.org//t/p/original/${movie.poster_path}`"
        :alt="`${movie.title}`"
        class="object-center object-cover h-64 border-b border-gray  max-w-md"/>
        <div class="flex flex-col  justify-between items-center  overflow-hidden w-full  p-2 sm:relative sm:overflow-visible ">
          <div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green sm:absolute top-0 right-0 transform -translate-y-full">{{ movie.vote_average }}</div>
          <h4 v-if="!!movie.name" :title="movie.name" class="font-medium  sm:truncate text-center p-1"> {{ movie.name }}</h4>
          <h4 v-else :title="movie.title" class="font-medium  sm:truncate text-center p-1" > {{ movie.title }} </h4>
          <div class="text-sm">{{movie.release_date}}</div>
        </div>
		</NuxtLink>

</div>


</div>

</template>

<script>

import { mapGetters } from 'vuex';


export default {
data(){
	return {
		moviesTypeButtonSyles:'pr-2 pl-2 pt pb mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium',
	}
},
	computed : {
		...mapGetters( 
			{
				movies:'movies/getMovies',
				moviesType:'movies/getMoviesType',
			}
		),
	},

methods: {
updateMoviseType (e) {
	this.$store.commit('movies/mutateMoviesType', e.target.value)
    this.$store.dispatch('movies/axiosMovies',1 )
}
},

// validate ({route}) {
//     // Must be a number
// 	    const currentPage = route.params.pathMatch;
// 		// возвращает цифру в url после  persons/1 или ничего если url persons/  страница откроется, 
// 		// если в url лишние символы кроме цифр кидаем на 404
// 		return /^\d+$/.test(currentPage)||!currentPage;
//     },

	async fetch (context) {
        await context.store.dispatch('movies/axiosMovies',1 )
	},
}
</script>

<style>

input[type=radio]:checked + label {
	border-color: #00DC82;
	box-shadow:  0 0  2px 2px #00DC82 inset;
}

</style>