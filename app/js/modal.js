

function createModals() 
{
openModalBtn = document.querySelectorAll(`[openModalName]`)
closeModalBtn = document.querySelectorAll(`[closeModalName]`)
}

openModalBtn.forEach(e => 
{
e.addEventListener('click', openModal)
});

closeModalBtn.forEach(e => 
{
	e.addEventListener('click', closeModal)
});


function openModal() 
{
let modalName = this.getAttribute("openModalName");

modalWrapper = document.querySelector(`[modalName="${modalName}"]`);
modalWrapper.classList.add('active');
}

function closeModal() 
{
	let modalName = this.getAttribute("closeModalName");
	modalWrapper = document.querySelector(`[modalName="${modalName}"]`);
	modalWrapper.classList.remove('active');
}

// console.log(modalWrapper);

// ="${target}"
// window.addEventListener('keydown', function(e) {

// 	if (e.keyCode == 27) {
// 		if (this.modalWrapper.classList.contains('active')) {
// 			this.close();
// 		}
// 	}


// });