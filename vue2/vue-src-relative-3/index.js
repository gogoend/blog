import Dep from "./dep.js"

function isObject (object) {
    return object && typeof object === 'object'
}

function defineObserve(object, key) {
    // 当前的属性值为
    let value = object[key]
    // 当前的属性值对应的依赖管理器 - 依赖管理器包含有一些依赖该值的watcher
    let dep = new Dep()
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

// 响应式入口，html业务代码中直接调用了这个函数
// 遍历对象中的键添加响应式的逻辑将移动到Observer类中完成
export function observe (object) {
    if (!isObject(object)) return
    let ob
    if(object.__ob__ && object.__ob__ instanceof Observer){
        ob = val.__ob__
    } else if (Object.isExtensible(object)){
        ob = new Observer(object)
    }
    return ob
}

// 为传入的对象对象添加__ob__，值为Observer实例
// 同时通过遍历对象中的键，来为子对象递归添加响应式
class Observer {
    val
    dep;
    update(){}
    constructor(val){
        this.val = val
        this.dep = new Dep()
        Object.defineProperty(val,'__ob__',{
            value: this,
            enumerable: false
        })
        this.walk(val)
    }
    walk(object){
        for(let key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                defineObserve(object, key)
            }
        }
    }
}

