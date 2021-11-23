import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
	movies: [],
    moviesType: 'popular',
});

export const getters = {
getMovies: (state)=>{
	return state.movies;
},
getMoviesType: (state)=>{
	return state.moviesType;
},
};

export const mutations = {
    mutateMovies: (state, array) => {
		state.movies =  array;
	},

    mutateMoviesType: (state, value) => {
		state.moviesType =  value;
	},

};

export const actions = {

    axiosMovies: async (context,indexOfPartLoading) => {
    const request = await axios.get(
        `${api.url}/movie/${context.state.moviesType}?${api.key}&language=${context.rootState.language}&page=${indexOfPartLoading}`
    );
    if (request.status == 200) {
        context.commit('mutateMovies', request.data.results );
    }
},
};
