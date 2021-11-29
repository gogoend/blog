import Recorder from "./recorder.js";
export default (async () => {
    let mediaStream = await window.navigator.mediaDevices.getUserMedia({
        audio: {
            sampleRate: 44100,
            channelCount: 1
        }
    });
    window.recorder = new Recorder(mediaStream);
});
