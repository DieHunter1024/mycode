var TakeCard = require("TakeCard.js");
var CommandSocket = require("CommandSocket.js");
var takeCard = new TakeCard()
var commandSocket = new CommandSocket(takeCard).connect()
