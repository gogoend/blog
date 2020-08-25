// @杰杰大帅帅 @gogoend
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(func) {
    this.status = PENDING
    this.val = undefined

    // 据了解，Promise中可以有多个then和catch，所以此处使用数组来保存函数
    this.fulfilledCbs = []
    this.rejectedCbs = []

    let _this = this
    let resolve, _resolve = function (val) {
        if(val instanceof MyPromise){
            return value.then(resolve,reject)
        }
        setTimeout(()=>{
            let { status, fulfilledCbs } = _this
            if (status === PENDING) {
                _this.val = val
                _this.status = FULFILLED
                for (let i = 0; i < fulfilledCbs.length; i++) {
                    // 将val作为回调函数的参数返回去
                    fulfilledCbs[i].call(_this,val)
                }
            }
        },0)
    }
    let reject, _reject = function (val) {
        setTimeout(()=>{
            let { status,rejectedCbs } = _this
            if (status === PENDING) {
                _this.val = val
                _this.status = REJECTED
                for (let i = 0; i < rejectedCbs.length; i++) {
                    // 将val作为回调函数的参数返回去
                    rejectedCbs[i].call(_this,val)
                }
            }
        },0)

    }

    resolve = _resolve.bind(this)
    reject = _reject.bind(this)

    try{
        func(resolve,reject)
    } catch(err) {
        reject(err)
    }

}

Object.assign(MyPromise.prototype,{
    then:function(onFulfilled,onRejected){
        let _this = this
        let { status,fulfilledCbs,rejectedCbs,val}=this
        if(status===PENDING){
            fulfilledCbs.push(()=>{
                onFulfilled(this.val)
            })
            rejectedCbs.push(()=>{
                onRejected(this.val)
            })
        }

        if(status===FULFILLED){
            onFulfilled(val)
        }

        if(status===REJECTED){
            onRejected(val)
        }

    }
})

export default MyPromise