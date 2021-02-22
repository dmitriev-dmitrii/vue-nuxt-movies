'use strict'
const apiKey = 'fbd3a709162b6b542f7f912c8ab88d39';
let moviesArray = [];

let movieHtmlItems;

function sendRequest(url) {
	return fetch(url).then(response => {

		if (response.ok) {
			return response.json()
		}
		else {
			return response.json()
		}
	})
}

// при вызове рендерим Html из масива  moviesArray в filmsListHtml

function addFilmsList(moviesArray, filmsListHtml) {

	moviesArray.forEach(item => {

	let	movieYear

if (item.release_date.length > 0) {
	movieYear=item.release_date.substr(0, 4);
} else {
	movieYear='';
}

		filmsListHtml.insertAdjacentHTML("beforeend",

			`
<a href="movie.html"  movie-id="`+ item.id + `" class="movie-item">
<img class="movie-item__img" src="https://image.tmdb.org/t/p/w500`+ item.poster_path + `"  alt="` + item.title + `">
		<h4 class="movie-item__title"> `+ item.title + `	 </h4>
		<p class="movie-item__year"> `+ movieYear + `</p>
		<p class="movie-item__score">	 `+ item.vote_average + `</p>
</a> 
`
		);

	});

	movieHtmlItems = document.querySelectorAll('.movie-item')

	movieHtmlItems.forEach(e => {
		e.onauxclick = function () {
			let id = e.getAttribute('movie-id')
			localStorage.setItem('movieId', JSON.stringify(id));
		}
		e.onclick = function () {
			let id = e.getAttribute('movie-id')
			localStorage.setItem('movieId', JSON.stringify(id));
		}
	});

}

const mobileMenu = document.querySelector('.nav__mobile-toggle')

mobileMenu.onclick = function () {
	this.previousElementSibling.classList.toggle('active')
}



function createModals() {
	const openModalBtn = document.querySelectorAll(`[openModalName]`)
	const closeModalBtn = document.querySelectorAll(`[closeModalName]`)
	const modalIframe = document.querySelectorAll(`iframe`)


	openModalBtn.forEach(e => {
		e.addEventListener('click', openModal)
	});

	closeModalBtn.forEach(e => {
		e.addEventListener('click', closeModal)

	});


	function openModal() {
		let modalName = this.getAttribute("openModalName");

		let modalWrapper = document.querySelector(`[modalName="${modalName}"]`);
		modalWrapper.classList.add('active');
	}


	function closeModal() {
		let modalName = this.getAttribute("closeModalName");
		let modalWrapper = document.querySelector(`[modalName="${modalName}"]`);
		modalWrapper.classList.remove('active');

		modalIframe.forEach(e => {

			e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

		});

	}
}


function hideList(htmlList,HideCalculate =0.5, minValue=10 ,id=1 ,showTxt ='показать еще',hideTxt= 'скрыть') 
{

// hideList( abcList, 0.5 , 1 ,'superKnopka','показать что то' ,'скрыть что то') 

// id должен быть уникальным  для чтобы кноки не путались в классах, и для кастомной стилизации 
// showTxt\hideTxt = текст в кнопке
// htmlList - родитель дочерних элементов 
// HideCalculate - на сколько скрыть масив в % например 0.9  на 90%
// minValue - от скольки дочерних елементов  кнопку , если дочерних элементов меншье кнопка не покажется

// Первые 4 праметра обязательны
// общие стили прописаны в  hideList.scss

const listChilds =Array.from(htmlList.children)
const listLength =listChilds.length;

let hideItems;
let  howMuchHide;


switch (true) 
{ 
case listLength <= minValue :
  howMuchHide = false;
  hideItems = false;
break;

default:
htmlList.classList.add('hide-items__parent');
howMuchHide = (Math.floor(listChilds.length  * HideCalculate));
hideItems = listChilds.slice((-howMuchHide));

creatButton(hideItems)

}

function creatButton(whatHide)
{

whatHide.forEach(item => 
{
item.classList.add(`hide-items__child-hiden-`+id+``,'hide-items__child-visible');
});

htmlList.insertAdjacentHTML("beforeend", `

<div class='hide-items__btn-wrapper'>
<button class='hide__show-`+id+` hide-items__show-items-btn button'>`+showTxt+`</button>
</div>
<style>

.hide-items__child-hiden-`+id+`
{
position: absolute;
height:0;
width: 0;
opacity: 0;
color:transparent;
user-select: none;
}

</style>

`)


const showMoreButton= document.querySelector(`.hide__show-`+id+``);

showMoreButton.addEventListener('click',showItems);

function showItems() 
{
whatHide.forEach(item => 
    {
    item.classList.toggle(`hide-items__child-hiden-`+id+``);
	console.log(item.classList);
    });



			if (showMoreButton.innerHTML === showTxt) 
			{
				showMoreButton.innerHTML = hideTxt;
			} else {
				showMoreButton.innerHTML = showTxt;
			}
}
}}
