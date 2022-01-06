<template>
<div class="inline-flex justify-center items-center"> <div class="my-spiner mr-1 "></div><slot></slot></div>
</template>

<script>
export default {

};
</script>

<style >
.my-spiner{
background-color: transparent;

height: .8em;
width: .8em;
	display: inline-block;
	border-radius: 50%;

	border:.1em solid rgba(0, 220, 128, 0.1); 
	border-top: .1em solid   #00DC82;
	animation: spiner 1.7s linear infinite;
	
}
@keyframes spiner {
	0%   { 
		transform: rotate(0deg) ;

	}

	100%  { 
		transform: rotate(-360deg) ;

	}
}
</style>
