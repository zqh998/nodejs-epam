
var fs = require("fs");
var outFile = './task/1.2/output.txt';
//clear the output file
fs.writeFile(outFile, '', function (err) {
    if (err) console.error(err);
});
//append string to file
function writeToFile(str) {
    fs.appendFile(outFile, str, function (err) {
        if (err) console.error(err);
    });
}

var csvFile = './task/1.2/csv/example.csv'
var csv = require('csvtojson')

csv()
    .fromFile(csvFile)
    .then((jsonObjArr) => {
        jsonObjArr.forEach(jsonObj => {
            delete jsonObj.Amount;
            writeToFile(JSON.stringify(jsonObj) + '\n');   
        });
    }, (err) => {
        console.error(err);
    })