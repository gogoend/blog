const resolvePromiseChain = (
    currentPromise,
    currentResult,
    resolve,
    reject
) => {
    if (currentPromise === currentResult) {
        reject(new Error());
    }
    if (
        (currentResult !== null && typeof currentResult === "object") ||
        typeof currentResult === "function"
    ) {
        let called = false;
        try {
            let then = currentResult.then;
            if (typeof then === "function") {
                try {
                    then.call(
                        currentResult,
                        (nextResult) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            resolvePromiseChain(currentPromise, nextResult, resolve, reject);
                        },
                        (error) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            reject(error);
                        }
                    );
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(currentResult);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(currentResult);
    }
};

class MyPromise {
    result;
    reason;
    status = "PENDING";
    constructor(fn) {
        const resolve = (result) => {
            if (this.status === "PENDING") {
                this.status = "FULFILLED";
                this.result = result;
                // resolveResult(result)
                this.fulfillCbs.forEach((cb) => {
                    cb(result);
                });
            }
        };
        const reject = (reason) => {
            if (this.status === "PENDING") {
                this.status = "REJECTED";
                this.reason = reason;
                this.rejectCbs.forEach((cb) => {
                    cb(reason);
                });
            }
        };
        try {
            fn(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    }

    fulfillCbs = [];
    rejectCbs = [];
    then(onFulfilled, onRejected) {
        onFulfilled =
          typeof onFulFilled === "function"
            ? onFulfilled
            : function (v) {
                return v;
              };
        onRejected =
          typeof onRejected === "function"
            ? onRejected
            : function (err) {
                throw err;
              };
        const innerPromise = new MyPromise((resolve, reject) => {
            if (this.status === "PENDING") {
                this.fulfillCbs.push(() =>
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.result);
                            resolvePromiseChain(innerPromise, x, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0)
                );
                this.rejectCbs.push(() =>
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromiseChain(innerPromise, x, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0)
                );
            }
            if (this.status === "FULFILLED") {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.result);
                        resolvePromiseChain(innerPromise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0);
            }

            if (this.status === "REJECTED") {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromiseChain(innerPromise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0);
            }
        });
        return innerPromise;
    }
}

// const z = new MyPromise((resolve, reject) => {
//   resolve(1);
// })
//   .then(
//     (res) => {
//       console.log(res);
//       throw res;
//     },
//     (reason) => {
//       console.error(reason);
//     }
//   )
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (reason) => {
//       console.error(reason);
//     }
//   )
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (reason) => {
//       console.error(reason);
//     }
//   );

// 根据官方文档暴露一个 deferred 方法，返回一个包含 promise、resolve、reject 的对象
MyPromise.deferred = function () {
    const obj = {};

    obj.promise = new MyPromise(function (resolve, reject) {
        obj.resolve = resolve;
        obj.reject = reject;
    });

    return obj;
};

module.exports = MyPromise;
