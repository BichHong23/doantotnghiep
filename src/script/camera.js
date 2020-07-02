const openCamera = (stream, id) => {
    const video = document.getElementById(id);
    const videoTracks = stream.getVideoTracks();
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
}

exports.openCamera = openCamera;