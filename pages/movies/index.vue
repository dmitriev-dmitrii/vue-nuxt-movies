<template>
<div class="" style="content-visibility:auto;">
	
	<h1 class=" font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Фильмы" en="Movies"/>
	</h1>

	<div class="flex flex-wrap mb-4 mt-4">
		<movies-types-input v-for=" movieType  in this.$store.state.movies.moviesTypes" :key="movieType.name" :movieType='movieType.name' />
	</div>
	
	<div>
		<div v-for="movieType , index in this.$store.state.movies.moviesTypes" :key="movieType.name" :class="{ hidden : movieType.name !== currentMoviesType }"  >
			
			<div class="grid grid-cols-1 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" >

				<movie-card v-for="movie in movieType.moviesList" :key="movie.id" :movie='movie'/>

				<div class=" rounded-lg  border border-gray font-bold  overflow-hidden flex justify-center items-center flex-col text-3xl hover:bg-green-light transition ease-in-out  "
					:class="{hidden : movieType.pagesLoadedCounter == movieType.totalPages}">
						<button v-if="!movieCardIsloading" class="flex justify-center items-center flex-col   h-full w-full font-bold text-green hover:shadow-inner" @click="loadMoreData (index)" > <nuxtIcon></nuxtIcon>  load <br> More   </button>
						<span v-else class="flex justify-center items-center flex-col h-full w-full  "><loadingSpinner  />Loading...</span>
				</div>
			</div>
		</div>
</div>

</div>

</template>

<script>

import { mapGetters } from 'vuex';
import movieCard from '../../components/movies/movieCard.vue';

export default {
  components: { movieCard },

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
	

}
</script>

