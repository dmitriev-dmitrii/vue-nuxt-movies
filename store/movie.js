import axios from 'axios';
import api from "@/api/api";

export const state = () => ({

    person: {
        images: [],
        knowFor:''
    },

})

export const getters = {

    getPerson: (state) => {
        return state.person;
    },

}

export const mutations = {

    mutatePerson: (state, obj) => {
        Object.assign(state.person, obj);
    },
    mutatePersonKnowFor: (state, data) => {
        const obj = {
            knowFor: data
        }
        Object.assign(state.person, obj);
        
    },
    
}

export const actions = {

    axiosPerson: async (context, personId) => {

        const request = await axios.get(
            `${api.url}/person/${personId}?${api.key}&language=${context.rootState.language}&`
        );
        if (request.status == 200) {
            // console.log( request.data);
            // console.log(context);
            context.commit('mutatePerson', request.data);
        }
    },


    axiosPersonKnowFor: async (context, personId) => {

        const request = await axios.get(
            `${api.url}/person/${personId}/movie_credits?${api.key}&language=${context.rootState.language}&`
        );
        if (request.status == 200) {
            // console.log( request.data);
            // console.log(context);
            context.commit('mutatePersonKnowFor', request.data);
        }
    },


}
