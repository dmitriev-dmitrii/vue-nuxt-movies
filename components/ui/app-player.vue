
<template>
<div @keyup.esc="closePlayer">
	
	<button  @click="getVideo" @keyup.esc="closePlayer" :disabled=!!videosError  class="w-full  max-w-lg  py-2 mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray  cursor-pointer font-medium  hover:border-green  hover:bg-green-light  transition ease-in-out" :class="{ 'border-red hover:border-red focus:border-red pointer-events-none opacity-50': videosError }">
		<span-ru-en v-if="!loading&!videosError" ru="Смотреть Трейлер" en="Play Trailer"/>
		<loading-spinner v-if="loading">loading...</loading-spinner>
		<span-ru-en v-if="videosError" class="text-red" ru="Трейлер Отсутвует" en="Trailer is Missing"/>
	</button>

	<div v-show="!!videos"  :class="{ 'hidden-player' : !openPlayer}" @click="closePlayer" class="youtube-player__wrapper p-2 flex flex-col-reverse md:flex-col items-center justify-center">
	<div class="w-full max-w-7xl flex justify-centr sm:justify-end">
		<button @click="closePlayer" class="w-full   py-2  rounded-md border text-green cursor-pointer font-medium border-green "> close Player </button>
	</div>
	<div id="youtube-player" class="rounded-md max-w-7xl" @keyup.esc="closePlayer">
	
	</div>
	</div>

</div>

</template>

<script>
import { mapGetters } from 'vuex';
import YouTubePlayer from 'youtube-player';
import loadingSpinner from '@/components/ui/loading-spinner'
export default {
components:{loadingSpinner},
data(){
	return {
		loading:false,
		videosError:false,
		openPlayer:false,
		player:{}
	}
},
computed : {
		...mapGetters( 
		{
			videos:'app-player/getVideos',
		},
	),
	},
    props: {
    id: {
		type: Number,
		required: true,
		},
	type: {
		type: String,
		default: 'movie',
		},
	},
methods	: {
	getVideo:  function () {


		this.loading=true;
		this.$store.dispatch('app-player/axiosVideos', { id:this.id , type:this.type })
		.then(() => {
			this.Play()
		})
	},

	Play:  function () {
			try
			{

			this.player = YouTubePlayer('youtube-player');

				this.player.loadVideoById( this.videos[0].key  )
				this.openPlayer=true;
				this.player.playVideo();
			
			}
			catch(e){
				console.log(e);
				this.erorTrailer();
			}
			finally {
				this.loading=false;
			}
		},

		closePlayer:  function () {
			this.openPlayer=false;
			this.player.stopVideo();
		},

		erorTrailer:  function () {
			this.openPlayer=false;
			this.player.stopVideo();
			this.loading=false;
			this.videosError = true;
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