<template>

<div class="">
	<div class="rounded-lg overflow-hidden mb-6  flex  flex-col items-center  justify-between md:flex-row-reverse md:items-stretch relative z-10">
<div class="my-bg rounded-lg overflow-hidden  hidden xl:block"
:style="`
    background: linear-gradient(to right ,rgba(255, 255, 255, 1)40% , rgba(255, 255, 255, 0.9)45%,  rgba(255, 255, 255, 0.0)60% ), no-repeat  url(https://image.tmdb.org//t/p/original/${collection.backdrop_path}) ;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: auto 100% ;
    background-position: 100% 100% ;
    `">
</div>

		<div class=" txt-shadow flex flex-col justify-center items-center p-4 w-full md:pl-8 md:justify-start md:items-start  ">
			<h1  :title="collection.name" class="  font-bold text-3xl md:text-4xl lg:text-5xl font-heading mb-4 xl:max-w-xs "> 
				<span v-if="!!collection.name" >{{ collection.name }}</span>
				<span v-else > {{ collection.title }}</span>
			</h1>

			<h2  class="text-lg font-bold mb-4"><span-ru-en ru=' О фильме :' en =' About Movie :'/> </h2>
			
			<ul>
				<!-- <div class="rounded-full p-2 h-8 w-8 m-2 text-white font-bold ml-auto flex items-center justify-center border border-green bg-green ">{{ collection.vote_average }}</div> -->
				<li class="mb-2"><span-ru-en class="font-medium" ru='Оценка Пользователей:' en ='Vote Average:'/>{{ collection.vote_average }}</li>
				<li class="mb-2"><span-ru-en class="font-medium" ru='Язык Оригинала:' en ='Original Language:'/> {{collection.original_language}}</li>
			</ul>

		</div>
			<defalutImage :type="'movie'" :srcset="`https://image.tmdb.org//t/p/w400/${collection.poster_path}`" :src="`https://image.tmdb.org//t/p/original/${collection.poster_path}`"   :alt="`${collection.title}`"   class="movie__avatar border-b border-gray w-full max-w-xs  overflow-hidden  rounded-lg shadow-md" />
	</div>

<p class="max-w-lg p-2 border border-gray rounded-lg">  {{collection.overview}} </p>

<div class="pt-8" v-if="collection.parts.length > 0">
    <h3  class="font-medium  text-md ">  Collection Parts  </h3>
    <small-movies-list   :moviesList="collection.parts" />
</div>

</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      collection: "collection/getCollection",
    }),
  },

	validate({ params }) {
    // Must be a number
    	return /^\d+$/.test(params.id)
	},

  async fetch(context) {
    try {
      await context.store.dispatch("collection/axiosCollection", context.route.params.id);
    } catch (error) {
			context.error(error)
		}
  }
  
};
</script>


<style scoped>
.movie__avatar {
	min-height:480px;
}
.txt-shadow{
	text-shadow: 0px 0 5px #fff;
}
.my-bg{ 

animation: my-bg-slide 2s  ;

}
@keyframes my-bg-slide {
0% {
transform: translateX(-100%)  ;
opacity: 0;
}
90%  {
	transform: translateX(0%)   ;
	opacity: 0.05;
}
100%  {
	opacity: 1;
}

}

</style>
