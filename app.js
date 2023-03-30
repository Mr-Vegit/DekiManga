const express = require("express");
const path = require('path');
const app = express();
const port = 80;
const { META } = require("@consumet/extensions");
const { PROVIDERS_LIST } = require("@consumet/extensions");
const provider = 'mangadex'
const possibleProvider = PROVIDERS_LIST.MANGA.find(
        (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
      );
const anilist = new META.Anilist()
const anilistManga = new META.Anilist.Manga(possibleProvider);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded({ extended: false }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'templates')); //set the views directory

//END_POINTS
app.get('/', (req, res) => {
    const params = {"page": '1' }
    res.status(200).render('index.pug', params)
})
app.get('/recent-release', (req, res) => {
    const page = +req.query.page
    const params = {"page": page }
    res.status(200).render('index.pug', params)
})
app.get('/manga-details/:id', (req, res) => {
    const id = +req.params.id
    const params = {"mangaId": id }
    res.status(200).render('mangadetails.pug', params)
})
app.get('/manga-chapter', (req, res) => {
    const id = req.query.id
    const params = {"chapterId": id }
    res.status(200).render('chapterReader.pug', params)
})
// API
app.get('/anilist/recent-release', async (req, res) => {
        // const perPage = +req.query.perPage
        const page = +req.query.page
        anilist.advancedSearch(undefined,'MANGA',page,20,undefined,'UPDATED_AT_DESC').then(data => {
            // console.log(data);
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json({
                status: 500,
                error: 'Internal Error',
                message: err,
            });
        })
})
app.get('/anilist/info/:id', async (req, res) => {
        // const perPage = +req.query.perPage
        const id = req.params.id
        console.log(id);
        anilistManga.fetchMangaInfo(id).then(data => {
            // console.log(data);
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json({
                status: 500,
                error: 'Internal Error',
                message: err,
            });
        })
})
app.get('/anilist/chapter', async (req, res) => {
    // const perPage = +req.query.perPage
    const id = req.query.id
    console.log(id);
    anilistManga.fetchChapterPages(id).then(data => {
        // console.log(data);
        res.status(200).json(data)
    })
    .catch((err)=>{
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    })
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application has started successfully on port ${port}`);
});
