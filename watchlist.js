const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
const displayResult = document.getElementById('display-result')

function render(searchArr){
    if(searchArr.length === 0){
        displayResult.innerHTML = `<div class="emptylist">
                                    <span class="empty">Your watchlist is looking a little empty...</span>
                                    <p class="empty-two"><span class="material-symbols-outlined">add_circle</span>Let's add some movies!</p>
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
                                    <span class="material-symbols-outlined" 
                                        data-remove=${movie.imdbID}>
                                        cancel</span>
                                    <p>Remove</p>
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
    
    // for(let search of searchArr){
    //     displayResult.innerHTML += `
    //             <div class="result">
    //                 <img src=${search.Poster}>
    //                 <div class="result-right">
    //                     <div class="name-score">
    //                         <h3>${search.Title}</h3>
    //                         <p>⭐${search.imdbRating}</p>
    //                     </div>
    //                     <div class="min-type">
    //                         <p>${search.Runtime}</p>
    //                         <p>${search.Genre}</p>
    //                         <div class="watchlist">
    //                             <span 
    //                                 class="material-symbols-outlined" 
    //                                 data-imdbid=${search.imdbID}>
    //                                 add_circle
    //                             </span>
    //                             <p>Remove</p>
    //                         </div>
    //                     </div>
    //                     <p class="plot">
    //                         ${search.Plot}
    //                     </p>
    //                 </div>
                    
    //             </div>
    //             <hr />
    //             `
    // }
    
}

render(watchlist)

document.addEventListener("click", function(e){
    if(e.target.dataset.remove){
        let newArray = watchlist.filter(movie => movie.imdbID != e.target.dataset.remove)
        localStorage.setItem("watchlist", JSON.stringify(newArray))
        render(newArray)
    }
})