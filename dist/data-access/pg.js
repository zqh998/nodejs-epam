'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Sequelize = require('sequelize');
var sequelize = exports.sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/epamdb', {
    define: {
        timestamps: false
    }
});
sequelize.authenticate().then(function () {
    console.log('DBConnection has been established successfully');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});