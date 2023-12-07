let Movies = [];

const homeButton = document.querySelector("#home");
const searchBox = document.querySelector("#search-box");
const goToFavouriteButton = document.querySelector("#favrioute");
const movieCardContainer = document.querySelector(".movieContainer");
// show alert message
function showAlert(message) {
  alert(message);
}



let NoImg ="data:image/jpeg;base64,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"

let NetworkConnection = "Please Check Your Internet Connection."

function renderList(search) {

    movieCardContainer.innerHTML = ''  

    for (let i = 0; i < Movies.length; i++) {
    let movieCard = document.createElement("div");

    movieCard.classList.add("card");
    movieCard.innerHTML = `
    
               <img src="${Movies[i].Poster !== 'N/A' ? Movies[i].Poster : NoImg}" alt="" >
               <div class="movie-info">
                <h2 class="title">${Movies[i].Title}</h2>
                <p id="year">${Movies[i].Year}</p>
                <div>
                    <button onclick="${search}(this)" data-id="${Movies[i].imdbID}" class="addFav">Add/Del</button>
                    <button id="${Movies[i].imdbID }" onclick="getMovieInDetail(this)" class="detail-btn">Movie Details</button>
               </div>
            </div>
        `;

   movieCardContainer.appendChild(movieCard);
  }
}

async function getMoviesBySearch(searchString) {
  const imdbApiKey = "fc0b1473";
  const imdbUrl = `https://www.omdbapi.com/?s=${searchString}&apikey=${imdbApiKey}&page=1`;

  try {
    const response = await fetch(imdbUrl);
    const data = await response.json();

    // Update the Movies with the search results or an empty array if no results
    Movies = data.Search || [];

    // Render the movie list, assuming there's a renderList function defined else where
    renderList("favourite");

  } catch (error) {
    // Log an error message if there's an issue with the API request
    console.error("Error fetching data from OMDB API:", error);
    showAlert(NetworkConnection);  
  }

}

searchBox.addEventListener("keyup", () => {
  let searchString = searchBox.value;

  if (searchString.length > 0) {
    getMoviesBySearch(searchString);
  }

});

// working on favrioute btn
goToFavouriteButton.addEventListener("click", () => {
  let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
  if (favouriteMovies == null || favouriteMovies.length < 1) {
    showAlert("you have not added any movie to favourite");
    return;
  }
  Movies = favouriteMovies;
  renderList("remove");
});

// if in favrioute section not any movie then show error
goToFavouriteButton.addEventListener("click", () => {
  let favouriteMovies =
    JSON.parse(localStorage.getItem("favouriteMovies")) || [];
  if (favouriteMovies.length === 0) {
    showAlert("You have not added any movies to favourites");
    return;
  }
  Movies = favouriteMovies;
  renderList("remove");
});

// if you try to added any movie then show alert to ask this movie added in favrioute section
function favourite(element) {
  let imdbID = element.dataset.id;
  let movieToAdd = Movies.find((movie) => movie.imdbID === imdbID);

  if (!movieToAdd) {
    return;
  }

  let favouriteMovies =
  JSON.parse(localStorage.getItem("favouriteMovies")) || [];

  favouriteMovies.unshift(movieToAdd);
  localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));

  showAlert(`${movieToAdd.Title} added to favourites`);
}


// if we want to remove any movie from favrioute section
// and show other movies as same
function remove(element) {
  let imdbID = element.dataset.id;
  let favouriteMovies =
    JSON.parse(localStorage.getItem("favouriteMovies")) || [];
  let newFavouriteMovies = favouriteMovies.filter(
    (movie) => movie.imdbID !== imdbID
  );
  localStorage.setItem("favouriteMovies", JSON.stringify(newFavouriteMovies));
  showAlert(`You deleting this Movie to favrioute section`);

  Movies = newFavouriteMovies;
  renderList("remove");
}

// movie details check if you are in favrioute section

function renderMovieInDetail(movie) {
    movieCardContainer.innerHTML = '';

    let movieDetailCard = document.createElement('div');
    movieDetailCard.classList.add('detail-card');
    movieDetailCard.innerHTML = `
        <div class="inner">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : NoImg}" alt="" >
        <div class="info">
                <h2 class="movie-title">${movie.Title}</h2>
                  <p class="writer"><span>writer :</span> ${movie.Writer}</p>
            <p class="genar"><span>Genar :</span> ${movie.Genre}</p>
            <p class="actors"><span>Actors :</span> ${movie.Actors}</p>           
           <p class="m-plot"><span>Plot:</span> ${movie.Plot}</p>
          <p class="rel-date"><span>Release date:</span> ${movie.Released}</p>
           <p class ="lang"><span>Language :</span>${movie.Language}</p> 

         </div>
        </div>
    `;
    movieCardContainer.append(movieDetailCard);
}


// show details about the movie
async function getMovieInDetail(element) {
  try {
    const imdbID = element.getAttribute("id");
    const omdbApiKey = "fc0b1473";
    const imdbUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}&language=en-US`;

    const response = await fetch(imdbUrl);
    const data = await response.json();

    renderMovieInDetail(data);
  } catch (err) {
        //  use this if not show any movie or movie name incorrect
        showAlert(NetworkConnection);
    }
}
