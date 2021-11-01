var TakeCard = require("TakeCard.js");
var CommandSocket = require("WebSocket.js");
var commandSocket = new CommandSocket().connect()
var takeCard = new TakeCard().startProgram()