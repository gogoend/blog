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
    let _resolve = function (val) {
        let { status, fulfilledCbs } = _this
        if (status === PENDING) {
            _this.val = val
            _this.status = FULFILLED
            for (let i = 0; i < fulfilledCbs.length; i++) {
                // 将val作为回调函数的参数返回去
                fulfilledCbs[i].call(_this,val)
            }
        }
    }
    let _reject = function (val) {
        let { status,rejectedCbs } = _this
        if (status === PENDING) {
            _this.val = val
            _this.status = REJECTED
            for (let i = 0; i < rejectedCbs.length; i++) {
                // 将val作为回调函数的参数返回去
                rejectedCbs[i].call(_this,val)
            }
        }
    }

    let resolve = _resolve.bind(this)
    let reject = _reject.bind(this)

    try{
        func(resolve,reject)
    } catch(err) {
        reject(err)
    }

}

Object.assign(MyPromise.prototype,{
    then:function(onFulfilled,onRejected){
        let { status,fulfilledCbs,rejectedCbs,val}=this
        if(status===PENDING){
            // Promise还在pending的时候，若直接使用：
            /*
            fulfilledCbs.push(()=>{
                onFulfilled(val)
            })
            rejectedCbs.push(()=>{
                onRejected(val)
            })
            此时val是从this结构得到的，值为undefined；这样写会导致最后无论如何都会输出undefined。
            因此，最终调用输出函数时，要重新从this取值，不能使用之前解构的值。
            */
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