class Dep {
  subs = new Array()
  subSet = new Set()
  addSub (fn) {
    if (!this.subSet.has(fn)) {
      this.subs.push(fn)
      this.subSet.add(fn)
    }
  }
  removeSub (fn) {
    const indexOfFn = this.subs.indexOf(fn)
    if (indexOfFn >= 0) {
      this.subs.splice(
        indexOfFn, 1
      )
    }
    this.subSet.remove(fn)
  }
  notify () {
    this.subs.forEach(fn => fn())
  }

  /**
   * @type {Function | null}
   */
  static depTarget = null
}

export function watch(expressionToExecute, cb) {
  Dep.depTarget = cb
  expressionToExecute()
  Dep.depTarget = null
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