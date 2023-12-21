const fs = require('fs');
const path = require('path');

const directory = __dirname;

fs.readdir(directory, (_, files) => files.forEach(async file => {
  if (file !== "testAnswers.js" && path.extname(file) === ".js") {
    const filePath = path.join(directory, file);
    console.log(file)
    await require(filePath);
  }
}));
