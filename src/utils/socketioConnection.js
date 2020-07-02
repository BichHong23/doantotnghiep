const socket = require("../controller/home/socket.controller");

module.exports = io => {
  io.on("connection", s => socket.socketConnect(s, io));
};
