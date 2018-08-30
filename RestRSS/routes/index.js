var express = require('express');
var router = express.Router();

router.get('/rss', function (req, res) {
    res.send("Показ списка всех добавленных RSS рассылок");
})

router.post('/rss', function (req, res) {
    res.send("Создание рассылки по RSS");
})

router.get('/rss/:id', function (req, res) {
    res.send("Показ всех сохраненных из RSS документов");
})

module.exports = router;
