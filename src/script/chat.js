var me = {};
me.avatar =
  "https://png.pngtree.com/png-clipart/20190906/original/pngtree-couple-avatar-cartoon-simple-cute-boy-portrait-school-uniform-student-png-image_4557149.jpg?sz=48";

var you = {};
you.avatar =
  "https://png.pngtree.com/png-clipart/20191022/ourlarge/pngtree-teacher-avatar-png-image_1842611.jpg";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time) {
  if (time === undefined) {
    time = 0;
  }
  var control = "";
  var date = formatAMPM(new Date());

  if (who == "me") {
    control =
      '<li style="width:100%">' +
      '<div class="msj macro">' +
      '<div class="avatar"><img class="img-circle" style="width:100%;" src="' +
      me.avatar +
      '" /></div>' +
      '<div class="text text-l">' +
      "<p style='color:#000000'>" +
      text +
      "</p>" +
      "<p><small>" +
      date +
      "</small></p>" +
      "</div>" +
      "</div>" +
      "</li>";
  } else {
    control =
      '<li style="width:100%;">' +
      '<div class="msj-rta macro">' +
      '<div class="text text-r">' +
      "<p style='color:#000000' >" +
      text +
      "</p>" +
      "<p><small>" +
      date +
      "</small></p>" +
      "</div>" +
      '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' +
      you.avatar +
      '" /></div>' +
      "</li>";
  }
  setTimeout(function() {
    $(".sub-chat")
      .append(control)
      .scrollTop($(".sub-chat").prop("scrollHeight"));
  }, time);
}

function resetChat() {
  $(".sub-chat").empty();
}

exports.insertChat = insertChat;
