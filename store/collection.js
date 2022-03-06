import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
    collection:{
    },
});

export const getters = {
getCollection: (state)=>{
	return state.movie;
},
};

export const mutations = {
    mutateCollection: (state, obj) => {
		state.movie =  obj;
	},
};

export const actions = {

    axiosCollection: async (context,id) => {
        const request = await axios.get(
            `${api.url}/collection/${id}?${api.key}&language=${context.rootState.language}&`
        );
        if (request.status == 200) {
            // console.log( request.data);
            // console.log(context);
            context.commit('mutateCollection', request.data);
        }
},


};
