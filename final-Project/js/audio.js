// appends an audio element to playback and download recording
function createAudioElement(blobUrl) {

    const downloadEl = document.createElement('a');
    var audiop = document.getElementById('audio-player');
    
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = 'audio.wav';
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/wav';
    audioEl.appendChild(sourceEl);
    audiop.appendChild(audioEl);
    audiop.appendChild(downloadEl);
}


 function recordAudio() {
     
// request permission to access audio stream
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    // store streaming data chunks in array
    const chunks = [];
    // create media recorder instance to initialize recording
    const recorder = new MediaRecorder(stream);
    // function to be called when data is received
    recorder.ondataavailable = e => {
      // add stream data to chunks
      chunks.push(e.data);
      // if recorder is 'inactive' then recording has finished
      if (recorder.state == 'inactive') {
          // convert stream data chunks to a 'wav' audio format as a blob
          const blob = new Blob(chunks, { type: 'audio/wav' });
          // convert blob to URL so it can be assigned to a audio src attribute
          createAudioElement(URL.createObjectURL(blob));
      }
    };
    // start recording with 1 second time between receiving 'ondataavailable' events
    recorder.start(1000);
    // setTimeout to stop recording after 4 seconds
    setTimeout(() => {
        // this will trigger one final 'ondataavailable' event and set recorder state to 'inactive'
        recorder.stop();
    }, 8000);
  }).catch(console.error);
 }