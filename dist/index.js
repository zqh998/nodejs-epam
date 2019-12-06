'use strict';

var _lib = require('./lib');

var _csvtojson = require('csvtojson');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csvFile = './task/1.2/csv/example.csv';
var outFile = './dist/output.txt';

var readStream = _fs2.default.createReadStream(csvFile);
var writeStream = _fs2.default.createWriteStream(outFile);

readStream.pipe((0, _csvtojson.csv)()).pipe(writeStream);

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