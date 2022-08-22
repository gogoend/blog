importScripts('./hash-wasm-md5.umd.min.js');

async function normalizeInput (input) {
  if (input instanceof Blob) {
    return new Uint8Array(await input.arrayBuffer())
  }
}

const commandMap = {
  async computeMd5SumOfFile (input) {
    const { md5 } = hashwasm
    // console.log(
    //   new Uint8Array(await file.arrayBuffer())
    // )

    return await md5(
      await normalizeInput(
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
      self.postMessage(result)
    }
  }
)