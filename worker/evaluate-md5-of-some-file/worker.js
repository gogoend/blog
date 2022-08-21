importScripts('./hash-wasm-md5.umd.min.js');

async function run() {
  const { md5 } = hashwasm

  console.log('MD5:', await md5('demo'));
}

self.addEventListener(
  'message',
  (ev) => {
    const { data, command } = ev.data ?? {}
    if (command === 'file') {
      if (data) {
        self.postMessage('777')
      }
    }
  }
)