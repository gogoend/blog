function isObject (object) {
    return object && typeof object === 'object'
}

function defineObserve(object, key) {
    let value = object[key]
    let dep = {
        notify() {
            console.log(`${key}触发了变化，去通知依赖我的Watcher进行更新`)
        }
    }

    Object.defineProperty(object, key, {
        set (val) {
            value = val
            dep.notify()
            observe(val)
        },
        get () {
            return value
        },
        enumerable: true
    })
}

export function observe (object) {
    if (!isObject(object)) return
    for(let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            defineObserve(object, key)
            observe(object[key])
        }
    }
}

