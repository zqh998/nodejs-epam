'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _pg = require('../data-access/pg');

var Sequelize = require('sequelize');

var User = exports.User = _pg.sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING(20)
    },
    password: {
        type: Sequelize.STRING(20)
    },
    age: {
        type: Sequelize.INTEGER
    },
    isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

User.sync().then(function () {
    console.log('Sync User model with users table in db successfully');
});