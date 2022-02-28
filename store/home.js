import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
  movies:[],
  persons:[],
  serials:[],
});

export const getters = {
  getMovies: (state)=>{
    return state.movies;
  },
  getPersons: (state)=>{
    return state.persons;
  },
  getSerials: (state)=>{
    return state.serials;
  },
};

export const mutations = {
  mutateMovies: (state, arr) => {
    state.movies = arr;
  },
  mutatePersons: (state, arr) => {
    state.persons = arr;
  },
  mutateSerials: (state, arr) => {
    state.serials = arr;
  },
};

export const actions = {
    axiosMovies: async (context) => {
      const request = await axios.get(
        `${api.url}/trending/movie/day?${api.key}&language=${context.rootState.language}`
      );
      if (request.status == 200) {
        // console.log(request.data.results)
        context.commit('mutateMovies', request.data.results);
      }
    },
    axiosPersons: async (context) => {
      const request = await axios.get(
        `${api.url}/trending/person/day?${api.key}&language=${context.rootState.language}`
      );
      if (request.status == 200) {
        console.log(request.data.results)
        context.commit('mutatePersons', request.data.results);
      }
    },
    axiosSerials: async (context) => {
      const request = await axios.get(
        `${api.url}/trending/tv/day?${api.key}&language=${context.rootState.language}`
      );
      if (request.status == 200) {
        console.log(request.data.results)
        context.commit('mutateSerials', request.data.results);
      }
    }
};
