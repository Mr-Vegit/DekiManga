let animeId = document.getElementById('mangaName').textContent.trim();
const recommendationsTemplate = document.querySelector('.recommendation-template');
const recommendationsContainer = document.querySelector('.my-slider');
const chapterContainer = document.querySelector('#chapter-container');
// let proxy = 'https://cors.consumet.stream/';
console.log(animeId);
const response = await fetch('/anilist/info/' + animeId);
const data = await response.json();
console.log(data);
let img = document.getElementById('anime-img');
img.src = data.image;
Array.from(document.getElementsByClassName('anime-title')).forEach(element => {
    element.innerText = data.title.romaji;
});
// Array.from(document.getElementsByClassName('anime-other-names')).forEach(element => {
//     element.innerText= data.otherNames;
// });
document.getElementById('anime-total-episodes').innerText = data.totalEpisodes;
document.getElementById('anime-type').innerText = data.type;
document.getElementById('anime-Status').innerText = data.status;
document.getElementById('anime-releaseDate').innerText = data.releaseDate;
document.getElementById('bookmark-link').href = "/bookmark-save-delete?animeId=" + animeId + "&animeTitle=" + data.title.romaji + "&img=" + data.image;
let description = data.description;
let info = description.replace(/[^a-zA-Z0-9 ]/g, '\xA0');
document.getElementById('anime-description').innerText = info;
let genra = Array.from(document.getElementsByClassName('anime-genre-container'))
var count = Object.keys(data.genres).length;
genra.forEach((element) => {
    for (let i = 0; i < count; i++) {
        let para = document.createElement("p");
        para.innerHTML = data.genres[i];
        para.classList.add("genre-btn")
        element.appendChild(para);
    }
});

let episode_Container = document.getElementById('Episode-Container')
var Episode_number = parseInt(data.totalEpisodes, 10);
let recomendation = data.recommendations.map((user) => {
    const card = recommendationsTemplate.content.cloneNode(true).children[0];
    const AnimeTitle = card.querySelector(".recommendation-cards-txt");
    const AnimeImg = card.querySelector('.recommendation-img');
    const AnimeLink = card.querySelector('.recommendation-cards-img-container');
    AnimeTitle.textContent = user.title.romaji;
    AnimeImg.src = user.image;
    AnimeLink.href = '/manga-details/' + user.id;
    recommendationsContainer.append(card);
    return { element: card };
});
const slider = tns({
    container: ".my-slider",
    "slideBy": 1,
    "speed": 400,
    "nav": false,
    loop: false,
    controlsContainer: "#controls",
    prevButton: ".previous",
    nextButton: ".next",
    mouseDrag: true,
    responsive: {
        1024: {
            items: 6,
            gutter: 20
        },
        750: {
            items: 5,
            gutter: 20
        },
        480: {
            items: 4,
            // gutter:20    
        },
        0: {
            items: 3
        }
    }
});
let totalchps = Object.keys(data.chapters).length;
console.log(totalchps);
let firstchp=document.getElementById('first-chapter');
firstchp.innerHTML=data.chapters[0].title;
firstchp.href='/manga-chapter?id='+ data.chapters[0].id;
let lastchp=document.getElementById('last-chapter');
lastchp.innerHTML=data.chapters[totalchps-1].title;
lastchp.href='/manga-chapter?id='+ data.chapters[totalchps-1].id;
data.chapters.forEach((element)=> {
    const para= document.createElement('a');
    para.classList.add('chapter-reader')
    para.href = '/manga-chapter?id='+ element.id;
    para.innerText = element.title;
    chapterContainer.append(para);
});