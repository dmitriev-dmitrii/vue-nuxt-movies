
<template>
<header class="border-b border-gray w-full  pb-2 pt-2">

  <div class="max-w-7xl p-2 m-auto">

    <NuxtLink  to="/" class=" font-bold border-solid border-b-2 border-transparent hover:border-green  mb-2 mt-2 inline-flex items-center max-w-full"  >
        Nuxt-Movies   <nuxtIcon></nuxtIcon>
    </NuxtLink>

    <nav>
      <ul class="flex flex-wrap items-center ">
        <li :class=navLiStyles >
          <NuxtLink to="/movies"  :class="navLinkStyles">
              movies
          </NuxtLink>
        </li>
        <!-- <li :class=navLiStyles  >
          <NuxtLink to="/tv/" :class="navLinkStyles">
            tv
          </NuxtLink>
        </li> -->
        <li :class=navLiStyles  >
          <NuxtLink to="/persons/" :class="navLinkStyles">
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

import nuxtIcon from '@/components/icons/nuxt-icon'
import searchForm from '@/components/ui/search-form'

export default {
  
components: { searchForm,nuxtIcon },

data:  () =>{
    return {
      navLiStyles: ['mr-4'],
      navLinkStyles: [ 'border-solid ','border-b-2', 'border-transparent','hover:border-green' , 'mb-4', 'mt-4']
    }
  },
}
</script>

<style >

.nuxt-link-exact-active {
  border-bottom: 2px #00DC82 solid;
  color: #00DC82 ;
  text-shadow: 0 0 1px black;
  -webkit-text-stroke:.5px black;
}

</style>
