class Dep {
  subs = new Array()
  subSet = new Set()
  addSub (watcher) {
    if (!this.subSet.has(watcher)) {
      this.subs.push(watcher)
      this.subSet.add(watcher)
    }
  }
  removeSub (watcher) {
    const indexOfFn = this.subs.indexOf(watcher)
    if (indexOfFn >= 0) {
      this.subs.splice(
        indexOfFn, 1
      )
    }
    this.subSet.remove(watcher)
  }
  notify () {
    this.subs.forEach(watcher => watcher.run())
  }

  static depTarget = null
}

export class Watcher {
  value
  constructor (expressionToExecute, cb) {
    this.expressionToExecute = expressionToExecute
    this.cb = cb
  }
  run () {
    debugger
    Dep.depTarget = this

    try {
      const value = this.expressionToExecute()
      if (value !== this.value) {
        this.cb(
          value,
          this.value
        )
        this.value = value
      }
    } finally {
      Dep.depTarget = null
    }
  }
}

function defineReactive (o, key) {
  let val = o[key]
  if (o[key] && typeof o[key] === 'object') {
    observe(o[key])
  }
  const dep = new Dep()

  Object.defineProperty(o, key, {
    get () {
      if (Dep.depTarget) {
        dep.addSub(Dep.depTarget)
      }
      return val
    },
    set (v) {
      val = v
      observe(v)
      dep.notify()
    }
  })
}

export const observe = (o) => {
  if (!o || typeof o !== 'object') {
    return
  }
  Object.keys(o).forEach(key => {
    defineReactive(o, key)
  })
}