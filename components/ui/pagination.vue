
<template>

<div  class="flex items-center justify-center mt-6 mb-6">

<button v-if="currentPage>1" :class="paginationStyles" @click="pageBack">&laquo; <span-ru-en ru=" назад" en=" back" class="text-sm hidden md:block"/></button>
    
    <NuxtLink v-if="currentPage>3" :to="defalutUrl" :class="paginationStyles">
        1
    </NuxtLink>
    
    <NuxtLink v-if="currentPage>1" :to="defalutUrl+(Number(currentPage)-1)" :class="paginationStyles">
        {{ Number(currentPage)-1 }}
    </NuxtLink>

    <div :class="paginationStyles" class="cursor-not-allowed font-bold shadow-md ring-inset ring-2 ring-green border-green">
        {{ currentPage }}
    </div>

    <NuxtLink  v-if="currentPage<totalPages" :to="defalutUrl+(Number(currentPage)+1)" :class="paginationStyles">
        {{ Number(currentPage) + 1 }}
    </NuxtLink>

    <NuxtLink  v-if="currentPage< Number(totalPages)-1" :to="defalutUrl+totalPages" :class="paginationStyles">
        {{ totalPages }}
    </NuxtLink>

<button  v-if="currentPage<totalPages" :class="paginationStyles" @click="pageNext">  <span-ru-en ru=" вперед" en=" next" class="text-sm hidden md:block" />  &raquo;</button>

<div>

</div>


</div>

</template>

<script>

export default {
data(){
return{
  paginationStyles: 'rounded-md border pr-2 pl-2 m-1 md:pt-1 md:pb-1 md:pr-4 md:pl-4 md:m-2 flex items-center justify-center '
}
},


  computed: { 
  	currentPage(){
if (!!this.$route.params.pathMatch)
{
return this.$route.params.pathMatch
}
  else return 1
    },

defalutUrl(){ return  `${ this.$route.path}`.replace(/[0-9]/g,'') }

  },

    props: {
      totalPages: {
      type: Number,
      required: true,
    },

},

  methods: {

    pageBack:function(){
      this.$router.push({ path: `${this.defalutUrl}${Number(this.currentPage) - 1}`})
    },

    pageNext:function(){
      this.$router.push({ path: `${this.defalutUrl}${Number(this.currentPage) + 1}`})
    },
  },

}
</script>