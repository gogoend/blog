import { remove } from "../vue-src-relative-2/utils/index.js"

// 依赖管理器
export default class Dep {
    static dId = 0 // 唯一id计数器

    id
    constructor () {
        this.id = Dep.dId++
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        remove(this.subs, sub)
    }
    notify() {
        // TODO: 遍历subs数组中的watcher，逐个调用回掉
        console.log('值发生变化，通知更新')
        this.subs.forEach(item => void 0)
    }
}