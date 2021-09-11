function isObject (object) {
    return object && typeof object === 'object'
}

function defineObserve(object, key) {
    // 当前的属性值为
    let value = object[key]
    // 当前的属性值对应的依赖管理器 - 依赖管理器包含有一些依赖该值的watcher
    let dep = {
        notify() {
            console.log(`${key}触发了变化，去通知依赖我的Watcher进行更新`)
        }
    }
    // 为当前属性值添加响应式
    observe(value)
    Object.defineProperty(object, key, {
        set (val) {
            value = val
            dep.notify()
            // 为新的属性值添加响应式
            observe(value)
        },
        get () {
            return value
        },
        enumerable: true,
        configurable: true
    })
}

// 响应式入口
export function observe (object) {
    if (!isObject(object)) return
    for(let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            defineObserve(object, key)
        }
    }
}

