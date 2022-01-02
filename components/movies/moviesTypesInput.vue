
<template>

<div>
	<input class="hidden" :checked="currentMoviesType == movieType" name="moviesTypes" type="radio"  :id="movieType" :value="movieType" @input="updateMoviesType">
  <label :for="movieType" class="px-2 py-1  mr-1 mb-1 sm:mr-2 sm:mb-2 rounded-md border border-gray cursor-pointer font-medium"> 
    {{ viewMovieType (movieType) | capitalize }}
	</label>
</div>

</template>

<script>
import { mapGetters } from 'vuex';
export default {

	computed : {
		...mapGetters( 
			{
				currentMoviesType:'movies/getCurrentMoviesType',
			}
		),
	},

props: {
    movieType: {
    type: String,
    required: true,
}
},
  methods: {
    viewMovieType(string){
      return string.replace(/_/gi, ' ');
    },
    updateMoviesType (e) {
    this.$store.commit('movies/mutateCurrentMoviesType', e.target.value)
  },
  },

}

</script>

<style>

input[type=radio]:checked + label {
	border-color: #00DC82;
	box-shadow:  0 0  2px 2px #00DC82 inset;
}

</style>