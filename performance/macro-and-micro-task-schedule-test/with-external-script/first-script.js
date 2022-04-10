(function script1() {
  makeStuck(6);
  // 同步
  console.log("start1");
  // 异步宏
  // setTimeout(() => console.log("timer1"), 0);
  new Promise((resolve, reject) => {
    // 同步
    console.log("p1");
    resolve();
  }).then(() => {
    // 异步微
    console.log("then1");
  });
  // // 同步
  // console.log("end1");
})();
