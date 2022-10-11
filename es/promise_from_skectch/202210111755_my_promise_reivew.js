class MyPromise {
    result;
    reason;
    status = 'PENDING';
    constructor(fn) {
        const resolve = (result)=>{
            setTimeout(()=>{
                if (this.status === 'PENDING') {
                    this.status = 'FULFILLED'
                    this.result = result // resolveResult(result)
                    this.fulfillCbs.forEach(cb=>{
                        cb(result)
                    }
                    )
                }
            }
            )
        }
        const reject = (reason)=>{
            setTimeout(()=>{
                if (this.status === 'PENDING') {
                    this.status = 'REJECTED'
                    this.reason = reason
                    this.rejectCbs.forEach(cb=>{
                        cb(reason)
                    }
                    )
                }
            }
            )
        }
        fn(resolve, reject)
    }

    fulfillCbs = [];
    rejectCbs = [];
    then(fn) {
        if (this.status === 'FULFILLED') {
            fn(this.result)
        } else {
            this.fulfillCbs.push(fn)
        }

    }
    ;catch(fn) {
        if (this.status === 'REJECTED') {
            fn(this.reason)
        } else {
            this.rejectCbs.push(fn)
        }
    }
}

z = new MyPromise((resolve,reject)=>{
    resolve(1)
}
).then(res=>{
    console.log(res)
}
)
