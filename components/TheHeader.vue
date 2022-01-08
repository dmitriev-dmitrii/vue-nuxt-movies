
<template>
<header class="border-b border-gray">
  <div class="max-w-7xl m-auto p-2 sm:p-4">
    <NuxtLink to="/" class="flex items-center font-bold">
        Nuxt-Movies
        <nuxtIcon></nuxtIcon>
    </NuxtLink>
    <nav>
      <ul class="flex flex-wrap ">
        <li :class=navLiStyles >
          <NuxtLink to="/movies" >
          movies
          </NuxtLink>
        </li>
        <li :class=navLiStyles  >
          <NuxtLink to="/persons/" >
          persons
          </NuxtLink>
        </li>
        <li  class="w-full sm:max-w-lg sm:ml-2 md:ml-auto" >
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