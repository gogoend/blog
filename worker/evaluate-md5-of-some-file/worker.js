import { normalizeMd5SumInput, normalizeOKResult } from './utils.js'
await import('./hash-wasm-md5.umd.min.js')

const commandMap = {
  async computeMd5SumOfFile (input) {
    const { md5 } = hashwasm
    // console.log(
    //   new Uint8Array(await file.arrayBuffer())
    // )

    return await md5(
      await normalizeMd5SumInput(
        input
      )
    )
  }
}

self.addEventListener(
  'message',
  async (ev) => {
    const { data, command } = ev.data ?? {}

    if (typeof commandMap[command] === 'function') {
      const result = await commandMap[command](data)
      self.postMessage(
        normalizeOKResult(
          result
        )
      )
    }
  }
)