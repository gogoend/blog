// @杰杰大帅帅 @gogoend
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(func) {
    this.status = PENDING
    this.val = undefined

    let _this = this
    let _resolve = function (val) {
        let { status } = _this
        if (status === PENDING) {
            _this.val = val
            _this.status = FULFILLED
        }
    }
    let _reject = function (val) {
        let { status } = _this
        if (status === PENDING) {
            _this.val = val
            _this.status = REJECTED
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


window.MyPromise = MyPromise
let thePromise = new MyPromise()