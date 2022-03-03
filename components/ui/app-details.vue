
<template>

  <details  class="shadow-md border border-gray rounded-lg max-w-lg ">
		<summary class="shadow-md  border  border-white  rounded-lg  hover:border-green  hover:bg-green-light ">
    <slot name="summary"></slot>
		</summary>
		<slot></slot>
  </details>

</template>
<script>


export default {


}
</script>
<style>

details {
	margin: 1em 0;
    padding: .5em ;
}

summary {
	cursor: pointer;
    margin: -.5em ;
    padding: .5em;
	transition: all 0.3s ease;
}

details[open] {
    padding: .5em;
}

details[open] summary {
    
    margin-bottom: .5em;
}
</style>