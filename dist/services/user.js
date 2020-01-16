'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _user = require('../models/user');

var UserService = exports.UserService = {
    getAllUsers: async function getAllUsers() {
        var users = await _user.User.findAll();
        return users;
    },
    getUserById: async function getUserById(uid) {
        console.log('get user by id:', uid);
        var users = await _user.User.findAll({ where: { id: uid } });
        if (users && users.length > 0) {
            return users[0];
        } else {
            return null;
        }
    },
    deleteUser: async function deleteUser(uid) {
        var updateRecord = await _user.User.update({ isdeleted: true }, { where: { id: uid } });
        return updateRecord;
    },
    createUser: async function createUser(user) {
        var newUser = await _user.User.create(user);
        return newUser;
    },
    updateUser: async function updateUser(user) {
        var updateRecord = await _user.User.update(user, { where: { id: user.id } });
        return updateRecord;
    }
};