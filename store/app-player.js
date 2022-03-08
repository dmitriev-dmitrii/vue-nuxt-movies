import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
    videos:[]
});

export const getters = {
    getVideos: (state)=>{

        return state.videos;
        
},
};

export const mutations = {

    mutateVideos: (state, arr) => {
        state.videos = arr;
	},
};

export const actions = {
    axiosVideos: async (context,{ id,type='movie' }) => {
        const request = await axios.get(
            `${api.url}/${type}/${id}/videos?${api.key}&language=${context.rootState.language}`
        );
        if (request.status == 200) {
            context.commit('mutateVideos', request.data.results);
        }
    },
};
