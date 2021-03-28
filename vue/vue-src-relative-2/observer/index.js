import { 
    isObj
} from '../utils/index.js'
import {
    Dep
} from '../observer/dep.js'

export class Observer{
    val;
    dep;
    update(){}
    constructor(val){
        this.val = val
        this.dep = new Dep()
        val.__ob__ = this
        Object.defineProperty(val,'__ob__',{
            value: this,
            enumerable: false
        })
        this.walk(val)
    }
    walk(obj){
        Object.keys(obj).forEach(key => {
            defineObserve(obj, key)
        })
    }
}
// 为引用类型对象添加__ob__，值为Observer实例
export function observe(val) {
    if(!isObj(val)){
        return
    }
    let ob
    if(val.__ob__ && val.__ob__ instanceof Observer){
        ob = val.__ob__
    } else if (Object.isExtensible(val)){
        ob = new Observer(val)
    }
    return ob
}
function defineObserve(obj, key) {
    let val = obj[key]
    let dep = new Dep()
    const childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(nVal) {
            val = nVal
            dep.notify()
            observe(nVal)
        }
    })
    observe(val)
}
