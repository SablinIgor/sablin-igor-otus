require('dotenv-flow').config({ default_node_env: 'development' });

const firebase = require("firebase");

const config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
};

firebase.initializeApp(config)

const database = firebase.database();

module.exports = database;
