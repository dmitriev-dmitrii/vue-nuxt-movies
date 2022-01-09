
<template>

		<div  class=" rounded-lg border border-gray flex flex-col justify-between shadow overflow-hidden hover:border-green  hover:bg-green-light transition ease-in-out ">
			<NuxtLink  :to="`/persons/person/${person.id}`">
			<div class="flex justify-between">
				<defalutImage :type="'person'" :src="`https://image.tmdb.org/t/p/w300/${person.profile_path}`" :alt="`${person.name}`"  class=" h-52 w-36  overflow-hidden shadow-md  rounded-lg "/>

				<div class="flex flex-col justify-between  p-2 ">
					<h2 class="text-xl  font-bold  sm:text-right ">{{ splitFullName(person.name).firstName }} <br> {{splitFullName(person.name).lastName}} </h2>
					<div class="rounded-full font-bold text-right text-sm "> 
						<span-ru-en ru="Рейтинг" en="Popularity"/>{{ person.popularity }}
					</div>
				</div>

			</div>

				<ul class="p-2 text-sm text-gray-dark font-semibold">
					<li v-for="movie in person.known_for" :key=movie.id class="truncate " >
						<p v-if="!!movie.name" :title="movie.name">{{movie.name}}</p>
						<p v-else :title="movie.title">{{movie.title}}</p>
					</li>
				</ul>
			
			</NuxtLink>
		</div>


</template>

<script>

export default {

    props: {
      person: {
      type: Object,
      required: true,
     },
    },
	methods:
{
splitFullName: (name)=>{

let [firstName,  ...lastName] = name.split(" ");
lastName=lastName.join(' ');
return {firstName,lastName}
},
}

}
</script>

<style>

</style>