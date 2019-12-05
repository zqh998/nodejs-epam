
//append string to file
function writeToFile(outFile, str) {
    fs.appendFile(outFile, str, function (err) {
        if (err) console.error(err);
    });
}

var csvFile = './task/1.2/csv/example.csv';
var csv = require('csvtojson');
var fs = require("fs");
var outFile = './task/1.2/output.txt';
//clear the output file
fs.writeFile(outFile, '', function (err) {
    if (err) console.error(err);
});

csv()
    .fromFile(csvFile)
    .then((jsonObjArr) => {
        jsonObjArr.forEach(jsonObj => {
            delete jsonObj.Amount;
            writeToFile(outFile, JSON.stringify(jsonObj) + '\n');   
        });
    }, (err) => {
        console.error(err);
    })

process.stdout.write("\nTransform csv file to txt file successfully!\n");