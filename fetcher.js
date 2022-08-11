const request = require('request');
const readline = require('readline');
const fs = require('fs');
const arg = process.argv.slice(2);
const requestUrl = arg[0];
const localPath = arg[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Create a function that takes url and local and pass it to request module 
const requestFunction = function (url, path) {
  request(url, (error, response, body) => {

    fs.writeFile(path, body, err => { //takes the body returned and writes it in the given path
      if (err) {
        console.error(err);
      }else {
        console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);

      }
    });
  });

};


if(!requestUrl || !localPath){//checks if both url or patha re invalid
  console.log('provde a valid url or local path');
  rl.close();
}else {
  if (fs.existsSync(localPath)) {
    rl.question('File path already exists do you want to overwride it? [y/n]:  ', (answer) => {
      if (answer === 'y') {
        requestFunction(requestUrl, localPath);
      } else if (answer === 'n') {
        console.log("Cannot process request for existing file");
      }
      rl.close();
    });
  }
}



