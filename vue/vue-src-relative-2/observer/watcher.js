import {
    pushTarget,
    popTarget
} from './dep.js'

export default class Watcher {
    constructor(getter) {
        this.deps = []
        this.getter = getter
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
        this.deps.push(dep)
        dep.addSub(this)
    }
}