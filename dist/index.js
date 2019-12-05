'use strict';

var _lib = require('./lib');

var _csvtojson = require('csvtojson');

var csvFile = './task/1.2/csv/example.csv';
var outFile = './dist/output.txt';

(0, _csvtojson.csv)().fromFile(csvFile).then(function (jsonObjArr) {
    jsonObjArr.forEach(function (jsonObj) {
        delete jsonObj.Amount;
        (0, _lib.writeToFile)(outFile, JSON.stringify(jsonObj) + '\n');
    });
}, function (err) {
    console.error(err);
});

process.stdout.write("\nTransform csv file to txt file successfully!\n");

process.stdout.write("Please input string to be reversed ('q' to quit):\n");

process.stdin.on('data', function (buffer) {
    var str = buffer.toString().trim();
    if (str === 'q') {
        process.stdout.write("Bye!\n");
        process.exit();
    } else {
        process.stdout.write((0, _lib.reverse)(str) + '\n');
    }
});