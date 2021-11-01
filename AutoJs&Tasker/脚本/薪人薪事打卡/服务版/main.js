const TakeCard = require("TakeCard.js");
const CommandSocket = require("WebSocket.js");
new CommandSocket().init();
new TakeCard().startProgram()