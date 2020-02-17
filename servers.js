const express = require("express");
app = express();
app.use(express.static(__dirname + "/public"));

const socketIo = require("socket.io");

const io = socketIo(app.listen(8003));

console.log("Listening port on 8003");

module.exports = {io, app}