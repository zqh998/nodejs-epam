
var csvFile = './task/1.2/csv/example.csv';
var csv = require('csvtojson');
var fs = require("fs");
var outFile = './task/1.2/output.txt';
//clear the output file
fs.writeFile(outFile, '', function (err) {
    if (err) console.error(err);
});

var readStream = fs.createReadStream(csvFile);
var writeStream = fs.createWriteStream(outFile);

readStream.pipe(csv()).pipe(writeStream);
process.stdout.write("\nTransform csv file to txt file successfully!\n");