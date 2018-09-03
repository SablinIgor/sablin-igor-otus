const express = require('express');
const db = require("../database/mongodb");
const router = express.Router();

// RSS parser
let Parser = require('rss-parser');
let parser = new Parser();

router.get('/rss', function (req, res) {
    res.send("Показ списка всех добавленных RSS рассылок");
})

router.post('/rss', function (req, res) {

    parser.parseURL(req.body.rss).then(feed =>{

        // save rss
        const newRSS = {
            url: req.body.rss,
            created: (new Date()).getTime(),
            pubdate: feed.pubDate,
            documents: feed.items
        }

        const rssCollection = db.get('rss_feed');

        rssCollection.insert(newRSS)
            .then((res) => {
                console.log("RSS saved!")
                res.status(201).send("OK");
            })
            .catch((err) => {
                console.log(
                    "ERROR! Something went wrong: " + err.errmsg
                )
                res.status(500).send(err.errmsg);
            })

    })

})

router.get('/rss/:id', function (req, res) {
    res.send("Показ всех сохраненных из RSS документов: " + req.params.id);
})

module.exports = router;
