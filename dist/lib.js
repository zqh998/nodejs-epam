'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var reverse = exports.reverse = function reverse(str) {
    var newStr = str.split('').reverse().join('');
    return newStr;
};