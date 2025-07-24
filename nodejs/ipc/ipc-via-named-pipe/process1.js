const fs = require("fs");
const net = require('net');

const pipeName = 'gogoend_ipc_pipe';
const pipePath = process.platform === 'win32' ? path.join('\\\\?\\pipe', pipeName) : `/tmp/${pipeName}`;
const client = net.connect(pipePath);

client.on('connect', () => {
  let i = 0
  client?.write(`Hello ${++i}`, 'utf-8', (error) => {})
  setInterval(
    () => {
      client?.write(`Hello ${++i}`, 'utf-8', (error) => {})
    },
    1000
  );
});

client.on('data', data => {
  console.log('process1 received:', String(data));
});