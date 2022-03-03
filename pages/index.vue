<template>

<div class="w-full h-full max-w-7xl p-2 m-auto" >
<div >
	<h1 class=" font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
    Welcome. <br>
    Millions of movies,people to discover. <br>
	</h1>
</div >

<!-- <div class="pt-8">
    <h3  class="font-medium  text-3xl ">  <span-ru-en ru="Популярные Сериалы" en="What's Popular Serial Now " /> </h3>
    <hr class="text-green">
    <small-movies-list   :moviesList="tv" />
</div> -->

<div class="pt-8" >
  <h3  class="font-medium  text-3xl ">  <span-ru-en ru="Популярные Персоны" en="Popular Persons " /> </h3>
  <hr class="text-green">
	<small-persons-list :personsList="persons"></small-persons-list>
</div>

<div class="pt-8">
  <h3  class="font-medium  text-3xl ">  <span-ru-en ru="Популярные фильмы" en="Popular Movies " /> </h3>
    <hr class="text-green">
    <small-movies-list   :moviesList="movies" />
</div>

</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
name:'home' ,
  computed: {
    ...mapGetters({
      movies: "home/getMovies",
      persons: "home/getPersons",
      serials: "home/getSerials",
    }),
  },
  async fetch(context) {
    await context.store.dispatch("home/axiosMovies");
    await context.store.dispatch("home/axiosPersons");
    await context.store.dispatch("home/axiosSerials");
  },

}
</script>

