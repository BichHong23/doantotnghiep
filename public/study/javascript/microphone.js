let isChecked = false;
navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then(function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    let audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const audiosource = document.getElementById("audiosource");

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("audio", audioUrl);

      const sourceElement = document.createElement("source");

      audiosource.appendChild(sourceElement);

      sourceElement.src = audioUrl;

      audiosource.pause();
    });

    $("#btnRecord").click(function() {
      audioChunks = [];
      if(confirm("Bắt đầu ghi âm !") == false) {
        return;
      }
      mediaRecorder.start();
    });

    $("#btnPlayRecord").click(function() {
      if(confirm("Dừng ghi âm !") == false) {
        return;
      }
      mediaRecorder.stop();
    });

    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    javascriptNode.onaudioprocess = function() {
      let array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      let values = 0;

      let length = array.length;
      for (let i = 0; i < length; i++) {
        values += array[i];
      }

      let average = values / length;

      //   console.log("microphone", $("#microphone").attr("aria-valuenow"));

      $("#microphone").attr("aria-valuenow", Math.round(average));
      $("#microphone").css("width", `${Math.round(average)}%`);

      //   console.log(Math.round(average));
      // colorPids(average);
    };
  })
  .catch(function(err) {
    /* handle the error */
  });
