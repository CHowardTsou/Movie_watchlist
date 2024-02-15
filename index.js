const inputText = document.getElementById('input-text')
const displayResult = document.getElementById('display-result')
let searchArray = []
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

document.getElementById('btn-search').addEventListener('click', function(){
    const searchText = inputText.value.replace(" ", "+")
    
    fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=1ba2fe6e&type=movie`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.Search)
        
        render(data.Search)
        // fetch(`https://www.omdbapi.com/?i=${data.Search[0].imdbID}&apikey=1ba2fe6e`)
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        
    })
})


function render(searchArr){
    displayResult.innerHTML = ''
    
    for(let search of searchArr){
        fetch(`https://www.omdbapi.com/?i=${search.imdbID}&apikey=1ba2fe6e`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                searchArray.push(data)
                displayResult.innerHTML += `
                <div class="result">
                    <img src=${data.Poster}>
                    <div class="result-right">
                        <div class="name-score">
                            <h3>${data.Title}</h3>
                            <p>⭐${data.imdbRating}</p>
                        </div>
                        <div class="min-type">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                            <div class="watchlist">
                                <span 
                                    class="material-symbols-outlined" 
                                    data-imdbid=${data.imdbID}>
                                    add_circle
                                </span>
                                <p>Watchlist</p>
                            </div>
                        </div>
                        <p class="plot">
                            ${data.Plot}
                        </p>
                    </div>
                    
                </div>
                <hr />
                `
            })
    }
    
}

document.addEventListener("click", function(e){
    if(e.target.dataset.imdbid){
        watchlist.push(searchArray.filter(item => item.imdbID === e.target.dataset.imdbid)[0])
        console.log(watchlist)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        console.log(e.target.dataset.imdbid)
        
    }
})