import { 
    remove
} from '../utils/index.js'

export default class Dep{
    static target
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    removeSub(sub){
        remove(this.subs, sub)
    }
    notify(){
        this.subs.forEach(watcher => watcher.update())
    }
    depend(){
        if(Dep.target){
            Dep.target.addDep(this)
        }
    }
}

Dep.target = null

const targetStack = []
export function pushTarget(_target){
    if(Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}
export function popTarget(){
    Dep.target = targetStack.pop()
}
