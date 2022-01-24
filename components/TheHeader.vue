
<template>
<header class="border-b border-gray w-full  pb-2 pt-2">

  <div class="max-w-7xl p-2 m-auto">

    <NuxtLink to="/" class=" font-bold border-solid border-b-2 border-transparent hover:border-green  mb-2 mt-2 inline-flex items-center max-w-full"  >
        Nuxt-Movies   <nuxtIcon class=" "></nuxtIcon>
    </NuxtLink>

    <nav>
      <ul class="flex flex-wrap items-center ">
        <li :class=navLiStyles >
          <NuxtLink to="/movies"  class="border-solid border-b-2 border-transparent hover:border-green  mb-4 mt-4">
              movies
          </NuxtLink>
        </li>
        <li :class=navLiStyles  >
          <NuxtLink to="/persons/" class="border-solid border-b-2 border-transparent hover:border-green  mb-4 mt-4">
              persons
          </NuxtLink>
        </li>
        <li  class="w-full m-auto   mb-2 mt-2 max-w-lg  md:m-1 md:ml-auto" >
          <searchForm/>
        </li>
      </ul>
    </nav>
  </div>
</header>
</template>

<script>


export default {

data:  () =>{
    return {
      navLiStyles: ['mr-2']
    }
  },
}
</script>

<style>


</style>