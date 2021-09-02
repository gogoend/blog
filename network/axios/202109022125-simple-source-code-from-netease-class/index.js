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
    this.interceptor.request.handler.forEach((interceptor) => {
        // 成对插入
        chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    this.interceptor.response.handler.push((interceptor) => {
        // 成对插入
        chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    // 2. 执行数组里的，每一个方法
    // !!! 注意不是这样的 
    // 首先这样做会导致无论是同步函数还是异步函数都会被立即执行 - 特别是夹在中间的请求函数，请求未执行完成就就将直接执行后方的响应拦截器
    // 另外这里成功/失败回调是相间执行的，因此所有情况下的回调都会被执行 - 显然不太好
    // chain.forEach(fn => { fn && fn() })
    
}
