'use strict';

var _user = require('../services/user');

var express = require('express');
var router = express.Router();

router.get('/listUsers', async function (req, res) {
    var users = await _user.UserService.getAllUsers();
    res.json(users);
});

router.get('/user/:id', async function (req, res) {
    var user = await _user.UserService.getUserById(req.params.id);
    if (user) {
        res.send('get user:\n' + JSON.stringify(user));
    } else {
        res.send('invalid user id:' + req.params.id);
    }
});

router.get('/deleteUser/:id', async function (req, res) {
    console.log('delete user by id:', req.params.id);
    var user = await _user.UserService.getUserById(req.params.id);
    if (user) {
        var updateRecord = await _user.UserService.deleteUser(req.params.id);
        if (updateRecord) {
            res.send("User:" + user.login + " is marked as 'deleted' successfully");
        } else {
            res.send("user failed to be marked as 'deleted'");
        }
    } else {
        res.send('invalid user id:' + req.params.id);
    }
});

router.post('/createOrUpdateUser', async function (req, res) {
    var user = req.body;
    console.log('user:', user);

    if (user && user.id) {
        var existedUser = await _user.UserService.getUserById(user.id);
        if (existedUser) {
            //update
            var updateRecord = await _user.UserService.updateUser(user);
            if (updateRecord) {
                res.send(" Update user: " + user.login + " successfully!");
            } else {
                res.send('failed to update user');
            };
        } else {
            //create
            var newUser = await _user.UserService.createUser(user);
            if (newUser) {
                res.send(" Create user: " + newUser.login + " successfully!");
            } else {
                res.send('failed to create user');
            };
        }
    } else {
        res.send(" invalid user!");
    }
});

module.exports = router;