
let moviesDetails = {};
let moviesFavoriteStatus = {};

renderPage();

async function renderPage() {

  try {
    const response = await returnMoviesDetails();
    moviesDetails = response.data.results;
    intiliazeCookies();
    showMovies();
  } catch (e) {
    let htmlString = '<h1>My Favorite Star wars movies: </h1>';
    htmlString += '<div id="errorMessage" >Unfortunately our site is not available right now :\\<div>';
    document.body.innerHTML = htmlString;

  }

}

function returnMoviesDetails() {
  return axios.get('https://swapi.dev/api/films');
}

function intiliazeCookies() {
  for (let i = 0; i < moviesDetails.length; i++) {
    let status = Cookies.get(i.toString());
    if (typeof status === 'undefined') {
      Cookies.set(i.toString(), '0');
    }
    moviesFavoriteStatus[i] = Cookies.get(i.toString());
  }
}

function showMovies() {
  let htmlString = `<div id= "content">`;
  htmlString += `<h1>My Favorite Star wars movies: </h1>`;
  for (let i = 0; i < moviesDetails.length; i++) {

    let movieName = moviesDetails[i]['title'];
    let opening_crawl = moviesDetails[i]['opening_crawl'];
    let episode_id = moviesDetails[i]['episode_id'];

    if (moviesFavoriteStatus[i] === "1") {
      htmlString += `<div id = "movieTitle"><input type="checkbox" onclick="clickOnMovie(this.id)" id=` + i + ` value = ` + i + ` checked> ` + movieName + `</div>`;
    } else {
      htmlString += `<div id = "movieTitle"><input type="checkbox" onclick="clickOnMovie(this.id)" id=` + i + ` value = ` + i + `> ` + movieName + `</div>`;
    }
    htmlString += `<p>"` + opening_crawl +  `"</p><br>`;
    htmlString +=		`<hr color="black">`;

  }
  htmlString += `</div>`;

  document.body.innerHTML = htmlString;
}


function clickOnMovie(id){
 let status = Cookies.get(id);
 if (status === '0') {
   Cookies.set(id, 1);
 } else {
    Cookies.set(id, 0);
 }
}
