
<template>
  <footer class="border-t border-gray w-full">
      <div class="max-w-7xl m-auto p-2 flex justify-end pt-4 pb-4">
        <a class="flex items-end border-solid border-b-2 border-transparent hover:border-green " 
          target="_blank"
          title="https://www.themoviedb.org/"
          href="https://www.themoviedb.org/">

          <tmdbIcon  class="h-8 ml-2"></tmdbIcon>
          
        </a>
      </div>
  </footer>
</template>

<script>

import tmdbIcon from './icons/tmdb-icon.vue'
export default {
  components:{tmdbIcon}
  
}
</script>