const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const movieContainer = document.querySelector(".movie-container");
const form = document.querySelector("form");
const search = document.querySelector(".search");
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const curList = document.querySelector(".cur-list");

let searchFor = "";
let currentPage = 1;
let totalPages = 1;

function showMovies(movies) {
    console.log(movies);
    movieContainer.innerHTML = ``;
    movies.results.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;
        if(poster_path && title && vote_average) {
            const movieDiv = document.createElement("div");
            const color = `hsl(${vote_average * 12}, 100%, 50%)`;
            movieDiv.classList.add("movie");
            movieDiv.innerHTML = `<img alt="${title}" src="${IMGPATH + poster_path}">
            <div class="movie-info">
                <p>${title}</p>
                <span style="color:${color}">${movie.vote_average.toFixed(1)}</span>
            </div>
            <div class=overview>
                ${overview}
            </div>`;
            movieContainer.appendChild(movieDiv);
        }
    });
}

async function getMovies(url) {
    allowChange = false;
    const resp = await fetch(url);
    const respData = await resp.json();
    curList.textContent = currentPage;
    allowChange = true;
    totalPages = respData.total_pages;
    showMovies(respData);
}

getMovies(APIURL + 1);



form.addEventListener("submit", e => {
    currentPage = 1;
    e.preventDefault();
    searchFor = search.value;
    if(searchFor) {
        search.value = "";
        getMovies(SEARCHAPI + searchFor);
    } else {
        searchFor = "";
        getMovies(APIURL + 1);
    }
});

function doSearch() {
    const searchUrl = searchFor == "" ? APIURL + currentPage : SEARCHAPI + searchFor + "&page=" + currentPage;
    getMovies(searchUrl);
}

function firstPage() {
    currentPage = 1;
    doSearch();
}

function prevPage() {
    if(currentPage == 1) return;
    currentPage -= 1;
    doSearch();
}

function nextPage() {
    if(currentPage >= totalPages || currentPage >= 500) return;
    currentPage++;
    doSearch();
}

function lastPage() {
    currentPage = totalPages <= 500 ? totalPages : 500;
    doSearch();
}