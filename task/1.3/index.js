import { reverse } from './lib';
import { csv } from 'csvtojson';
import fs from 'fs';

const csvFile = './task/1.2/csv/example.csv';
const outFile = './dist/output.txt';

const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream(outFile);

readStream.pipe(csv()).pipe(writeStream);

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

