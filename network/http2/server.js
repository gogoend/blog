const http2 = require("http2");
const fs = require("fs");

const options = {
  key: fs.readFileSync('server.key'), // Your server's private key
  cert: fs.readFileSync('server.crt'), // Your server's certificate
};

const server = http2.createSecureServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP/2!');
});

server.listen(3001, () => {
  console.log('Server running at https://localhost:3001/');
});

// server.on("stream", (stream, headers) => {
  // debugger
  // stream.respond({
  //   'content-type': 'text/html; charset=utf-8',
  //   ':status': 200,
  // });
  // stream.end('<h1>Hello World</h1>');

  // if (headers[":path"] === "/") {
  //   stream.respondWithFile("./client/index.html");
  // }
  // else if (headers[":path"] === "/style.css") {
  //   stream.respondWithFile("./files/style.css");
  // } else if (headers[":path"] === "/script.js") {
  //   stream.respondWithFile("./files/script.js");
  // } else if (headers[":path"] === "/globe.png") {
  //   stream.respondWithFile("./files/globe.png");
  // }
// });
