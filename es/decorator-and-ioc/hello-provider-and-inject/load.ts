import * as fs from 'fs'
import { CLASS_KEY } from './provider'

/**
 * 加载
 * @param container 全局container容器
 */
export function load(container) {
  const list = fs.readdirSync('./')

  // 扫描目录下的ts文件
  for(const file of list) {
    if (/\.ts$/.test(file)) {
      const exports = require(`./${file}`)
      for(const m in exports) {
        const module = exports[m]

        if (typeof module === 'function') {
          const metadata = Reflect.getMetadata(CLASS_KEY, module)
          // 注册实例
          if (metadata) {
            container.bind(metadata.id, module, metadata.args)
          }
        }
      }
    }
  }
}