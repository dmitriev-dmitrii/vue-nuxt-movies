import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
	persons: [],
    pagination:0
})

export const getters = {

getPersons: (state)=>{

	return state.persons;
},
getPagination: (state)=>{
	return state.pagination;
},

}

export const mutations = {

    mutatePersons: (state, array) => {
		state.persons =  array;
	},
    mutatePersonsPagination: (state, value) => {
		state.pagination =  value;
	},
    
}

export const actions = {

    axiosPersons: async (context,pageNumber) => {

    const request = await axios.get(
        `${api.url}/person/popular?${api.key}&language=${context.rootState.language}&page=${pageNumber}`
    );
    if (request.status == 200) {

        context.commit('mutatePersons', request.data.results );
        context.commit('mutatePersonsPagination', request.data.total_pages );

    }
    },
}
