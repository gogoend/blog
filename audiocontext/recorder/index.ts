import Recorder from "./recorder.js"

declare global {
    interface Window {
        recorder: Recorder
    }
}

export default (async () => {
    let mediaStream = await window.navigator.mediaDevices.getUserMedia({
        audio: {
            sampleRate: 44100,
            channelCount: 1
        }
    })

    window.recorder = new Recorder(mediaStream)
})