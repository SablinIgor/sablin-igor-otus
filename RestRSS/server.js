var express = require("express")
var bodyParser = require("body-parser")
var restRouter = require('./routes/index');

var app = express();

app.use(bodyParser.json())

app.use('/api/', restRouter);

app.listen(3000, () => {
    console.log("Server started on 3000")
})
