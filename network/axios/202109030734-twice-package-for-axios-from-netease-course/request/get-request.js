import server from './server.js'

function myServer () {
    this.server = server
}

myServer.prototype.parseRouter = function (name, urlOb) {
    this[name] = {}
    Object.keys(urlOb).forEach(apiName => {
        this[name][apiName] = this.sendMes.bind(this, name, apiName, urlOb[apiName])
    })
}

// 轮子要留出扩展接口
myServer.prototype.send = function (moduleName,name, url, config) {
    const _this = this
    let config = config || {}
    let type = config.type || 'get' // 应该写在具体业务中
    let data = config.data || {}
    // 对于请求响应的处理分为两个模块
    // 效果处理模块，例如加loading
    let before = function (res) {
        return res
    }
    let defaultFn = function (res) {
        return res
    }
    let success = config.success || defaultFn
    this.server[type](url, data).then(before).then(success)
}
export default new myServer()