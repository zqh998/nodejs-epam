'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use('/', require('./routers/index'));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("Server running at port:", port);
});