import {
    Dep,
    pushTarget,
    popTarget
} from './dep'

export default class Watcher {
    constructor(getter) {
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
}