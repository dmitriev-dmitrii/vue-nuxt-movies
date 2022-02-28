
<template>

<div  :class="{ 'my-white-shaddow' : applyScrollItems (moviesList.length )}" >

    <div  :class="{ 'overflow-x-auto grid grid-rows-1 grid-flow-col' : applyScrollItems (moviesList.length )}" >

    <NuxtLink :to="`/movies/${movie.id}`"
      class=" h-58 w-44 mr-2 mt-4 mb-4 rounded-lg border border-gray overflow-hidden inline-block  hover:border-green  hover:bg-green-light transition ease-in-out"
      v-for="movie in moviesList" :key="generateItemKey (movie.credit_id , movie.id)">
      <defalutImage :type="'movie'" :src="`https://image.tmdb.org//t/p/w300_and_h450_bestv2/${movie.poster_path}`"  :alt="`${movie.title}`"  class="h-64 w-full border-b border-gray" />
      <h4 v-if="!!movie.name" :title="movie.name" class="font-medium  truncate text-center p-1"> {{ movie.name }}</h4>
      <h4 v-else :title="movie.title" class="font-medium  truncate text-center p-1" > {{ movie.title }} </h4>
      <h4 v-if="!!movie.job" :title="movie.job" class="font-medium  truncate text-center p-1 text-green"> {{ movie.job }}</h4>
		</NuxtLink>

    </div>
</div>

</template>

<script>

export default {

methods:{
applyScrollItems:function( arrLength ) {
if ( arrLength > 7 ) {
    return  true
  } else {
    return  false
  }
},

generateItemKey:function( someNumber , id ) {
  if (!someNumber) { someNumber = Date.now()}
return someNumber + id
}

},

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