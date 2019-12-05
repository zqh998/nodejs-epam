import { reverse, writeToFile } from './lib';
import { csv } from 'csvtojson';

const csvFile = './task/1.2/csv/example.csv';
const outFile = './dist/output.txt';

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

process.stdout.write("Please input string to be reversed ('q' to quit):\n");

process.stdin.on('data', buffer => {
    const str = buffer.toString().trim();
    if (str === 'q') {
        process.stdout.write("Bye!\n");
        process.exit();
    } else {
        process.stdout.write(reverse(str) + '\n');
    }
})

