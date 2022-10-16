class MyPromise {
    result;
    reason;
    status = "PENDING";
    constructor(fn) {
        const resolve = (result)=>{
            if (this.status === "PENDING") {
                this.status = "FULFILLED";
                this.result = result;
                // resolveResult(result)
                this.fulfillCbs.forEach((cb)=>{
                    cb(result);
                }
                );
            }
        }
        ;
        const reject = (reason)=>{
            if (this.status === "PENDING") {
                this.status = "REJECTED";
                this.reason = reason;
                this.rejectCbs.forEach((cb)=>{
                    cb(reason);
                }
                );
            }
        }
        ;
        try {
            fn(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    }

    fulfillCbs = [];
    rejectCbs = [];
    then(successFn, failFn) {
        if (this.status === "FULFILLED") {
            setTimeout(successFn, 0, this.result);
        } else {
            this.fulfillCbs.push(()=>setTimeout(successFn, 0, this.result));
        }

        if (failFn) {
            this.catch(failFn);
        }
    }
    catch(fn) {
        if (this.status === "REJECTED") {
            setTimeout(fn, 0, this.reason);
        } else {
            this.rejectCbs.push(()=>setTimeout(fn, 0, this.reason));
        }
    }
}

z = new MyPromise((resolve,reject)=>{
    reject(1);
}
).then((res)=>{
    console.log(res);
}
, (reason)=>{
    console.error(reason);
}
);
