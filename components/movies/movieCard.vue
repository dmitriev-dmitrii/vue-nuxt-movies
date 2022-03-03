
<template>
<div>
<NuxtLink  :to="`/movies/${movie.id}`" class=" rounded-lg h-58 border border-gray hover:border-green  hover:bg-green-light transition ease-in-out  overflow-hidden flex justify-between sm:flex-col sm:justify-between" >
	
	<defalutImage :type="'movie'" :src="`https://image.tmdb.org//t/p/w300/${movie.poster_path}`"  :alt="`${movie.title}`"  class="h-64 border-b border-gray  max-w-md" />

			<div class="flex flex-col  justify-between items-center  overflow-hidden w-full  p-1 relative sm:overflow-visible ">
				<div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green sm:absolute sm:top-0 sm:right-0 sm:transform sm:-translate-y-full">{{ movie.vote_average }}</div>

				<h4 v-if="!!movie.title" :title="movie.title" class="movie__title  font-medium  p-2" > {{ movie.title }} </h4>
				<h4 v-else :title="movie.name" class="movie__title  font-medium   p-2"> {{ movie.name }}</h4>
				<div class="text-sm">{{movie.release_date}}</div>

			</div>
			
</NuxtLink>
</div>
</template>

<script>

export default {

props: {
    movie: {
    type: Object,
    required: true,
}
},

}

</script>

<style>
.movie__title {
height: 3.5em;
overflow: hidden;
}

</style>
