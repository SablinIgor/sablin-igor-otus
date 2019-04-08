// читаем переменную с указанием адреса базы
require('dotenv-flow').config({ default_node_env: 'development' });

// Connection URL
const url = process.env.DBURL;

const db = require('monk')(url)

module.exports = db;



