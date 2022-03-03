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
    
    const movieRequest = await axios.get(`${api.url}/tv/${movieId}?${api.key}&language=${context.rootState.language}`);
    const creditsRequest = await axios.get(`${api.url}/tv/${movieId}/credits?${api.key}&language=${context.rootState.language}`);
    
    Promise.all([movieRequest, creditsRequest]).then( requests => {
        context.commit('mutateMovie',  requests[0].data );
        context.commit('mutateMovieCredits', requests[1].data );
    });

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
