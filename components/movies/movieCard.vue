
<template>
<div>
<NuxtLink  :to="`/movies/${movie.id}`" class=" rounded-lg h-58 border border-gray overflow-hidden flex justify-between sm:flex-col sm:justify-between" >
      <img loading="lazy" 
			:src="`https://image.tmdb.org//t/p/w500/${movie.poster_path}`" 
      :srcset="`https://image.tmdb.org//t/p/w300/${movie.poster_path}`" 
			:alt="`${movie.title}`"
			class="object-center object-cover h-64 border-b border-gray  max-w-md"/>
			<div class="flex flex-col  justify-between items-center  overflow-hidden w-full  p-2 sm:relative sm:overflow-visible ">
				<div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green sm:absolute top-0 right-0 transform -translate-y-full">{{ movie.vote_average }}</div>
				<h4 v-if="!!movie.name" :title="movie.name" class="font-medium  sm:truncate text-center p-1"> {{ movie.name }}</h4>
				<h4 v-else :title="movie.title" class="font-medium  sm:truncate text-center p-1" > {{ movie.title }} </h4>
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


</style>