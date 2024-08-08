const searchForm = document.querySelector(".searchForm");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

// Function to fetch movie details using the OMDB API.
const getMovieInfo = async (movie) => {
  try {
    const apiKey = "8a7e6017";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok){
        throw new Error('Unable to fetch Data.')
    }

    // console.log(data);

    showMovieData(data);
  } catch (error) {
    showErrorMessage("No Movie Found!!");
  }
};

// Function to show movie data on screen
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data; // destuctured to extract properties

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating : &#11088; </strong>${imdbRating}</p>
    `;

  const movieGenreElement = document.createElement("div");

  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });
  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Release Date : </strong>${Released}</p>
  <p><strong>Duration : </strong>${Runtime}</p>
  <p><strong>Cast : </strong>${Actors}</p>
  <p><strong>Plot : </strong>${Plot}</p>`;

  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add(`movie-poster`);
  moviePosterElement.innerHTML = `<img src="${Poster}">`;
  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
};

// Function to display ERROR message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
};

// Function to handle form submission
const handleFormSubmission = (e) => {
    e.preventDefault();
  // console.log(inputBox.value);
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMessage('Fetching Movie Info...');
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter Movie name to get Movie Informantion");
  }
}


// Adding event listener to search form
searchForm.addEventListener("submit", handleFormSubmission);
