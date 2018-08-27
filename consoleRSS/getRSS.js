/**
 *  Приложение для сохранения RSS
 *  Запрашивает RSS рассылку, парсит XML и сохраняет документы в БД.
 *
 *  Пример: Граббер сайта - который запускаем из командной строки, он читает новости с sports.ru и сохраняет в DB
 */

const mongoose = require('mongoose');

const RSS_URL = process.argv[2] || "https://www.anekdot.ru/rss/export_a.xml";

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://user:superuser2018@ds235022.mlab.com:35022/otus-js-rss';

// Database Name
const dbName = 'otus-js-rss';

// RSS parser
let Parser = require('rss-parser');
let parser = new Parser();

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);

    parser.parseURL(RSS_URL).then(feed =>{

        const collection = db.collection('rss_feed');

        collection.insertMany(feed.items);
        console.log("Parsing and save complete!")

        client.close();
    })
});
