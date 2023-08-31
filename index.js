let currentMovieStack = [];
const homeButton = document.querySelector("#home");
const searchBox = document.querySelector("#search-box");
const goToFavouriteButton = document.querySelector("#favrioute");
const movieCardContainer = document.querySelector(".movieContainer");

function showAlert(message) {
    alert(message);
}

function renderList(actionForButton) {
    movieCardContainer.innerHTML = '';



    for (let i = 0; i < currentMovieStack.length; i++) {
        let movieCard = document.createElement('div');


        movieCard.classList.add("card");

        movieCard.innerHTML = `
            <img src="${currentMovieStack[i].Poster}" alt="">
            <div class="movie-info">
                <h2 class="title">${currentMovieStack[i].Title}</h2>
                <p id="year">${currentMovieStack[i].Year}</p>
                <div>
                    <button onclick="${actionForButton}(this)" data-id="${currentMovieStack[i].imdbID}" class="addFav">Add/Del</button>
                    <button id="${currentMovieStack[i].imdbID}" onclick="getMovieInDetail(this)" class="detail-btn">Movie Details</button>
                </div>
            </div>
        `;
        movieCardContainer.appendChild(movieCard);

    }

}

function printError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = message;
    errorDiv.style.height = "10%";
    errorDiv.style.fontSize = "4rem";
    errorDiv.style.margin = "auto";
    movieCardContainer.innerHTML = "";
    movieCardContainer.append(errorDiv);
}

function getMoviesBySearch(searchString) {
    const omdbApiKey = 'fc0b1473'; // Replace with your actual OMDB API key
    const omdbUrl = `https://www.omdbapi.com/?s=${searchString}&apikey=${omdbApiKey}&page=1`;

    fetch(omdbUrl)
        .then(response => response.json())
        .then(data => {
            currentMovieStack = data.Search || [];
            renderList("favourite");
        })
        .catch(error => {
            console.error("Error fetching data from OMDB API:", error);
        });
}

function getTrandingMovies() {
    getMoviesBySearch("${searchStringURI}"); // You can replace "thor" with your desired search query
}

getTrandingMovies();

homeButton.addEventListener('click', getTrandingMovies);

searchBox.addEventListener('keyup', () => {
    let searchString = searchBox.value;

    if (searchString.length > 0) {
        getMoviesBySearch(searchString);
    }
});

goToFavouriteButton.addEventListener('click', () => {
    let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
    if (favouriteMovies == null || favouriteMovies.length < 1) {
        showAlert("you have not added any movie to favourite");
        return;
    }

    currentMovieStack = favouriteMovies;
    renderList("remove");
});

function favourite(element) {
    let imdbID = element.dataset.id;
    let movieToAdd = currentMovieStack.find(movie => movie.imdbID === imdbID);

    if (!movieToAdd) {
        return;
    }

    let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    favouriteMovies.unshift(movieToAdd);
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));

    showAlert(`${movieToAdd.Title} added to favourites`);
}

goToFavouriteButton.addEventListener('click', () => {
    let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    if (favouriteMovies.length === 0) {
        showAlert("You have not added any movies to favourites");
        return;
    }

    currentMovieStack = favouriteMovies;
    renderList("remove");
});

function remove(element) {
    let imdbID = element.dataset.id;
    let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];

    let newFavouriteMovies = favouriteMovies.filter(movie => movie.imdbID !== imdbID);

    localStorage.setItem("favouriteMovies", JSON.stringify(newFavouriteMovies));
    currentMovieStack = newFavouriteMovies;
    renderList("remove");
}
function renderMovieInDetail(movie) {
    movieCardContainer.innerHTML = '';

    let movieDetailCard = document.createElement('div');
    movieDetailCard.classList.add('detail-card');
    movieDetailCard.innerHTML = `
        <div class="inner">
            <img class="details-image" src="${movie.Poster}" alt="">
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

function getMovieInDetail(element) {
    let imdbID = element.getAttribute('id'); // Use IMDb ID instead of 'id'
    const omdbApiKey = 'fc0b1473'; // Replace with your actual OMDB API key
    const omdbUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}&language=en-US`;

    fetch(omdbUrl)
        .then(response => response.json())
        .then(data => renderMovieInDetail(data))
        .catch(err => printError(err));
}
