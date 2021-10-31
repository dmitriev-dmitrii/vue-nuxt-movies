
<template>

<div class="my-white-shaddow ">
    <div class="grid grid-rows-1 grid-flow-col  overflow-x-scroll  " >
    	<div class=" h-58 w-44 mr-2 mt-4 mb-4 rounded-lg border overflow-hidden inline-block"
      v-for="movie in moviesList" :key="movie.id">
			<img loading="lazy" 
			:src="`https://image.tmdb.org//t/p/w150_and_h225_bestv2/${movie.poster_path}`" 
			:alt="`${movie.title}`"
			class="object-center object-cover h-64 w-full border-b "
			/>
    	<h4 class="font-medium  truncate text-center p-1">{{ movie.title }} </h4>
		</div>

    </div>
</div>

</template>

<script>

export default {

    props: {
      moviesList: {
      type: Array,
      required: true,
    },

}
}
</script>

<style>
.my-white-shaddow{
  position: relative;
}
.my-white-shaddow::after{
    content: '';
    width: 3rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%);
    will-change: opacity;
    pointer-events: none
}
</style>