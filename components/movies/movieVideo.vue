
<template>
<div >
	<button  @click="getVideo" class="w-full  max-w-lg  py-2 mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium hover:border-green">
		<loadingSpinner v-if="loading">loading...</loadingSpinner>
		<span-ru-en v-else ru="Смотреть Трейлер" en="Play Trailer"/>
	</button>

	<div v-if="!!movie.videos || openPlayer " :class="{ hidden : !openPlayer}" class="youtube-player__wrapper rounded-md border border-gray">
		<button @click="closePlayer" class="cursor-pointer font-medium youtube-player__close-btn">  </button>
		<iframe id="ytplayer" type="text/html" class="youtube-player" allowfullscreen="true"
		:src="`https://www.youtube.com/embed/${movie.videos[0].key}`"
		frameborder="0"/>
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
.youtube-player__wrapper{

margin: 2rem auto;
overflow: hidden;

display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
	width: 100%;
	height: 100%;

	max-height: 400px;
	max-width: 600px;
}
.youtube-player{
	width: 100%;
	height: 100%;


}
.youtube-player__close-btn
{
	align-self: flex-end;
	margin: .25rem;
	background-color:red;
	color: white;
	height: 1.5rem;
	width: 1.5rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1px solid white;
	border-radius: 50%;
	position: relative;
	transition: all .2s linear;
}
.youtube-player__close-btn:hover{
		box-shadow: 0 0 3px 1px red;
}
.youtube-player__close-btn::before,.youtube-player__close-btn::after{
	content: '';
	position: absolute;
	display: block;
	height: 2px;
	width: 50%;
	background-color: #fff;
	top: 50%;
	left: 50%;


}
.youtube-player__close-btn::after
{
	transform: translateX(-50%)translateY(-50%)rotate(-45deg);
}
.youtube-player__close-btn::before
{
		transform: translateX(-50%)translateY(-50%) rotate(45deg);
}
</style>