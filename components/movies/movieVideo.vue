
<template>
<div>
	<button>
		Play Trailer
	</button>
	
	<div>
		<iframe id="ytplayer" type="text/html" width="640" height="360"
		:src="`https://www.youtube.com/embed/${id}`"
		frameborder="0"/>
	</div>
</div>



</template>

<script>

export default {

methods	: {
	gg:  function () {
		this.id
		context.store.dispatch('movie/axiosMovieVideos',context.route.params.pathMatch )
	}
}

}

</script>

<style>


</style>