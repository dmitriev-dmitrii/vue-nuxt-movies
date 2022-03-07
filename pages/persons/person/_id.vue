<template>
<div class="">
    <div class="flex sm:flex-row-reverse sm:justify-end sm:flex-nowrap mb-4">
    <div class="flex flex-col self-start w-full pr-2 sm:p-4 sm:pt-0">
        <h1
        class=" font-bold text-2xl md:text-2xl lg:text-6xl font-heading mb-2 lg:mb-4 capitalize">
        {{ person.name }}
        </h1>
        <h2 class="mb-2 font-semibold">{{ person.known_for_department }}</h2>

        <ul class="rounded-full self-start text-sm">
        <li class="mb-2">
            <span-ru-en class="font-semibold" ru="Место рождения :" en="Place of birth :" />
            {{ person.place_of_birth }}
        </li>
        <li class="mb-2">
            <span-ru-en class="font-semibold" ru="Дата рождения :" en="Birthday :" />
            {{ person.birthday }}
        </li>
        <li class="mb-2">
            <span-ru-en class="font-semibold" ru="Основная деятельность :" en="Department :" />
            {{ person.known_for_department }}
        </li>
	
        </ul>
    </div>
    <defalutImage :type="'person'" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${person.profile_path}`" :alt="`${person.name}`"  class="person__avatar shadow-md border  border-gray rounded-lg  overflow-hidden  "/>

    </div>

<appDetails  v-if="!!person.biography">
	<span-ru-en slot="summary" ru="Биография" en="Biography" />
	{{ person.biography }}
</appDetails>

<div class="pt-8" v-if="person.moviesList.cast.length > 0">
    <h3  class="font-medium  text-md ">  <span-ru-en ru="Известные Работы" en="Known For " /> </h3>
    <small-movies-list   :moviesList="person.moviesList.cast" />
</div>

<div class="pt-8" v-if="person.moviesList.crew.length > 0">
    <h3  class="font-medium  text-md "> {{ person.known_for_department }} </h3>
    <small-movies-list  :moviesList="person.moviesList.crew" />
</div> 

</div>
</template>

<script>
import { mapGetters } from "vuex";
import appDetails from "@/components/ui/app-details";
export default {
components:{appDetails},
  methods: {
    splitFullName: (name) => {
      let [firstName, ...lastName] = name.split(" ");
      lastName = lastName.join(" ");
      return { firstName , lastName };
    },
  },
  computed: {
    ...mapGetters({
      person: "persons/page/getPerson",
    }),
  },

	validate({ params }) {
    // Must be a number
      return /^\d+$/.test(params.id)
	},

  async fetch(context) {
    const id = context.route.params.id
    await context.store.dispatch("persons/page/axiosPerson",id);
    await context.store.dispatch("persons/page/axiosPersonMoviesList",id);
  },
};
</script>

<style>
.person__avatar{
  width: 100%;
  height:100% ;

  min-height: 150px;
  max-height: 350px;
  max-width: 250px;

}
@media (min-width: 575.98px){ 
.person__avatar{
  height: 350px;
    }
}
</style>