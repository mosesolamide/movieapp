const listedMovieEl = document.getElementById("listed-movie");
const searchButton = document.getElementById("searchButton");
const empty = document.getElementById("empty");

searchButton.addEventListener("click", () => {
    let movieTitle = document.getElementById("moviename").value;
    fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=13c7f3`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const movies = data.Search;
                listedMovieEl.innerHTML = '';
                movies.forEach((currentData) => {
                    fetch(`http://www.omdbapi.com/?i=${currentData.imdbID}&apikey=13c7f3`)
                        .then(res2 => res2.json())
                        .then(dataimdbID => {
                            let movieListed = `
                            <div class="list">
                                <div><img src=${dataimdbID.Poster} class="poster-img" alt="Poster of the Movie ${dataimdbID.Title}"></div>
                                <div>
                                    <div class="box-one">
                                        <h2>${dataimdbID.Title}</h2>
                                        <img src="img/star.png" alt="rating" class="rate">
                                        <h3>${dataimdbID.imdbRating}</h3>
                                    </div>
                                    <div class="box-two"> 
                                        <p>${dataimdbID.Runtime}</p>
                                        <p>${dataimdbID.Genre}</p> 
                                        <div class="box-two-item">
                                          
                                            <button class="add-to-watchlist" data-imdbid="${dataimdbID.imdbID}">Watchlist</button>
                                        </div>                      
                                    </div>
                                    <article>${dataimdbID.Plot}</article>
                                </div>
                            </div>
                            <hr>
                            `;
                            empty.style.display = "none";
                            listedMovieEl.innerHTML += movieListed;

                            const watchListButton = document.querySelectorAll(".add-to-watchlist");
                            watchListButton.forEach(currentButton => {
                                currentButton.addEventListener("click", (e) => {
                                    if (e.target && e.target.classList.contains("add-to-watchlist")) {
                                        let imdbID = e.target.dataset.imdbid;

                                        let watchlistArrayStorage = JSON.parse(localStorage.getItem("myWatchlist"))
                                        if (!watchlistArrayStorage.includes(imdbID)) {
                                            watchlistArrayStorage.push(imdbID);
                                            localStorage.setItem("myWatchlist", JSON.stringify(watchlistArrayStorage));
                                            alert(`${dataimdbID.Title} added to your watchlist!`);
                                        } else {
                                            alert("This movie is already in your watchlist.");
                                        }
                                    }
                                });
                            });
                        });
                });
            } else {
                alert("Movie not found");
            }
        });
});
