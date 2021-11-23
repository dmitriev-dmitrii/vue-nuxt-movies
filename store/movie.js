import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
    movie:{},
});

export const getters = {
getMovie: (state)=>{
	return state.movie;
},

};

export const mutations = {
    mutateMovie: (state, obj) => {
		state.movie =  obj;
	},

    mutateMovieCredits: (state, arr) => {
        state.movie.credits = arr;
	},
};

export const actions = {

    axiosMovie: async (context,movieId) => {
    const request = await axios.get(
        `${api.url}/movie/${movieId}?${api.key}&language=${context.rootState.language}`
    );
    if (request.status == 200) {
        context.commit('mutateMovie', request.data );
    }
},
axiosMovieCredits: async (context,movieId) => {
    const request = await axios.get(
        `${api.url}/movie/${movieId}/credits?${api.key}&language=${context.rootState.language}`
    );
    if (request.status == 200) {
        context.commit('mutateMovieCredits', request.data );
    }
},

};
