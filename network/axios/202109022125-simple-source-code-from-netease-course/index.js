/*
axios.interceptor.request.use(() => {})

axios.interceptor.response.use(() => {})
*/

// 拦截器管理
function InterceptorManager () {
    this.handler = []
}

// 每次插入一对函数（成功/失败）
InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handler.push({
        fulfilled,
        rejected
    })
}

export function Axios () {
    this.interceptor = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    }
}
Axios.prototype.request = function () {
    // 1. 组成数组 - 初始数组第一个元素为真正的发请求的
    let chain = [dispatchRequest, undefined]
    let promise = Promise.resolve()
    this.interceptor.request.handler.forEach((interceptor) => {
        // 成对插入
        chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    this.interceptor.response.handler.push((interceptor) => {
        // 成对插入
        chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    // 2. 执行数组里的，每一个方法
    while(chain.length){
        promise = promise.then(chain.shift(), chain.shift())
    }
    return promise
}

// 桥接模式 - 注册大量相似的方法,核心相同，细节不同
const arr = ['get', 'post', 'put']
arr.forEach(name => {
    Axios.prototype[name] = function () {
        this.request.call(this, name)
    }
})