import fs from 'fs';

export const reverse = str => {
    var newStr = str.split('').reverse().join('');
    return newStr; 
}

export const writeToFile = (outFile, str) => {
    fs.appendFile(outFile, str, function (err) {
        if (err) console.error(err);
    });
}