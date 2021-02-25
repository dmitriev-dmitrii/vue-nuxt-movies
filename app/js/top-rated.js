

let topRatedHtml = document.querySelector('.top-rated__list');

let getMoreButton = document.querySelector('.getmore__button');

let curentGet =1

function generatetopRatedUrl(pageNumber) 
{
let requestURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+apiKey+'&language=ru&page='+pageNumber+'';

return requestURL;
}

function topRatedQuery(htmlList,pageNumber) 

{
createPreloader(htmlList,pageNumber,true);
sendRequest(generatetopRatedUrl(pageNumber))
.then((data) => 
{

addFilmsList(data.results, htmlList)
moviesArray=moviesArray.concat(data.results)
htmlList.classList.add('active')
createPreloader(htmlList,pageNumber,false);
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

getMoreMovies(topRatedHtml,curentGet) 






