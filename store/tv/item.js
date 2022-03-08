import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
    tv:{
        
    },
});

export const getters = {
getTv: (state)=>{
	return state.tv;
},
};

export const mutations = {
    mutateTv: (state, obj) => {
		state.tv =  obj;
	},

    // mutateMovieCredits: (state, obj) => {
    //     state.movie.credits = obj;
	// },
    // mutateMovieVideos: (state, arr) => {
    //     state.movie.videos = arr;
	// },
};

export const actions = {
    axiosTv: async (context,tvId) => {
    const tvRequest = await axios.get(`${api.url}/tv/${tvId}?${api.key}&language=${context.rootState.language}`);
    // console.log(tvRequest);
    context.commit('mutateTv',  tvRequest.data );
},


// axiostvVideos: async (context,movieId) => {
//     const request = await axios.get(
//         `${api.url}/movie/${movieId}/videos?${api.key}&language=${context.rootState.language}`
        
//     );
//     if (request.status == 200) {
//         context.commit('mutateMovieVideos', request.data.results);
//     }
// },
};
