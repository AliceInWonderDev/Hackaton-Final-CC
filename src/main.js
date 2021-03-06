document.addEventListener('DOMContentLoaded', function () {
    window.M.AutoInit();
});

document.addEventListener('DOMContentLoaded', function () {
    let Modalelem = document.querySelector('.modal');
    let instance = M.Modal.init(Modalelem);
    instance.open();
    close.onclick = () => {
        instance.close();
        homePage.style.display = "block";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, ({
        fullWidth: true,
        indicators: true
    }));
});

let arr = [];
let btnHome = document.getElementById("navLogo");
let btnHarryPotter = document.getElementById("harryPotter");
let btnStarWars = document.getElementById("starWars");
let btnMarvel = document.getElementById("marvel");
let btnLotr = document.getElementById("lotr");
let webDetails = document.getElementById("web-details");
let universeDetails = document.getElementById("universe-details");
let movieDetails = document.getElementById("movie-details");
let close = document.getElementById("close");
let instructionSlide = document.getElementById("instruction-slide");
let homePage = document.getElementById("homePage");
let searchBtn = document.getElementById("searchBtn")
let searchContent = document.getElementById("search")

btnHome.onclick = () => {
    universeDetails.style.display = "none";
    movieDetails.style.display = "none";
    homePage.style.display = "block";
    webDetails.style.display = "block";
}

searchBtn.addEventListener("click", () => {
    let name = searchContent.value;
    let movie = [];
    let url = `https://www.omdbapi.com/?s=${name}&apikey=b9ccb762`
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            if (out.Response === "True") {
                let arrLength = out.Search;
                for (i = 0; i < arrLength.length; i++) {
                    let id = arrLength[i].imdbID;
                    movie.push(id.slice(2))
                }
            };
            printMovies(movie);
        })
        .catch(err => { throw err });
    homePage.style.display = "none";
    webDetails.style.display = "none";
    movieDetails.style.display = "none";
});

btnHarryPotter.addEventListener("click", () => {
    document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AliceInWonderDev/Hackaton-Final-CC/master/UX/Prototipo%20de%20alta%20fidelidad/Poster%20Pel%C3%ADculas/HarryP.jpeg')";
    homePage.style.display = "none";
    movieDetails.style.display = "none";
    const movie = ["0241527", "0295297", "0304141", "0330373", "0373889", "0417741", "0926084", "1201607", "3183660", "4123430"]
    printMovies(movie);
});

btnStarWars.addEventListener("click", () => {
    document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AliceInWonderDev/Hackaton-Final-CC/master/UX/Prototipo%20de%20alta%20fidelidad/Poster%20Pel%C3%ADculas/StarWars.jpeg')";
    homePage.style.display = "none";
    movieDetails.style.display = "none";
    const movie = ["0076759", "0080684", "0086190", "0120915", "0121765", "0121766", "2488496", "2527336", "3748528", "3778644"]
    printMovies(movie);
});

btnMarvel.addEventListener("click", () => {
    document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/VeronicaManchola/Hackaton-Final-CC/master/UX/Prototipo%20de%20alta%20fidelidad/Poster%20Pel%C3%ADculas/Marvel.jpg')";
    homePage.style.display = "none";
    movieDetails.style.display = "none";
    const movie = ["0371746", "0800080", "1228705", "0800369", "0458339", "0848228", "1300854", "1981115", "1843866", "2015381", "2395427", "0478970", "3498820", "1211837", "3896198", "2250912", "3501632", "1825683", "4154756", "5095030"]
    printMovies(movie);
});

btnLotr.addEventListener("click", () => {
    document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AliceInWonderDev/Hackaton-Final-CC/master/UX/Prototipo%20de%20alta%20fidelidad/Poster%20Pel%C3%ADculas/LordOTR.jpeg')";
    homePage.style.display = "none";
    movieDetails.style.display = "none";
    const movie = ["0120737", "0167261", "0167260", "0903624", "1170358", "2310332"]
    printMovies(movie);
});

const printMovies = (movie) => {

    for (i = 0; i < movie.length; i++) {

        arr = [];
        let url = `https://www.omdbapi.com/?i=tt${movie[i]}&apikey=b9ccb762`

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                if (out.Response === "True") {
                    arr.push(out);
                };
                printCards(arr);
            })
            .catch(err => { throw err });
    }

    const printCards = (arr) => {
        
        universeDetails.innerHTML = "";
        universeDetails.style.display = "block"

        const sort = window.sort.older(arr);

        sort.forEach(element => {

            universeDetails.innerHTML += `
            <div class="col s10 m4 l3">
                <div class="btnCard card medium"" id="infobtn${element.imdbID}">
                    <img class="responsive-img" src="${element.Poster}">
                </div>
            </div>
            `
        });

        sort.forEach(element => {
            let detailsBtn = document.getElementById("infobtn" + element.imdbID)

            detailsBtn.onclick = () => {

                webDetails.style.display = "none";
                universeDetails.style.display = "none"
                movieDetails.style.display = "block";

                movieDetails.innerHTML = "";

                movieDetails.innerHTML += `
                <div class="col s6 m6 l6">
                    <div class="card medium">
                        <div class="card-image">
                            <img class="responsive-img" src="${element.Poster}">
                        </div>
                        <ul>
                            <li>${element.Title}</li>
                            <li>Genre: ${element.Rated}</li>
                            <li>Genre: ${element.Genre}</li>
                            <li>Time: ${element.Runtime}</li>
                        </ul>
                    </div>
                </div>
                    <br>
                    <br>
                <div class="col s6 m6 l6">
                        <div id="plotColor">
                            <b>Plot: <b>
                            <p>${element.Plot}</p>
                        </div>
                   
                </div>
                `
            }
        });
    }
}
