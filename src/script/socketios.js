const io = require("socket.io-client");
const socket = io("http://localhost:2000");
//const socket = io("https://hoctructuyen.herokuapp.com");
const Peer = require("simple-peer");
const camera = require("./camera");

/* <video id="localVideo" class="iframe" autoplay playsinline></video> */

const $ = require("jquery");
const chat = require("./chat");

const useTrickle = true;
const constraints = {
  audio: true,
  video: true,
};
const peers = {};
let slideIndex = 1;
const teacher = [];

function showSlides(n) {
  let i;
  const slides = $(".mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[n - 1].style.display = "block";
}

function toggleMicrophone(id) {
  console.log("id", id);
  const vid = document.getElementById(id);
  vid.muted = !vid.muted;
}

showSlides(slideIndex);

socket.on("connect", async () => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  camera.openCamera(stream, `localStream`);

  const role = parseInt($("#userRole").val());

  if (role == 2) {
    camera.openCamera(stream, `teacherStream`);
  }

  const channel = $("#classId").val() + "__" + $("#classTime").val();

  socket.emit("join", {
    channel,
    userdata: {
      name: $("#userName").val(),
      type: role == 1 ? "STUDENT" : role == 2 ? "TEACHER" : "ADMIN",
      userId: $("#userid").val,
    },
  });

  $(".mytext").on("keydown", function (e) {
    if (e.which == 13) {
      var text = $(this).val();
      if (text !== "") {
        chat.insertChat("me", text, 0);
        socket.emit("chat", { channel, name: $("#userName").val(), text });
        $(this).val("");
      }
    }
  });

  document.querySelector("#videos-container").addEventListener(
    "DOMSubtreeModified",
    function () {
      document.querySelector(".media-container").addEventListener(
        "DOMSubtreeModified",
        function () {
          socket.emit("eventshare", { channel, index: "1" });
          console.log("share");
        },
        false
      );
    },
    false
  );

  $("#btn_prev").click(() => {
    socket.emit("showslide", {
      channel,
      index: slideIndex,
    });
    const slides = $(".mySlides");
    slideIndex = slideIndex - 1;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }
  });

  $("#btn_next").click(() => {
    socket.emit("showslide", {
      channel,
      index: slideIndex,
    });
    const slides = $(".mySlides");
    slideIndex = slideIndex + 1;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }
  });
});

socket.on("chat", (data) => {
  const channel = $("#classId").val() + "__" + $("#classTime").val();
  data.channel = channel;
  chat.insertChat(data.name, data.text, 0);
});

socket.on("eventshare", (data) => {
  console.log("has share");
  let checkStudent = !!document.querySelector("#join-room");
  if (
    checkStudent &&
    confirm(`Giảng viên đang chia sẻ màn hình, bạn có muốn xem không?`)
  ) {
    joinRoom();
  }
});

socket.on("showslide", (s) => {
  console.log("showslide", s);

  showSlides(s);
});

socket.on("newUser", (res) => {
  $("#userOnline").html("");
  console.log(res);
  res.data.forEach((e) => {
    $("#userOnline").append(`<tr id="userFrame${e.id}">
    <td scope="row">
      <i class="fa fa-graduation-cap"></i>
    </td>
    <td>
      <div class="about">
        <div class="status">
          ${e.type}
        </div>
        <div class="name"> ${e.name}</div>
      </div>
    </td>
    <td>
    <button onclick="toggleMicrophone('${e.id}')"  style="
    background: transparent;
    border: 0;
">
    <i id="icon${e.id}" class="fa fa-microphone"></i>
    </button>
    </td>
  </tr>`);
  });
});

socket.on("peer", async (data) => {
  console.log("userdata", data);
  const userdata = data.userdata;
  const peerId = data.peerId;
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  // camera.openCamera(stream, `video${peerId}`);
  const peer = new Peer({
    initiator: data.initiator,
    trickle: useTrickle,
    stream,
  });

  socket.on("signal", (e) => {
    if (e.peerId == peerId) {
      //console.log("Received signalling data", e, "from Peer ID:", peerId);
      peer.signal(e.signal);
    }
  });
  socket.on("removePeer", (e) => {
    //console.log(e.peerId + "is removed");
    $("#boxStudent").find(`#video${e.peerId}`).remove();

    $(`#userFrame${e.peerId}`).remove();
  });
  peer.on("signal", (e) => {
    //console.log("Advertising signalling data", e, "to Peer ID:", peerId);
    const channel = $("#classId").val() + "__" + $("#classTime").val();

    socket.emit("signal", {
      channel,
      signal: e,
      peerId,
    });
  });
  peer.on("error", (e) => {
    //console.log("Error sending connection to peer %s:", peerId, e);
  });
  peer.on("connect", () => {
    //console.log("Peer connection established");
    peer.send("hey peer");
  });
  peer.on("stream", (s) => {
    if (userdata.type == "TEACHER") {
      camera.openCamera(s, `teacherStream`);
    } else {
      $("#boxStudent").append(
        `<video id="video${peerId}" class="iframe" autoplay playsinline></video> `
      );
      camera.openCamera(s, `video${peerId}`);
    }

    // //console.log(s);
    // got remote video stream, now let's show it in a video tag
    //console.log("got remote video stream, now let's show it in a video tag");
  });
  peer.on("data", (e) => {
    // camera.openCamera(e.signal, "remoteVideo");
    // camera.openCamera(e, `video${peerId}`);
    //console.log("Recieved data from peer:", e);
  });
  peers[peerId] = peer;
});
