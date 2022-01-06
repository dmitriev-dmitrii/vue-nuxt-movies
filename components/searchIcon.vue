<template>
	<span class=" search-icon inline-flex justify-center items-center  "> 

	</span>
</template>

<script>
export default {

};
</script>

<style >
.search-icon{
height: 1em;
width: 1em;
display: inline-block;
border-radius: 50%;
position: relative;

border: .15em solid #00DC82;
transform: rotate(45deg);
}
.search-icon:after{
content:'';
display:block;
height:.15em ;
width: 80%;

position: absolute;
transform: translateY(-50%);
left: 100%;
top: 50%;

background-color: #00DC82;
}

</style>
