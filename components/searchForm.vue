
<template>

  <form class="flex items-center relative  rounded-md  ml-2 p-0 shadow" >
    <input type="text" class=" p-4 pl-1 font-medium h-0  border border-gray rounded-bl-md rounded-tl-md focus:bg-green-light hover:bg-green-light focus:border-green  focus:outline-none">
    <button  class=" h-0 py-4 pl-2 pr-2.5 border border-gray border-l-0 rounded-br-md rounded-tr-md flex items-center justify-center focus:bg-green-light hover:bg-green-light" type="submit"><searchIcon/></button>
    <ul class="absolute w-full ul-search-result bg-white border border-gray border-t-0 rounded-bl-md rounded-br-md  shadow">
      <li :class=searchResultCardStyles ><loadingSpinner>loading...</loadingSpinner></li>
      <li :class=searchResultCardStyles > abc </li>
      <li :class=searchResultCardStyles > abc </li>
      <li :class=searchResultCardStyles > abc </li>
    </ul>
  </form>

</template>

<script>

export default {

data:  () =>{
    return {
      searchResultCardStyles: ['border' ,'border-gray' ,'p-1','w-full' , 'border-r-0' ,'border-l-0' ,'border-b-0' ,'focus:bg-green-light ',' hover:bg-green-light']
    }
  },
}
</script>

<style>
.ul-search-result{
  left: 0;
  top: 100%;

}
.ul-search-result:nth-child(n){
	animation: ul-in .3s ease ;
}


@keyframes ul-in {
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