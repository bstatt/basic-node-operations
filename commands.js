const fs = require("fs");
const test = 'test';

//write out data
function done(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store commands
function evaluateCmd(userInput){
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  function errorHandler(command){
    process.stdout.write('Error: command not found');
    process.stdout.write('\nprompt > ');
  }

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      errorHandler(userInputArray.slice(1));
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const dataArray = data.toString().split('\n');
      const firstTwoLines = dataArray.slice(0,2).join("\n");
      done(firstTwoLines);
    });
  },
  "tail": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const dataArray = data.toString().split('\n');
      const lastTwoLines = dataArray.slice(dataArray.length - 3, dataArray.length - 1).join("\n");
      done(lastTwoLines);
    });
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
