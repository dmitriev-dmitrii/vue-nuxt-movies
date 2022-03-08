<template>
	<div class=" flex justify-between border border-gray rounded-lg overflow-hidden ">
			<figure class="overflow-hidden rounded-lg  ">
			<defalutImage type="movie" :src="`https://image.tmdb.org//t/p/w300/${item.poster_path}`"  :alt="`${item.name}`"  class="h-44 w-28 border-b border-gray overflow-hidden rounded-lg" />
				<figcaption class="font-bold text-center">
					{{item.name}}
				</figcaption>
			</figure>
			<ul class="flex flex-col p-2 ">
				<li ><span-ru-en  class="font-medium" ru="Номер Сезона" en="Season" />: {{item.season_number? item.season_number : 0 }}</li>
				<li v-if="item.air_date"><span-ru-en class="font-medium" ru="Дата релиза" en="Air Date" />: {{item.air_date}}</li>
				<li v-if="item.episode_count"><span-ru-en class="font-medium" ru="Количество Эпизодов" en="Episode Count" />: {{item.episode_count}}</li>
			</ul>
	</div>
</template>

<script>
import appPlayer from '@/components/ui/app-player';
export default {

components:{appPlayer},
props:{
	item :{
		required:true
	},
}



}
</script>