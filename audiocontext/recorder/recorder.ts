import { createWavFile, downloadBlob, mergeArray } from "./save-to-file.js"

function createCollectNode(audioContext: AudioContext) {
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
    leftChannelList: Float32Array[] = []
    aCtx: AudioContext = null
    mediaStream: MediaStream = null
    
    collectNode: ScriptProcessorNode = null
    audioContextNodes = []
    constructor(mediaStream: MediaStream) {
        this.mediaStream = mediaStream

        this.aCtx = new AudioContext
        this.collectNode = createCollectNode(this.aCtx)

        this.audioContextNodes = [
            this.aCtx.createMediaStreamSource(mediaStream),
            this.collectNode,
            this.aCtx.destination
        ]

        this.linkNodes()
    }
    linkNodes() {
        for(let i = 0; i < this.audioContextNodes.length; i++) {
            let currentNode = this.audioContextNodes[i]
            let nextNode = this.audioContextNodes[i+1]

            if (nextNode) {
                currentNode.connect(nextNode)
            }
        }
    }
    beginRecord() {
        this.collectNode.onaudioprocess = (ev) => {
            onAudioProcess(ev, this.leftChannelList)
        }
    }
    pauseRecord() {
        this.collectNode.onaudioprocess = null
    }
    destory() {
        this.mediaStream.getAudioTracks()[0].stop();
        this.audioContextNodes.forEach(node => node.disconnect())
    }
    saveWaveFile() {
        let leftData = mergeArray(this.leftChannelList)

        let allData = leftData;
        let waveBuffer = createWavFile(allData)
        let blob = new Blob([new Uint8Array(waveBuffer)])
        downloadBlob(blob, new Date().toUTCString() + '.wav')
    }
}