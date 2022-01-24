<template>

<div class="" style="content-visibility:auto;">

	<h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading ">
		<span-ru-en ru="Популярные люди" en="Popular People"/>
	</h1>
	<p class="pt-2 ">
		<span-ru-en ru="Этот список обновляется ежедневно" en="This list updates daily"/>
	</p>

	<div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
		<person-card :person='person' v-for="person in persons" :key="person.id"/>
	</div>

<Pagination   :totalPages="pagination" />

</div>

</template>

<script>

import { mapGetters } from 'vuex';
import personCard from '@/components/persons/personCard'
export default {
components : { personCard },
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

