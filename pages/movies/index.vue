<template>
<div >
	
	<h1 class=" font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Фильмы" en="Movies"/>
	</h1>

	<div class="flex flex-wrap mb-4 mt-4">
		<movies-types-input v-for=" movieType  in this.$store.state.movies.list.moviesTypes" :key="movieType.name" :movieType='movieType.name' />
	</div> 
	
	<div>
		<div v-for="movieType , index in this.$store.state.movies.list.moviesTypes" :key="movieType.name" :class="{ hidden : movieType.name !== currentMoviesType }"  >
			
			<div class="grid grid-cols-1 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" >

				<movie-card v-for="movie in movieType.moviesList" :key="movie.id" :movie='movie'/>

				<div class=" rounded-lg  border border-gray font-bold  overflow-hidden flex justify-center items-center flex-col text-3xl hover:bg-green-light transition ease-in-out  "
					:class="{hidden : movieType.pagesLoadedCounter == movieType.totalPages}">
						<button v-if="!movieCardIsloading" :class="loadMoreBtnStyles" @click="loadMoreData (index)" > <nuxtIcon></nuxtIcon>  load <br> More   </button>
						<span v-else :class="loadMoreBtnStyles"> <loadingSpinner /> Loading...</span>
				</div>
			</div>
		</div>
	</div>

</div>

</template>

<script>

import { mapGetters } from 'vuex';
import movieCard from '@/components/movies/movie-card.vue';  
import nuxtIcon from '@/components/icons/nuxt-icon'
import loadingSpinner from "@/components/ui/loading-spinner";

export default {
	components: { movieCard , nuxtIcon,loadingSpinner},
	data:  () =>{
    return {
		loadMoreBtnStyles: ['flex' ,'justify-center', 'items-center ','flex-col','h-full',' w-full',' p-4','font-bold', 'text-green', 'hover:shadow-inner']
		}
	},
	computed : {
		...mapGetters( 
			{
				currentMoviesType:'movies/list/getCurrentMoviesType',
				movieCardIsloading:'movies/list/getMovieCardIsLoading'
			}
		),
	},

methods: {
	loadMoreData (movieTypeIndex) {
    this.$store.dispatch('movies/list/axiosMovies', movieTypeIndex )
}

},

	async fetch (context) {

		for (let index = 0; index < context.store.state.movies.list.moviesTypes.length; index++) {
			await context.store.dispatch('movies/list/axiosMovies', [index] )
		}

	},
	

}
</script>

