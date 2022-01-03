
<template>
<div>
	<button  @click="getVideo" class="w-full  max-w-lg  py-2 mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium hover:border-green">
		<loadingSpinner v-if="loading">loading...</loadingSpinner>
		<span-ru-en v-else ru="Смотреть Трейлер" en="Play Trailer"/>
		
	</button>

	<div v-if="!!movie.videos || openPlayer " :class="{ hidden : !openPlayer}" class="rounded-md border border-gray p2">
		<iframe id="ytplayer" type="text/html" class="youtube-player"
		:src="`https://www.youtube.com/embed/${movie.videos[0].key}`"
		frameborder="0"/>
		<button @click="closePlayer" class=" py-2 px-2  rounded-md border border-gray cursor-pointer font-medium "> close Player</button>
	</div>

</div>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
data(){
	return {
		loading:false,
		openPlayer:false
	}
},
computed : {
		...mapGetters( 
		{
			movie:'movie/getMovie',
		},
	),
	},
    props: {
    id: {
    type: Number,
    required: true,
    }
	},
methods	: {
	getVideo:  function () {
		if (!!this.movie.videos){
			this.openPlayer=true;
			return
		}
		this.loading=true;
		this.$store.dispatch('movie/axiosMovieVideos', this.id )
		.then(() => {
			this.loading=false;
			this.openPlayer=true;
		})
	},
		closePlayer:  function () {
			this.openPlayer=false;
		}
},

		

}

</script>

<style>
.youtube-player{
	width: 100%;
	height: 100%;

	max-height: 600px;
	max-width: 100%;
}

</style>