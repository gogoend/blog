export const observe = (o) => {
  Object.keys(o).forEach(key => {
    let val = o[key]
    if (o[key] && typeof o[key] === 'object') {
      observe(o[key])
    }

    Object.defineProperty(o, key, {
      get () {
        return val
      },
      set (v) {
        val = v
        if (v && typeof v === 'object') {
          observe(v)
        }
      }
    })
  })
}