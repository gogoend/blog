import {
    pushTarget,
    popTarget
} from './dep.js'

let wId = 0

export default class Watcher {
    constructor(getter) {
        this.id = wId++
        this.deps = []
        this.depIds = new Set()
        this.getter = getter
        this.get()
    }
    get() {
        pushTarget(this)
        this.getter()
        popTarget()
        return this.value
    }
    update() {
        this.get()
    }
    addDep(dep) {
        const id = dep.id
        // 防止重复收集依赖
        if(!this.depIds.has(id)){
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
}