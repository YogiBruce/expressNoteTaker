const fs = require("fs");
const util = require("util");


//READ file
const readFromFile = util.promisify(fs.readFile);

//WRITE file
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};

//Update file
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//Delete
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            let fileteredData = parsedData.filter((note) => {
                return note.id !=id
            });
            writeToFile(file, fileteredData)
        }
    })
};

module.exports = {readFromFile, writeToFile, readAndAppend, readAndDelete};