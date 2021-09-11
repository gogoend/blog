function isObject (object) {
    return object && typeof object === 'object'
}

function defineObserve(object, key) {
    let value = object[key]
    Object.defineProperty(object, key, {
        set (val) {
            value = val
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
