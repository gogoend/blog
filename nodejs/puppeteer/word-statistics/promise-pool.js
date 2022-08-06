class PromisePool {
  constructor (
    originPromiseFactories = [],
    poolSize = 5
  ) {
    this.originPromiseFactories = originPromiseFactories
    this.poolSize = poolSize

    this.promiseFactories = originPromiseFactories.concat()
    this.results = Array.from(this.promiseFactories, () => null)

    this.waitee = new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject})
    this.then = this.waitee.then.bind(this.waitee)
    this.catch = this.waitee.catch.bind(this.waitee)
    this.finally = this.waitee.finally.bind(this.waitee)

    this.enPool()
  }

  waitee

  resolve = (value) => void 0
  reject = (value) => void 0

  then
  catch
  finally

  pool = []

  promiseFactories = []
  results = []
  
  enPool () {
    if (!this.promiseFactories.length && !this.pool.length) {
      console.log('promise队列已处理完成')
      this.resolve(this.results)
      return
    }

    while(
      this.pool.length < this.poolSize
      &&
      this.promiseFactories.length
    ) {

      let promiseFactory = this.promiseFactories.shift()
      const promiseFactoryIndex = this.originPromiseFactories.indexOf(promiseFactory)

      let promise = promiseFactory()
      this.attachThenCb(promise, promiseFactoryIndex)
      this.attachFinallyCb(promise)
      this.pool.push(
        promise
      )
    }
  }

  attachThenCb (promise, index) {
    promise.then((res) => {
      this.results[index] = res
      return res
    })
  }

  attachFinallyCb (promise) {
    promise.finally(() => {
      const index = this.pool.indexOf(promise)
      this.pool.splice(index, 1)

      this.enPool()
    })
  }
}

module.exports = PromisePool