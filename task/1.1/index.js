function reverse(str){
    var newStr = str.split('').reverse().join('');
    return newStr; 
}

process.stdout.write("Please input string to be reversed ('q' to quit):\n")

process.stdin.on('data', function(buffer){
    var str = buffer.toString().trim();
    if(str === 'q'){
        process.stdout.write("Bye!\n");
        process.exit();
    }else{
        process.stdout.write(reverse(str) + '\n');
    }
})