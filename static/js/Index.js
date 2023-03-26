const userCardTemplate = document.querySelector('.recents-anime-template');
const userCardContainer = document.querySelector('#recents-anime-container');
let users = [];
const params = { method: 'GET' };
// let proxy = 'https://cors.consumet.stream/';
let page = document.getElementById("pagename").textContent.trim();
let pagename = "page=" + page;
const response = await fetch('/anilist/recent-release?' + pagename);
const animeRecents = await response.json();
console.log(animeRecents);
function limitWord(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
}
users = animeRecents.results.map(user => {
    const card = userCardTemplate.content.cloneNode(true).children[0];
    const AnimeTitle = card.querySelector(".recents-anime-title");
    const AnimeImg = card.querySelector('.recents-anime-img');
    const AnimeLink = card.querySelector('.recents-anime-link');
    const AnimeStatus = card.querySelector('.recent-sub-or-dub');
    AnimeTitle.textContent = limitWord(user.title.romaji,8);
    AnimeStatus.textContent = user.status;
    AnimeImg.src = user.image;
    AnimeLink.href = '/manga-details/' + user.id ;
    userCardContainer.append(card);
    return { element: card ,sub: user.status,elem: AnimeStatus};
});
users.forEach(user => {
    if (user.sub.toLowerCase().includes("completed")) {
        user.elem.style.backgroundColor = "rgb(0 135 199";
    } else {
        user.elem.style.backgroundColor = "red";
    }
});

let pagenum = parseInt(page, 10)
let pages_li = Array.from(document.getElementsByClassName('pages-a'))
let first_page = document.getElementById("first-page")
let last_page = document.getElementById("last-page")
first_page.href = "/recent-release?page=1";
last_page.href = "/recent-release?page=22";
if (pagenum <= 2) {
    pagenum = 2
    let object = [
        { id: pagenum, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
    ]
    pages_li.forEach((element, i) => {
        element.innerHTML = object[i].num
        element.href = object[i].link
    });
} else if (pagenum > 2) {
    pagenum++;
    let object = [
        { id: pagenum, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
    ]
    pages_li.forEach((element, i) => {
        element.innerHTML = object[i].num
        element.href = object[i].link
    });

}
else {
    pagenum = 2
    let object = [
        { id: pagenum, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
        { id: pagenum++, num: pagenum, link: "/recent-release?page=" +pagenum  },
    ]
    pages_li.forEach((element, i) => {
        element.innerHTML = object[i].num
        element.href = object[i].link
    });
}