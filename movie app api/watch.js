document.addEventListener("DOMContentLoaded", () => {
    const watchlist = document.getElementById("watchlisted");
    const empty = document.getElementById("empty");

    // Retrieve the watchlist from localStorage
    let watchlistArray = JSON.parse(localStorage.getItem("myWatchlist"))

    // Check if watchlist is empty
    if (watchlistArray.length === 0) {
        empty.style.display = "none"
        return;
    } else {
        empty.style.display = "none";
    }

    // Loop through the stored IMDb IDs and fetch movie details
    watchlistArray.forEach(item => {
        fetch(`http://www.omdbapi.com/?i=${item}&apikey=13c7f3`)
            .then(res => res.json())
            .then(movieData => {
                console.log(movieData);
                let watchlistItem = `
                    <div class="list watchlist-item">
                        <div><img src=${movieData.Poster} class="poster-img" alt="Poster of the Movie ${movieData.Title}"></div>
                        <div>
                            <div class="box-one">
                                <h2>${movieData.Title}</h2>
                                <img src="img/star.png" alt="rating" class="rate">
                                <h3>${movieData.imdbRating}</h3>
                            </div>
                            <div class="box-two"> 
                                <p>${movieData.Runtime}</p>
                                <p>${movieData.Genre}</p> 
                                <div class="box-two-item">
                                    <button class="remove" data-imdbid="${movieData.imdbID}">Remove</button>
                                </div>                      
                            </div>
                            <article>${movieData.Plot}</article>
                        </div>
                    </div>
                    <hr>
                `;
                
                watchlist.innerHTML += watchlistItem;

                // Add remove button functionality
                const removeButtons = document.querySelectorAll(".remove");
                removeButtons.forEach(removeButton => {
                    removeButton.addEventListener("click", (e) => {
                        const imdbIDToRemove = e.target.dataset.imdbid;

                        // Filter out the id equal the id click id from the remove button
                        watchlistArray = watchlistArray.filter(id => id !== imdbIDToRemove)

                        // Save updated watchlist to localStorage
                        localStorage.setItem("myWatchlist", JSON.stringify(watchlistArray))

                        // look for the parent of the current movie with classs closest to watchlist-item and remove the entire class
                        e.target.closest(".watchlist-item").remove()
                    })
                })
            })
    })
})
