const fs = require("fs");

const writePipe = fs.createWriteStream(null, { fd: 3 });

let i = 0
writePipe?.write(`Hello ${++i}`, 'utf-8', (error) => {})
setInterval(
  () => {
    writePipe?.write(`Hello ${++i}`, 'utf-8', (error) => {})
  },
  1000
);

const readPipe = fs.createReadStream(null, { fd: 3 });
readPipe.on('data', (data) => {
  console.log('process1 received:', String(data));
});