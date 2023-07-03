function getChain(chainType='immediate', delayForSetTimeout=undefined) {
  if (chainType === 'immediate') {
      return fn=>fn()
  }
  let promiseSingleton = Promise.resolve()

  return (fn)=>{
      promiseSingleton = promiseSingleton.then(()=>{
          return new Promise(resolve=>{
              if (chainType === 'setTimeout') {
                  setTimeout(()=>{
                      fn()
                      resolve()
                  }
                  , delayForSetTimeout)
              } else if (chainType === 'requestAnimationFrame') {
                  requestAnimationFrame(()=>{
                      fn()
                      resolve()
                  }
                  )
              }
          }
          )
      }
      )
  }
}

function reverseChildrenOfDOM(containerEl) {
  let queue = [...containerEl.childNodes].map(el=>()=>{
      containerEl.prepend(el)
  }
  )
  const chain = getChain('requestAnimationFrame')
  for (let f of queue) {
      chain(f)
  }
}
