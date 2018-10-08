const commands = require("./commands.js");
//prompt the user for input
process.stdout.write('prompt > ');
//the stdin 'data' event triggers after the user types in a line
process.stdin.on('data', (userInput) => {
  userInput = userInput.toString().trim();
  commands.evaluateCmd(userInput);
});
