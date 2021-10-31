<template>
<div class="w-full" style="content-visibility:auto;">
	<h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Популярные люди" en="Popular People"/>
	</h1>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">

		<article  v-for="person in persons" :key="person.id" class=" rounded-lg border flex flex-col justify-between shadow overflow-hidden">
			<NuxtLink  :to="`/persons/person/${person.id}`">
			<div class="flex justify-between">
				<img :src="`https://image.tmdb.org/t/p/w235_and_h235_face/${person.profile_path}`" :alt="`${person.name}`" loading="lazy" class="object-center  object-cover  h-50 w-36 rounded-lg " >
				<div class="flex flex-col justify-between  p-2 ">
					<h2 class="text-xl  font-bold  sm:text-right ">{{ splitFullName(person.name).firstName }} <br> {{splitFullName(person.name).lastName}} </h2>
					<div class="rounded-full font-bold text-right text-sm "> 
						<span-ru-en ru="Рейтинг" en="Popularity"/>{{ person.popularity }}
					</div>
				</div>

			</div>

				<ul class="p-2 text-sm ">
					<li v-for="movie in person.known_for" :key=movie.id class="truncate " >
						<p v-if="!!movie.name" :title="movie.name">{{movie.name}}</p>
						<p v-else :title="movie.title">{{movie.title}}</p>
					</li>
				</ul>
			
			</NuxtLink>
		</article>

	</div>

</div>

</template>

<script>

import { mapGetters } from 'vuex';


export default {


methods:
{
splitFullName: (name)=>{

let [firstName,  ...lastName] = name.split(" ");
lastName=lastName.join(' ');
return {firstName,lastName}
},

},
	computed : {
		...mapGetters( 
			{
				persons:'persons/getPersons',
				pagination:'persons/getPagination',
			}
		),
		
	},
validate ({route}) {
    // Must be a number
	    const currentPage = route.params.pathMatch;
		// возвращает цифру в url после  persons/1 или ничего если url persons/  страница откроется, 
		// если в url лишние символы кроме цифр кидаем на 404
		return /^\d+$/.test(currentPage)||!currentPage;
    },

	async fetch (context) {
        await context.store.dispatch('persons/axiosPersons', context.route.params.pathMatch )
	},
}
</script>

