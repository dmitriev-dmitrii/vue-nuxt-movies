<template>
<div>
    <div class="flex sm:flex-row-reverse sm:justify-end sm:flex-nowrap mb-4">
    <div class="flex flex-col self-start w-full pr-2 sm:p-4 sm:pt-0">
        <h1
        class=" font-bold text-2xl md:text-2xl lg:text-6xl font-heading mb-2 lg:mb-6 ">
        {{ person.name }}
        </h1>
        <!-- <h2>{{ person.known_for_department }}</h2> -->

        <ul class="rounded-full self-start text-sm">
        <li class="mb-2">
            <span-ru-en ru="Место рождения:" en="Place of birth" />
            {{ person.place_of_birth }}
        </li>
        <li class="mb-2">
            <span-ru-en ru="Дата рождения:" en="Birthday" />
            {{ person.birthday }}
        </li>

        <!-- <li class="mb-2">
            <span-ru-en ru="Всего работ:" en="Total Movies:" />
            {{ person.moviesList[0].length }}
        </li> -->

		
        </ul>
    </div>

    <img
        class=" object-center bject-cover shadow-md border o rounded-lg h-40 sm:h-52 md:h-80 "
        :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${person.profile_path}`"
        :srcset="`https://image.tmdb.org/t/p/original/${person.profile_path}`"
        :alt="`${person.name}`"
        loading="lazy"
      />
    </div>

    <details v-if="!!person.biography" class="mt-4 mb-4 text-sm">
      <summary>
        <span-ru-en ru="Биография" en="Biography" />
      </summary>
      {{ person.biography }}
    </details>
    
<div class="pt-8" v-if="person.moviesList.cast.length > 0">
    <h3  class="font-medium  text-md ">  <span-ru-en ru="Список Работ" en="Works list " /> </h3>
    <small-movies-list   :moviesList="person.moviesList.cast" />
</div>

<div class="pt-8" v-if="person.moviesList.crew.length > 0">
    <h3  class="font-medium  text-md "> <span-ru-en ru="Актёрское искусство" en="Acting" /> </h3>
    <small-movies-list  :moviesList="person.moviesList.crew" />
</div> 

</div>
</template>

<script>
import { mapGetters } from "vuex";
import SpanRuEn from "@/components/SpanRu-En.vue";



export default {
  components: { SpanRuEn },

  methods: {
    splitFullName: (name) => {
      let [firstName, ...lastName] = name.split(" ");
      lastName = lastName.join(" ");
      return { firstName , lastName };
    },
  },
  computed: {
    ...mapGetters({
      person: "person/getPerson",
    }),
  },

  // validate ({route}) {
  //     // Must be a number
  // 	    const currentPage = route.params.pathMatch;
  // 		// возвращает цифру в url после  persons/1 или ничего если url persons/  страница откроется,
  // 		// если в url лишние символы кроме цифр кидаем на 404
  // 		return /^\d+$/.test(currentPage)||!currentPage;
  //     },

  async fetch(context) {
    await context.store.dispatch(
      "person/axiosPerson",
      context.route.params.pathMatch
    );
    await context.store.dispatch(
      "person/axiosPersonMoviesList",
      context.route.params.pathMatch
    );


  },
};
</script>

