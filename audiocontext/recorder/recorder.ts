import { createWavFile, downloadBlob, mergeArray } from "./save-to-file.js"

function createJSNode(audioContext: AudioContext) {
    const BUFFER_SIZE = 4096
    const INPUT_CHANNEL_COUNT = 2
    const OUTPUT_CHANNEL_COUNT = 2
    let creator = audioContext.createScriptProcessor
    creator = creator.bind(audioContext)
    return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT)
}

function onAudioProcess(ev: AudioProcessingEvent, lChannelList: Float32Array[]) {
    let audioBuffer = ev.inputBuffer
    let leftChannelData = audioBuffer.getChannelData(0)
    lChannelList.push(leftChannelData.slice(0))
}

export default class Recorder {
    jsNode: ScriptProcessorNode = null
    mediaNode: MediaStreamAudioSourceNode = null
    leftChannelList: Float32Array[] = []
    aCtx: AudioContext = null
    mediaStream: MediaStream = null
    constructor(mediaStream: MediaStream) {
        this.mediaStream = mediaStream

        this.aCtx = new AudioContext
        this.mediaNode = this.aCtx.createMediaStreamSource(mediaStream)
        this.jsNode = createJSNode(this.aCtx)
        this.jsNode.connect(this.aCtx.destination)
        this.mediaNode.connect(this.jsNode)
    }
    beginRecord() {
        this.jsNode.onaudioprocess = (ev) => {
            onAudioProcess(ev, this.leftChannelList)
        }
    }
    pauseRecord() {
        this.jsNode.onaudioprocess = null
    }
    destory() {
        this.mediaStream.getAudioTracks()[0].stop();
        this.mediaNode.disconnect();
        this.jsNode.disconnect();
    }
    saveWaveFile() {
        let leftData = mergeArray(this.leftChannelList)

        let allData = leftData;
        let waveBuffer = createWavFile(allData)
        let blob = new Blob([new Uint8Array(waveBuffer)])
        downloadBlob(blob, new Date().toUTCString() + '.wav')
    }
}