import {
    pushTarget,
    popTarget
} from './dep.js'

let wId = 0

export default class Watcher {
    id
    deps
    depIds
    getter
    value
    constructor(expOrFn) {
        this.id = wId++
        this.deps = []
        this.depIds = new Set()
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        }
        this.get()
    }
    get() {
        pushTarget(this)
        this.value = this.getter()
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