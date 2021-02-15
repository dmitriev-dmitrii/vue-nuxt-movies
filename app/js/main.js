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
		filmsListHtml.insertAdjacentHTML("beforeend",

			`
<a href="movie.html"  movie-id="`+ item.id + `" class="movie-item">
<img class="movie-item__img" src="https://image.tmdb.org/t/p/w500`+ item.poster_path + `"  alt="` + item.title + `">
		<h4 class="movie-item__title"> `+ item.title + `	 </h4>
		<p class="movie-item__year"> `+ item.release_date + `</p>
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
	hideShowItems(htmlList)
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


function hideShowItems(htmlList,HideCalculate) 
{

// HideCalculate - на сколько скрыть масив в % например 0.9  на 90%
const listChilds =Array.from(htmlList.children)
const listLength =listChilds.length;

let hideItems;
let  howMuchHide;


switch (true) 
{ 
case listLength <= 20 :
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
item.classList.add('hide-items__child-hiden','hide-items__child');
});

htmlList.insertAdjacentHTML("afterend", `<button class='hide-items__show-items '>показать еще</button>`)
const showMoreButton= document.querySelector('.hide-items__show-items');
showMoreButton.addEventListener('click',showItems);

function showItems() 
{
  whatHide.forEach(item => 
    {
    item.classList.toggle('hide-items__child-hiden');
    });
			if (showMoreButton.innerHTML === "показать еще") {
				showMoreButton.innerHTML = "скрыть";
			} else {
				showMoreButton.innerHTML = "показать еще";
			}
}
}}
