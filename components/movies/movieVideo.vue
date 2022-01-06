
<template>
<div >
	
	<button  @click="getVideo" class="w-full  max-w-lg  py-2 mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium hover:border-green">
		<loadingSpinner v-if="loading">loading...</loadingSpinner>
		<span-ru-en v-else ru="Смотреть Трейлер" en="Play Trailer"/>
	</button>

	
	<div v-show="!!movie.videos"  :class="{ 'hidden-player' : !openPlayer}" class="youtube-player__wrapper p-2">
	<div class="w-full max-w-7xl flex justify-centr sm:justify-end">
		<button @click="closePlayer" class="w-full  max-w-xs py-2  rounded-md border text-green cursor-pointer font-medium border-green "> close Player </button>
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
		openPlayer:false,
		player:''
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
			this.player.playVideo();
			return
		}

		this.loading=true;
		this.$store.dispatch('movie/axiosMovieVideos', this.id )

		.then(() => {
			this.player = YouTubePlayer('youtube-player');
			this.player.loadVideoById(this.movie.videos[0].key)

			this.loading=false;
			this.openPlayer=true;
			
			this.player.playVideo();
		
		})
	},


		closePlayer:  function () {
			this.openPlayer=false;
			this.player.stopVideo();
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

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

overflow: hidden;

background-color: rgba(22, 22, 22, 1);
width: 100vw;
height: 100vh;
}

#youtube-player{
	overflow:hidden;
	width: 100%;
	height: 100%;
	max-height: 555px;
}



.hidden-player{
display: none;
}

</style>