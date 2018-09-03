/**
 * Приложение для сохранения и показа RSS
 * Написать `NodeJS Rest API` приложение для сохранения `RSS` рассылок.
 *
 * В приложении должно быть следующие точки доступа
 * - Создание рассылки по `URL`. При успешном добавлении приложение будет запрашивать `RSS` рассылку, парсить `XML` и сохранять документы в базу данных.
 * - Показ списка всех добавленных `URL` рассылок.
 * - Показ всех сохраненных из `RSS` документов.
 */

var express = require("express")
var bodyParser = require("body-parser")
var restRouter = require('./routes/index');

var app = express();

app.use(bodyParser.json())

app.use('/api/', restRouter);

const db = require("./database/firebase");

app.listen(3000, () => {
    console.log("Server started on 3000")
})
