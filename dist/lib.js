'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeToFile = exports.reverse = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reverse = exports.reverse = function reverse(str) {
    var newStr = str.split('').reverse().join('');
    return newStr;
};

var writeToFile = exports.writeToFile = function writeToFile(outFile, str) {
    _fs2.default.appendFile(outFile, str, function (err) {
        if (err) console.error(err);
    });
};