// 链接：https://juejin.cn/post/7095629157194792997

const childProcess = require("child_process");
const path = require("path");
const net = require('net');

const fs = require('fs');

const pipeName = 'gogoend_ipc_pipe';
const pipePath = process.platform === 'win32' ? path.join('\\\\?\\pipe', pipeName) : `/tmp/${pipeName}`;

const removeServerPipePath = serverPath => {
  try {
    process.platform !== 'win32' && fs.unlinkSync(serverPath);
  } catch (e) {}
};

const server = net.createServer(connection => {
  connection.on('data', data => {
    console.log('indexProcess received:', String(data));
  });

  let i = 0
  connection?.write(`Hi ${--i}`, 'utf-8', (error) => {})
  setInterval(
    () => {
      connection?.write(`Hi ${--i}`, 'utf-8', (error) => {})
    },
    1000
  );

  connection.on('end', d => {
    debugger
    console.log(Date.now(), '客户端已关闭连接')
  })
});

server.on('close', () => {
  removeServerPipePath(pipePath);
  console.log('服务关闭');
});

// 注意：在非 Windows 的操作系统中，需要主动删除套接字文件，具体原因在下文有详细说明
removeServerPipePath(pipePath);
server.listen(pipePath, () => console.log('服务已经启动，正在监听客户端连接'));

const process1 = childProcess.spawn(
  `node`,
  [`${path.join(__dirname, "process1.js")}`],
  {
    stdio: ['inherit', 'inherit', 'inherit']
  }
);

setInterval(() => {}, 180000)