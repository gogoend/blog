import { Container } from './container'
import { load } from './load'

// 初始化 IOC 容器，扫描文件
const container = new Container()
load(container)

console.log(
  container.get('a')
)