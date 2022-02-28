
<template>

<div  :class="{ 'my-white-shaddow' : applyScrollItems (personsList.length )}" >

    <div  :class="{ 'overflow-x-auto grid grid-rows-1 grid-flow-col' : applyScrollItems (personsList.length )}" >

    	<NuxtLink :to="`/persons/person/${person.id}`"
      class="w-48 mr-2 mt-4 mb-4 rounded-lg border border-gray overflow-hidden inline-block  hover:border-green  hover:bg-green-light transition ease-in-out"
      v-for="person in personsList" :key="generateItemKey(person.credit_id,person.id)">
      <defalutImage :type="'person'" :src="`https://image.tmdb.org//t/p/w300_and_h450_bestv2/${person.profile_path}`"  :alt="`${person.title}`"  class="h-64 w-full border-b border-gray" />

    	<h4  :title="person.name" class="font-medium  truncate text-center p-1"> {{ person.name }}</h4>
      <h4 v-if="!!person.character" :title="person.character" class="font-medium  truncate text-center p-1 text-green"> {{ person.character }}</h4>
      <h4 v-if="!!person.job" :title="person.job" class="font-medium  truncate text-center p-1 text-green"> {{ person.job }}</h4>

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
return someNumber + id
}
},

    props: {
      personsList: {
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
