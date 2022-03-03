
<template>
<div @keyup.esc="closePlayer">
	
	<button  @click="getVideo" @keyup.esc="closePlayer" :disabled=!!movieError  class="w-full  max-w-lg  py-2 mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium  hover:border-green  hover:bg-green-light transition ease-in-out" :class="{ 'border-red pointer-events-none opacity-50': movieError }">
		<span-ru-en v-if="!loading&!movieError" ru="Смотреть Трейлер" en="Play Trailer"/>
		<loadingSpinner v-if="loading">loading...</loadingSpinner>
		<span-ru-en v-if="movieError" class="text-red" ru="Трейлер Отсутвует" en="Trailer is Missing"/>
	</button>

	<div v-show="!!movie.videos"  :class="{ 'hidden-player' : !openPlayer}" @click="closePlayer" class="youtube-player__wrapper p-2 flex flex-col-reverse md:flex-col items-center justify-center">
	<div class="w-full max-w-7xl flex justify-centr sm:justify-end">
		<button @click="closePlayer" class="w-full   py-2  rounded-md border text-green cursor-pointer font-medium border-green "> close Player </button>
	</div>
	<div id="youtube-player" class="rounded-md max-w-7xl">
	
	</div>
	</div>

</div>

</template>

<script>
import { mapGetters } from 'vuex';
import YouTubePlayer from 'youtube-player';

export default {
data(){
	return {
		loading:false,
		movieError:false,
		openPlayer:false,
		player:''
	}
},
computed : {
		...mapGetters( 
		{
			movie:'movies/page/getMovie',
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
			this.player.playVideo();
			return
		}

		this.loading=true;
		this.$store.dispatch('movies/page/axiosMovieVideos', this.id )
		.then(() => {
			try
			{
			this.player = YouTubePlayer('youtube-player');
			// Final Trailer
			let youTubePlayerKey ;

			const trailerObj = () => {

				for (const item of this.movie.videos) {
					if (item.type == 'Trailer') return item;
				}
				return false
			}
			

			youTubePlayerKey = !!trailerObj() ? trailerObj().key  :  this.movie.videos[0].key


			this.player.loadVideoById(youTubePlayerKey)
			this.loading=false;
			this.openPlayer=true;
			
			this.player.playVideo();
			
			}
			catch {
			this.erorTrailer();
			}
		})

	},


		closePlayer:  function () {
			this.openPlayer=false;
			this.player.stopVideo();
		},

		erorTrailer:  function () {
			this.openPlayer=false;
			this.player.stopVideo();
			this.loading=false;
			this.movieError = true;
			
		},

}
}

</script>

<style>

.youtube-player__wrapper{
position: fixed;
z-index: 999999;

top:0;
left: 0;

overflow: hidden;

background-color: rgba(22, 22, 22, 1);
width: 100vw;
height:100%;
}

#youtube-player{
	overflow:hidden;
	width: 100%;
	height: 100%;
	min-height: 300px;
	max-height: 555px;
}

.hidden-player{
display: none;
}

</style>