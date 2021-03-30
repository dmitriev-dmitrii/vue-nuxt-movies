

// при клике на ссылку фильма берем id и делаем запрос по id , рендерим страницу

const movieWrapper = document.querySelector('.movie')
const movieCasts = document.querySelector('.movie__casts')

const movieId = JSON.parse(localStorage.getItem('movieId'));

let actors;


idQuery(generateIdUrl(movieId));
ActorsQuery(generateActorsUrl(movieId))


function generateIdUrl(movieId) {

  let requestURL = ' https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey + '&language=ru-RU';
  return requestURL;
}

function generateVideoUrl(movieId) {

  let requestURL = ' https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=' + apiKey + '&language=ru-RU';
  return requestURL;
}

function generateActorsUrl(movieId) 
{
  let requestURL = ' https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' + apiKey + '&language==ru-RU';
  return requestURL;
}


function idQuery(url)

{

createPreloader(movieWrapper,'idQuery',true);

  sendRequest(url)
    .then((data) => {
createPreloader(movieWrapper,'idQuery',false);
item=data
createDataMovie(item)
}) 

.then(() => {

videoQuery(generateVideoUrl(movieId))

    })
    .catch(error =>printError(movieWrapper,error));
}

function videoQuery(url) 
{
  sendRequest(url)
    .then((data) => 
    {
createVideo(data)
    })
.then(() => 
    {
      createModals() 
    })

    .catch(error => console.log(error));
}

function ActorsQuery(url) 
{


  sendRequest(url)
    .then((data) => {

      createPreloader(movieCasts,'ActorsQuery',true);
      createActors(data);

    })

    .catch(error =>printError(movieCasts,error));
}

function createDataMovie(item) {

  function returnGeneres(data, delimeter) {

    let { genres } = data;
    return genres.map((el) => { return el.name }).join(delimeter);
  }

  movieWrapper.insertAdjacentHTML("afterbegin",
`

<h1 class="movie__title ">`+ item.title + `</h1>	
<div  class="movie__poster">
<label for="`+ item.id + `"><img class="movie__img" src="https://image.tmdb.org/t/p/w500`+item.poster_path+`"  alt="`+item.title+`"></label>
<button id="`+ item.id + `" openModalName='`+ item.id + `' class="movie__video-btn button">Трейлер</button>
</div> 

<div class="movie__info">

  <span class="movie__subtitle">`+ item.original_title + `</span>	
  <div class="movie__average">`+ item.vote_average + `</div>
  <div class="movie__count">`+ item.vote_count + `</div>
  <div class="movie__year">`+item.release_date+`</div>
  <div class="movie__overview">`+  item.overview + `</div>
  <div class="movie__genre" >
  `+returnGeneres(item, ' , ')+ `
  </div>

  </div>
`
  );

  window.onresize = showBg(MediaQ);
}

function createVideo(data) 
{

  if (data.results.length > 0) 
  {
  const videoUrl = data.results[this.length];
  movieWrapper.insertAdjacentHTML("beforeend",
  `
  <div modalName='`+ item.id + `' class="modal__wrapper">
  <div class="modal__body contanier">
  <div class="modal__header">
  <h5 class="modal__header-title"></h5>
  <button closeModalName='`+ item.id + `' class=" modal__header-btn"></button>
  </div>
  <div class="modal__content">
<iframe class="movie__video-iframe" src="https://www.youtube.com/embed/`+ videoUrl.key+`?enablejsapi=1&?controls=2" frameborder="0" allowfullscreen></iframe> 
  </div>
  <div class="modal__footer"> <button closeModalName='`+ item.id + `' class="modal__footer-btn">Закрыть</button></div>
  </div>
  </div>
  `
    );
  } 
  else 
  {
    
    movieWrapper.insertAdjacentHTML("beforeend",
    `
    <div modalName='`+ item.id + `' class="modal__wrapper">
    <div class="modal__body contanier">
    <div class="modal__header">
    <h5 class="modal__header-title">Ошибка!</h5>
    <button closeModalName='`+ item.id + `' class=" modal__header-btn"></button>
    </div>
    <div class="modal__content">
    <h5 class="modal__header-title">Видео отсутствует!</h5>
    </div>
    <div class="modal__footer"> <button closeModalName='`+ item.id + `' class="modal__footer-btn">Закрыть</button></div>
    </div>
    </div>
    `
      );
    
  }


}

function createActors(actors)
{

{

createPreloader(movieCasts,'ActorsQuery',false);
actors.cast.forEach(actor => {

  movieCasts.insertAdjacentHTML("beforeend",
`
<div class="movie__casts-item">
<img class="movie__casts-img" src="https://image.tmdb.org/t/p/w500`+actor.profile_path+`"  alt="`+actor.name+`">
<h4 class="movie__casts-name"> `+ actor.name+`</h4>  
<h3 class="movie__casts-hero"> `+ actor.character+`</h3>  
</div>
`);
});
}

hideList( movieCasts, 0.9 , 20 ,movieId,`всего `+(actors.cast.length)+`` ,'скрыть ')

}

const MediaQ = window.matchMedia("(min-width: 767.98px)")
function showBg(MediaQ) {
  if (MediaQ.matches) 
{ 
    movieWrapper.insertAdjacentHTML("afterbegin",
    `
  <style>.movie
  {
  background:  radial-gradient(ellipse farthest-corner at 100% 0%, rgba(0, 0, 0, 0)35% , rgba(0, 0, 0, 1) , rgba(0, 0, 0, 1) ), url(https://image.tmdb.org/t/p/original`+ item.backdrop_path + `);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 3% 0;
 
}
  </style>
    `

  );

}
else 
{
  movieWrapper.insertAdjacentHTML("afterbegin",
  `
<style>.movie-wrapper
{
  background: linear-gradient(45deg, rgba(3, 15, 92, 0.2)15%, rgba(0, 0, 0, 1) ,rgba(3, 15, 92, 0.1)80%);
}
</style>
  `
);
}
}

