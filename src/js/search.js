



let filmsListHtml = document.querySelectorAll('.films__list');
// селекторы поле поиска

let searchResult 

const searchInput = document.querySelector('.search-form__input');
const searchForm = document.querySelector('.search-form');
const searchSubmit = document.querySelector('.search-form__submit');
const searchResultList = document.querySelector('.search-form__results');
const searchResultTitle = document.querySelector('.search-form__results-title');
// селекторы поле поиска


searchInput.addEventListener('input', tooltipsSearchInput);

function tooltipsSearchInput() 
{

if (searchInput.value < 1) 
// отключаю кнопку при пустом поле
{
searchSubmit.setAttribute('disabled','true')
}
else
{
searchSubmit.removeAttribute('disabled')
searchSubmit.classList.add ('active')
}
// отключаю кнопку при пустом поле
}

// при событии сабмит с поля поиска
searchForm.onsubmit = () => 
{

searchQuery(searchInput.value) 
}

searchForm.addEventListener('submit', function(e) {
e.preventDefault();
}, false);
// отключил перезагрузку страницы при отправке

// при событии сабмит с поля поиска


// url для fetch c данными из инпута
function generateSearchUrl(inputValue) 
{
let requestURL = 'https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&language=ru&query='+inputValue+'';
return requestURL;
}
// url для fetch c данными из инпута


// запрос с промисами

function searchQuery(inputValue) 
{

sendRequest(generateSearchUrl(inputValue))

.then((data) => {

searchResultList.classList.remove('active')
while (searchResultList.firstChild)
{
searchResultList.removeChild(searchResultList.firstChild);
}

localStorage.setItem ('searchResult', JSON.stringify(data.results));

searchResult = JSON.parse (localStorage.getItem ('searchResult')); 


addFilmsList(searchResult, searchResultList)
moviesArray=moviesArray.concat(searchResult)

searchResultList.classList.add('active')
searchResultTitle.classList.add('active')


searchResultTitle.innerHTML = `Поиск по запросу :<span  class="search-form__results-value">`+inputValue+`</span><br>Результатов найдено :`+data.results.length+``;

})
// catch в случае ошибки
.catch(error => console.log(error));
}




if (localStorage.getItem ('searchResult').length > 0) {

searchResult =  JSON.parse (localStorage.getItem ('searchResult'));
console.log(searchResult);
searchResultList.classList.add('active')

addFilmsList(searchResult, searchResultList)

moviesArray=moviesArray.concat(searchResult)
} 