let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
const displayResult = document.getElementById('display-result')

function render(searchArr){
    if(searchArr.length === 0){
        displayResult.innerHTML = `<div class="emptylist">
                                    <span class="empty">Your watchlist is looking a little empty...</span>
                                    <div class="empty-text">
                                        <i class="fa-solid fa-circle-plus"></i>
                                        <p class="empty-two">Let's add some movies!</p>
                                    </div>
                                   </div> 
                                    `
    }
    else {
        const html = searchArr.map(movie => {
            return `
                    <div class="result">
                        <img src=${movie.Poster}>
                        <div class="result-right">
                            <div class="name-score">
                                <h3>${movie.Title}</h3>
                                <p>⭐${movie.imdbRating}</p>
                            </div>
                            <div class="min-type">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <div class="watchlist">
                                    <p>
                                    <i class="fa-solid fa-circle-minus" data-remove=${movie.imdbID}></i>Remove</p>
                                </div>
                            </div>
                            <p class="plot">
                                ${movie.Plot}
                            </p>
                        </div>
                        
                    </div>
                    <hr />
                    `
        }).join('')
        
        displayResult.innerHTML = html
        
    }
}

render(watchlist)

document.addEventListener("click", function(e){
    if(e.target.dataset.remove){
        newArray = watchlist.filter(movie => movie.imdbID != e.target.dataset.remove)
        watchlist.length = 0;
        watchlist = newArray 
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        
        render(watchlist)
    }
})