'use strict';

var _users = require('./users');

var express = require('express');
var bodyParser = require('body-parser');

var Joi = require('@hapi/joi');
var validator = require('express-joi-validation').createValidator({});

var app = express();
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
    res.json(_users.users);
});

app.get('/user/:id', function (req, res) {
    console.log('get user by id:', req.params.id);
    var user = _users.users.find(function (item) {
        return item.id === req.params.id;
    });
    if (user) {
        res.send('get user:\n' + JSON.stringify(user));
    } else {
        console.log('invalid user id:', req.params.id);
    }
});

var schema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

app.post('/createOrUpdateUser', validator.body(schema), function (req, res) {
    var user = req.body;
    console.log(user);

    if (user && user.id) {
        var index = _users.users.findIndex(function (item) {
            return item.id === user.id;
        });
        if (index >= 0) {
            //update
            _users.users[index] = user;
            res.send(" update user successfully!");
        } else {
            //create
            _users.users.push(user);
            res.send(" add user successfully!");
        }
    } else {
        res.send(" invalid user!");
    }
});

app.use(function (err, req, res, next) {
    if (err) {
        res.status(400).json({
            message: err.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("Server running at port:", port);
});