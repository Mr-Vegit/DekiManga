let animeId = document.getElementById('chapter').textContent.trim();
const imgContainer = document.getElementById('chapter-img-container');
// let proxy = 'https://cors.consumet.stream';
console.log(animeId);
const response = await fetch('/anilist/chapter?id=' + animeId);
const data = await response.json();
console.log(data);
data.forEach(element => {
    const para = document.createElement('img');
    para.classList.add('chapter-img');
    para.src = element.img
    imgContainer.append(para);
});
