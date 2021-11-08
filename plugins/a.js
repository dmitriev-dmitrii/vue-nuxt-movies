
//   export default ({ store }, inject) => {
// 	// Inject $hello(msg) in Vue, context and store.
// 	inject('Apii', () => {
// 		return{	
// 	key :'api_key=fbd3a709162b6b542f7f912c8ab88d39',
// 	url :'https://api.themoviedb.org/3'
// }
// 	} )
//   }

  export default ({ context }, inject) => {
	// Inject $hello(msg) in Vue, context and store.
	inject('hello', msg => console.log(`Hello ${msg}!`))
  }