import { createWavFile, downloadBlob, mergeArray } from "./save-to-file.js";
function createCollectNode(audioContext) {
    const BUFFER_SIZE = 4096;
    const INPUT_CHANNEL_COUNT = 2;
    const OUTPUT_CHANNEL_COUNT = 2;
    let creator = function () {
        let node = audioContext.createScriptProcessor(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
        return node;
    };
    return creator();
}
function createAnalysisNode(audioContext) {
    const FFT_SIZE = 32;
    let creator = function () {
        let node = audioContext.createAnalyser();
        node.fftSize = FFT_SIZE;
        return node;
    };
    return creator();
}
function onAudioProcess(ev, lChannelList) {
    let inputBuffer = ev.inputBuffer;
    let inputLeftChannelData = inputBuffer.getChannelData(0);
    lChannelList.push(inputLeftChannelData.slice(0));
    // // outputBuffer内容默认全为0，除非类似此处手动将inputBuffer赋值给outputBuffer
    // let outputBuffer = ev.outputBuffer
    // let outputLeftChannelData = outputBuffer.getChannelData(0)
    // // Loop through the 4096 samples
    // for (let sample = 0; sample < inputBuffer.length; sample++) {
    //     // make output equal to the same as the input
    //     outputLeftChannelData[sample] = inputLeftChannelData[sample];
    //     // add noise to each output sample
    //     outputLeftChannelData[sample] += ((Math.random() * 2) - 1) * 0.2;
    // }
}
export default class Recorder {
    leftChannelList = [];
    aCtx = null;
    mediaStream = null;
    // 三个节点
    collectNode = null;
    analysisNode = null;
    mediaStreamNode = null;
    // 节点连线集合
    audioContextPaths = [];
    constructor(mediaStream) {
        this.mediaStream = mediaStream;
        this.aCtx = new AudioContext;
        // 三个节点初始化赋值
        this.mediaStreamNode = this.aCtx.createMediaStreamSource(mediaStream);
        this.collectNode = createCollectNode(this.aCtx);
        this.analysisNode = createAnalysisNode(this.aCtx);
        // 布局节点路径
        this.audioContextPaths.push([
            this.mediaStreamNode,
            this.collectNode,
            this.aCtx.destination
        ]);
        this.audioContextPaths.push([
            this.mediaStreamNode,
            this.analysisNode
        ]);
        // 连接节点
        this.linkNodes();
        // // 音频分析
        // var frequencyBinCount = this.analysisNode.frequencyBinCount;
        // var dataArray = new Uint8Array(frequencyBinCount);
        // setInterval(() => {
        //     this.analysisNode.getByteFrequencyData(dataArray)
        //     console.log(dataArray)
        // }, 500)
    }
    linkNodes() {
        this.audioContextPaths.forEach(path => {
            for (let i = 0; i < path.length; i++) {
                let currentNode = path[i];
                let nextNode = path[i + 1];
                if (nextNode) {
                    currentNode.connect(nextNode);
                }
            }
        });
    }
    beginRecord() {
        this.collectNode.onaudioprocess = (ev) => {
            onAudioProcess(ev, this.leftChannelList);
        };
    }
    pauseRecord() {
        this.collectNode.onaudioprocess = null;
    }
    destory() {
        this.mediaStream.getAudioTracks()[0].stop();
        this.audioContextPaths.forEach(path => {
            path.forEach(node => node.disconnect());
        });
    }
    saveWaveFile() {
        let leftData = mergeArray(this.leftChannelList);
        let allData = leftData;
        let waveBuffer = createWavFile(allData);
        let blob = new Blob([new Uint8Array(waveBuffer)]);
        downloadBlob(blob, new Date().toUTCString() + '.wav');
    }
}
