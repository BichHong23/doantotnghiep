const _ = require("lodash");
const channels = {};
const sockets = {};
const slides = {};

const DEFAULT_PEER_COUNT = 5;
exports.socketConnect = (socket, io) => {
  console.log("Connection with ID:", socket.id);

  socket.channels = {};
  sockets[socket.id] = socket;

  socket.on("disconnect", function() {
    console.log("Disconnection with ID:", socket.id);
    // socket.emit("remove-peer", {
    //   peerId: socket.id
    // });
    for (var channel in socket.channels) {
      part(channel);
    }
    delete sockets[socket.id];
    // channels.forEach(function(socket2) {
    //   console.log("Advertising peer %s to %s", socket.id, socket2.id);
    //   socket2.emit("remove-peer", {
    //     peerId: socket.id
    //   });
    // });
  });

  function part(channel) {
    console.log("[" + socket.id + "] part ");

    if (!(channel in socket.channels)) {
      console.log("[" + socket.id + "] ERROR: not in ", channel);
      return;
    }

    delete socket.channels[channel];
    delete channels[channel][socket.id];

    for (id in channels[channel]) {
      channels[channel][id].emit("removePeer", { peerId: socket.id });
      socket.emit("removePeer", { peerId: id });
    }
  }

  socket.on("showslide", function(config) {
    var channel = config.channel;
    var index = config.index;
    console.log(config);
    for (id in channels[channel]) {
      channels[channel][id].emit("showslide", index);
    }
  });

  socket.on("join", function(config) {
    console.log("[" + socket.id + "] join ", config);
    var channel = config.channel;
    var userdata = config.userdata;
    userdata.id = socket.id;

    if (channel in socket.channels) {
      console.log("[" + socket.id + "] ERROR: already joined ", channel);
      return;
    }

    if (!(channel in channels)) {
      channels[channel] = {};
    }

    for (id in channels[channel]) {
      console.log("Emit peer from peer");
      channels[channel][id].emit("peer", {
        peerId: socket.id,
        userdata,
        initiator: false
      });
      socket.emit("peer", {
        peerId: id,
        userdata: channels[channel][id].userdata,
        initiator: true
      });
    }

    socket.userdata = userdata;
    channels[channel][socket.id] = socket;
    socket.channels[channel] = channel;

    console.log(channels);
    const alluser = getUsers(channel);
    for (id in channels[channel]) {
      channels[channel][id].emit("newUser", {
        data: alluser
      });
    }
  });

  socket.on("chat", function(data) {
    const channel = data.channel;
    console.log("chat" + channel);
    for (id in channels[channel]) {
      if (id != socket.id) {
        channels[channel][id].emit("chat", data);
      }
    }
  });

  socket.on("eventshare", function (data) {
    const channel = data.channel;
    console.log("eventshare" + channel);
    for (id in channels[channel]) {
      if (id != socket.id) {
        channels[channel][id].emit("eventshare", data);
      }
    }
  });

  function getUsers(channel) {
    const list = [];
    for (id in channels[channel]) {
      list.push(channels[channel][id].userdata);
    }

    return list;
  }

  socket.on("signal", function(data) {
    console.log("signal peer from %s", data.peerId);
    const channel = data.channel;
    // const channel = "MonToan";
    const peerId = data.peerId;
    if (peerId in sockets) {
      sockets[peerId].emit("signal", {
        signal: data.signal,
        peerId: socket.id
      });
    }
  });
};
