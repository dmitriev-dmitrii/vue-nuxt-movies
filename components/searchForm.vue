
<template>

  <form class="flex items-center relative  rounded-md  p-0 shadow w-full my-search-form" @submit.prevent="sendSearchReqest">
    <input v-model="searchInputValue" @input="sendSearchReqest" type="text" class="w-full p-4 pl-1 font-medium h-0  border border-gray rounded-bl-md rounded-tl-md focus:bg-green-light hover:bg-green-light focus:border-green  focus:outline-none">
    <button  class=" h-0 py-4 pl-2 pr-2.5 border border-gray border-l-0 rounded-br-md rounded-tr-md flex items-center justify-center focus:bg-green-light hover:bg-green-light" type="submit"><searchIcon/></button>
    <ul   class="ul-search-result absolute w-full  bg-white border border-gray border-t-0 rounded-bl-md rounded-br-md  shadow ">
      <li v-if="loading" :class=searchResultCardStyles ><loadingSpinner>loading...</loadingSpinner></li>
      <li @click="cleanSearchResult" v-for="item in searchResultArray" :key=item.id :class=searchResultCardStyles> <NuxtLink    :to="`${routerLinkUrl(item)}`"  class="block w-full flex" ><span class="border border-green border-l-0 border-r-0 border-t-0">{{ item.title || item.name }}</span> <span class="ml-auto block font-normal italic text-right">{{item.media_type}}</span> </NuxtLink></li>
    </ul>

  </form>

</template>

<script>

import axios from 'axios';
import api from "@/api/api";

export default {

data:  () =>{
    return {
      searchResultCardStyles: ['border' ,'border-gray' ,'p-1','w-full' , 'border-r-0' ,'border-l-0' ,'border-b-0' ,'focus:bg-green-light ',' hover:bg-green-light','font-semibold' , ],
      searchResultArray:[],
      loading:false,
      searchInputValue:''
    }
  },
  methods:{
    sendSearchReqest : async function () {
      if (this.searchInputValue.length==0) {
        return false
      }
      this.loading= true;
      const request = await axios.get(`${api.url}/search/multi?${api.key}&language=en&query=${this.searchInputValue}`)
      this.searchResultArray = request.data.results;
      this.loading= false

    },
    routerLinkUrl: function (obj) {
      if (obj.media_type == 'person'){return `/persons/person/${obj.id}`}
      if (obj.media_type == 'movie'){return `/movies/${obj.id}`}
    },
    cleanSearchResult: function () {
      this.searchResultArray = [];
    }
  },

}
</script>

<style>
.ul-search-result{
  z-index: 8888;
  left: 0;
  top: 100%;
  max-height: 50vh;
  overflow-y: scroll;
  display: none;
}
.my-search-form:focus-within.my-search-form .ul-search-result{
  display: block;
}
.ul-search-result:nth-child(n){
	animation: li-in .3s ease ;
}

@keyframes li-in {
	0%   { 
    transform: translateY(-10%);
    opacity: 0;
	}
	100%  { 
		transform: translateY(0) ;
    opacity: 1;
	}
}

</style>