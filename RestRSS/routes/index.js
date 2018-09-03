const express = require('express');
const db = require("../database/mongodb");
const router = express.Router();

// RSS parser
let Parser = require('rss-parser');
let parser = new Parser();

router.get('/rss', function (req, res) {
    console.log("Call GET rss request.")

    const rssCollection = db.get('rss_feed');

    rssCollection.find({}, 'url')
        .then((rss) => {
            res.send(rss);
        })

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
            .then((value) => {
                console.log("RSS saved!")
                res.status(201).send("OK");
            })
            .catch((err) => {
                console.log(err)
                console.log(
                    "ERROR! Something went wrong: " + err.errmsg
                )
                res.status(500).send(err.errmsg);
            })

    })

})

router.get('/rss/:id', function (req, res) {
    console.log("Call GET rss request.")

    const rssCollection = db.get('rss_feed');

    try{
        rssCollection.findOne({_id: req.params.id})
            .then((rss) => {
                console.log("find: " + rss);
                res.send(rss.documents);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err.errmsg);
            })
    } catch (e) {
        console.log(
            "ERROR! Something went wrong: " + e
        )
        res.status(500).send("ERROR! Something went wrong: " + e);
    }
})

module.exports = router;
