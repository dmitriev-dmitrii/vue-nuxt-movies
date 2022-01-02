import axios from 'axios';
import api from "@/api/api";

export const state = () => ({
	loadingMovieCard:false,
    currentMoviesType: 'popular',
    moviesTypes: [
        {
            name:'popular',
            pagesLoadedCounter:1,
            moviesList:[]
        },
        {
            name:'top_rated',
            pagesLoadedCounter:1,
            moviesList:[]
        },
        {
            name:'upcoming',
            pagesLoadedCounter:1,
            moviesList:[]
        },
        {
            name:'now_playing',
            pagesLoadedCounter:1,
            moviesList:[]
        },
    ],

});

export const getters = {

    getMovieCardIsLoading: (state)=>{
        return state.loadingMovieCard;
},
getCurrentMoviesType: (state)=>{
	return state.currentMoviesType;
},

getMovieListFromType: (state,MovieType)=>{

	return state.currentMoviesType;
},

};

export const mutations = {
    mutateCurrentMoviesType: (state , value ) => {
        state.currentMoviesType = value
        },

    mutateMoviesData: (state,  payload ) => {
    // console.log(payload.index);
    const currentStateObj =  state.moviesTypes[ payload.index ]
    currentStateObj.moviesList = currentStateObj.moviesList.concat(payload.data);
    currentStateObj.pagesLoadedCounter++
	},
    mutateLoadingMovieCard: (state , value=false ) => {
        state.loadingMovieCard = value
        }
};

export const actions = {

    axiosMovies: async (context, movieTypeIndex=0 ) => {
    context.commit('mutateLoadingMovieCard', true );
    const currentStateObj  = context.state.moviesTypes[ movieTypeIndex ];
    const request = await axios.get(
        `${api.url}/movie/${currentStateObj .name}?${api.key}&language=${context.rootState.language}&page=${currentStateObj .pagesLoadedCounter}`
    );
    if (request.status == 200) {
    const payload={
            index:movieTypeIndex,
            data: request.data.results
    }
    context.commit('mutateLoadingMovieCard', false );
        context.commit('mutateMoviesData',  payload);
    }
},
};
