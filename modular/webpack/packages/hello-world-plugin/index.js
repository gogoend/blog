const pluginName = 'HelloWorldPlugin'

class HelloWorldPlugin {
  constructor() {
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
        console.log('这里报错就对了！')
        callback(new Error)
      }
    )
  }
}

module.exports = HelloWorldPlugin