import axios from 'axios';
import api from "@/api/api";

export const state = () => ({

    person: {
        images: [],
        moviesList:''
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
    mutatePersonMoviesList: (state, data) => {

        // data[0].sort(function (a, b) {
        //     if (a.popularity < b.popularity) {
        //     return 1;
        //     }
        //     if (a.popularity > b.popularity) {
        //     return -1;
        //     }
        //     // a должно быть равным b
        //     return 0;
        // });

        const obj = {
            moviesList: data
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


    axiosPersonMoviesList: async (context, personId) => {

        const request = await axios.get(
            `${api.url}/person/${personId}/movie_credits?${api.key}&language=${context.rootState.language}&`
        );
        if (request.status == 200) {
            // console.log( request.data);
            // console.log(context);
            context.commit('mutatePersonMoviesList', request.data);
        }
    },


}
