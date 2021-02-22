

let topRatedHtml = document.querySelector('.new-movies__list');

let getMoreButton = document.querySelector('.getmore__button');

let curentGet =1

function generateNewMoviesUrl(pageNumber) 
{
let requestURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=ru&page='+pageNumber+'';

return requestURL;
}

function topRatedQuery(htmlList,pageNumber) 

{
sendRequest(generateNewMoviesUrl(pageNumber))
.then((data) => 
{

addFilmsList(data.results, htmlList)
moviesArray=moviesArray.concat(data.results)
htmlList.classList.add('active')

})

// catch в случае ошибки
.catch(error => console.log(error));
}

getMoreButton.addEventListener('click',getMoreMovies )

function getMoreMovies() 
{
topRatedQuery(topRatedHtml,curentGet) 


	curentGet=curentGet+1;
	

}









