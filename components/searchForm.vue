
<template>

  <form class="my-search-form flex items-center relative  rounded-md  p-0 shadow w-full "  @submit.prevent="deleayRequestOnInput">
    <input v-model="searchInputValue" @input="deleayRequestOnInput" @focus="inputFocused = true" @blur="inputFocused = false"  type="text" class="w-full p-4 pl-2 font-medium h-0  border border-gray rounded-bl-md rounded-tl-md focus:bg-green-light hover:bg-green-light focus:border-green  focus:outline-none">
    
    <button  class=" h-0 py-4 pl-2 pr-2.5 border border-gray border-l-0 rounded-br-md rounded-tr-md flex items-center justify-center focus:bg-green-light hover:bg-green-light" type="submit"><searchIcon/></button>
    <ul :class="{'active': inputFocused }"  class="ul-search-result text-gray-dark absolute w-full  bg-white border border-gray border-t-0 rounded-bl-md rounded-br-md  shadow ">
      <li v-if="loading" :class=searchResultCardStyles ><loadingSpinner>loading...</loadingSpinner></li>
      <li  v-for="item in searchResultArray" :key=item.id :class=searchResultCardStyles> <NuxtLink    :to="`${routerLinkUrl(item)}`"  class="block w-full flex" >{{ item.title || item.name }} <span class="ml-auto block font-normal italic text-right pl-2">{{item.media_type}}</span> </NuxtLink></li>
    </ul>

  </form>

</template>

<script>

import axios from 'axios';
import api from "@/api/api";

export default {

data:  () =>{
    return {
      searchResultCardStyles: ['border' ,'border-gray','py-1' ,'px-2','w-full' , 'border-r-0' ,'border-l-0' ,'border-b-0' ,'focus:bg-green-light ',' hover:bg-green-light','font-semibold' , ],
      searchResultArray:[],
      timeOutSearchReqest:false,
      loading:false,
      inputFocused:false,
      searchInputValue:''
    }
  },
  methods:{
    sendSearchReqest : async function () {
      // console.log('time out ? sended request');
      const request = await axios.get(`${api.url}/search/multi?${api.key}&language=en&query=${this.searchInputValue}`)
      this.searchResultArray = request.data.results;
      this.loading= false;
    },
    routerLinkUrl: function (obj) {
      if (obj.media_type == 'person'){return `/persons/person/${obj.id}`}
      if (obj.media_type == 'movie'){return `/movies/${obj.id}`}
    },
    clearSearchResult: function () {
        this.searchResultArray =[];
    },

    deleayRequestOnInput: function () {

      if (this.searchInputValue.length==0) {
        this.clearSearchResult();
        this.loading= false;
        return false
        }
      
      this.loading= true;

      if (!!this.timeOutSearchReqest) { 
        // console.log('time out clear');
        clearTimeout(this.timeOutSearchReqest)
      }

      this.timeOutSearchReqest = setTimeout(
      this.sendSearchReqest
      , 
      1000)
    },

    // redirectToSearchPage: function () {
    //     this.$router.push({path: `/search/${this.searchInputValue}`});
    // },

  },

}
</script>

<style>
.ul-search-result{
  z-index: -1;
  left: 0;
  top: 100%;
  max-height: 50vh;
  overflow-y: scroll;
  opacity: 0;
  transition: all .3s ease;
}

.ul-search-result.active{
  z-index:99;
  opacity: 1;
}

</style>