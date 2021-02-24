
let trilogyCollection = document.querySelectorAll('.trilogy__collection');




function generateTrilogyhUrl(collectionId) 
{
let requestURL = 'https://api.themoviedb.org/3/collection/'+collectionId+'?api_key='+apiKey+'&language=ru';
return requestURL;
}



function trilogyQuery(collectionId,trilogyCollectionHtml) 
{
createPreloader(trilogyCollectionHtml,collectionId,true);

sendRequest(generateTrilogyhUrl(collectionId))

.then((data) => 
{

addFilmsList(data.parts, trilogyCollectionHtml)

moviesArray=moviesArray.concat(data.parts)

let convertName

if (data.name.length > 0) {
	convertName=data.name.substr(0,(data.name.length -11)) 
} else {
	convertName='Ошибка сервера';
}


trilogyCollectionHtml.insertAdjacentHTML("afterbegin",

`
<div class="trilogy__collection-info "> 
<figure class="trilogy__collection-figure" >
    <img class="trilogy__collection-img" src="https://image.tmdb.org/t/p/original`+ data.backdrop_path + `"
        alt="`+convertName+`">
    <figcaption class="trilogy__collection-figcaption " >
	<h2  class="trilogy__collection-title ">`+convertName+`</h2>	
	<P  class="trilogy__collection-length ">`+data.parts.length+`</p>
	<p  class="trilogy__collection-overview ">`+data.overview+`</p>	
	</figcaption>
</figure>
</div>
`
);

createPreloader(trilogyCollectionHtml,collectionId,false);
trilogyCollectionHtml.classList.add('active')

hideList( trilogyCollectionHtml, 0.99 , 1 ,collectionId,`развернуть список фильмов`,'скрыть список') 

})
// catch в случае ошибки
.catch(error => console.log(error));
}

trilogyQuery(264,trilogyCollection[0]);
trilogyQuery(10,trilogyCollection[1]);
trilogyQuery(1241,trilogyCollection[2]);
trilogyQuery(119,trilogyCollection[3]);
trilogyQuery(230,trilogyCollection[4]);
trilogyQuery(84,trilogyCollection[5]);
trilogyQuery(295,trilogyCollection[6]);
