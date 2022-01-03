import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
    movie:{
        credits:'',
        videos:[]
    },
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

    mutateMovieCredits: (state, obj) => {
        state.movie.credits = obj;
	},
    mutateMovieVideos: (state, arr) => {
        state.movie.videos = arr;
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
axiosMovieVideos: async (context,movieId) => {
    const request = await axios.get(
        `${api.url}/movie/${movieId}/videos?${api.key}&language=${context.rootState.language}`
        
    );
    if (request.status == 200) {
        context.commit('mutateMovieVideos', request.data.results);
    }
},
};
