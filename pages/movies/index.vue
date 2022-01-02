<template>
<div class="w-full" style="content-visibility:auto;">
	
	<h1 class=" font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Фильмы" en="Movies"/>
	</h1>

	<div class="flex flex-wrap mb-4 mt-4">
		<movies-types-input v-for=" movieType  in this.$store.state.movies.moviesTypes" :key="movieType.name" :movieType='movieType.name' />
	</div>
	
	<div>
		<div v-for="movieType , index in this.$store.state.movies.moviesTypes" :key="movieType.name" :class="{ hidden : movieType.name !== currentMoviesType }"  >
			
			<div class="grid grid-cols-1 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" >
				<moviesCard v-for="movie in movieType.moviesList" :key="movie.id" :movie='movie'/>
				<div class=" rounded-lg h-58 border border-gray font-bold  overflow-hidden flex justify-center items-center flex-col text-3xl" >
						<span v-if="movieCardIsloading" >Loading...</span>
						<loadingSpinner v-if="movieCardIsloading" />
						<button v-else class="h-full w-full font-bold text-green hover:shadow-inner" @click="loadMoreData (index)" >load <br> More </button>
				</div>
			</div>
		</div>
</div>

</div>

</template>

<script>

import { mapGetters } from 'vuex';
import moviesTypesInput from '@/components/movies/moviesTypesInput.vue';
import moviesCard from '@/components/movies/movieCard.vue';
import loadingSpinner from '@/components/loadingSpinner.vue';

export default {
components: { moviesTypesInput,moviesCard ,loadingSpinner },

	computed : {
		...mapGetters( 
			{
				currentMoviesType:'movies/getCurrentMoviesType',
				movieCardIsloading:'movies/getMovieCardIsLoading'
			}
		),
	},

methods: {
	loadMoreData (movieTypeIndex) {
    this.$store.dispatch('movies/axiosMovies', movieTypeIndex )
}

},

	async fetch (context) {

		for (let index = 0; index < context.store.state.movies.moviesTypes.length; index++) {
			await context.store.dispatch('movies/axiosMovies', [index] )
		}

	},
	
// validate ({route}) {
//     // Must be a number
// 	    const currentPage = route.params.pathMatch;
// 		// возвращает цифру в url после  persons/1 или ничего если url persons/  страница откроется, 
// 		// если в url лишние символы кроме цифр кидаем на 404
// 		return /^\d+$/.test(currentPage)||!currentPage;
//     },

	// async fetch (context) {
    //     await context.store.dispatch('movies/axiosMovies', 1 )
	// },

}
</script>

