const childProcess = require("child_process");
const path = require("path");

const process1 = childProcess.spawn(
  `node`, [`${path.join(__dirname, "process1.js")}`],
  {
    stdio: ["inherit", "inherit", "inherit", "pipe"],
  }
);

process1.stdio[3].on('data', (data) => {
  console.log('indexProcess received:', String(data));
});

let i = 0
process1.stdio[3]?.write(`Hi ${--i}`, 'utf-8', (error) => {})
setInterval(
  () => {
    process1.stdio[3]?.write(`Hi ${--i}`, 'utf-8', (error) => {})
  },
  1000
);

setInterval(() => {}, 180000)