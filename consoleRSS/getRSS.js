/**
 *  Приложение для сохранения RSS
 *  Запрашивает RSS рассылку, парсит XML и сохраняет документы в БД.
 *
 *  Адрес базы данных указывается в переменной окружения DBURL.
 *  Пример: DBURL="mongodb://user:password@somehost.com:port/dbname"
 *
 *  При запуске указывается путь к рассылке
 *  Пример: npm start http://static.feed.rbc.ru/rbc/logical/footer/news.rss
 */

const RSS_URL = process.argv[2] || "https://www.anekdot.ru/rss/export_a.xml";

const MongoClient = require('mongodb').MongoClient;

// читаем переменную с указанием адреса базы
require('dotenv-flow').config({ default_node_env: 'development' });

// Connection URL
const url = process.env.DBURL;

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

        collection.createIndex({"guid":1}, { unique: true });

        collection.insertMany(feed.items);
        console.log("Parsing and save complete!")

        client.close();
    })
});
