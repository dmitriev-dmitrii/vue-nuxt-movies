<template>
	<span class="my-spiner"></span>
</template>

<script>
export default {

};
</script>

<style >
.my-spiner{

	background-color: transparent;
	margin:  .5em;
height: 1em;
width: 1em;
	display: inline-block;
	border-radius: 50%;

	border:.1em solid rgba(0, 220, 128, 0.4);
	border-top: .1em solid #00DC82;
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
