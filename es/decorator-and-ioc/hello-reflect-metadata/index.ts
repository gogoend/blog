import 'reflect-metadata'

const CLASS_KEY = 'ioc:key'

function ClassDecorator () {
  return function (target: any) {
    Reflect.defineMetadata(CLASS_KEY, {
      metaData: 'metaData',
    }, target)

    return target
  }
}

// 看起来这个类被装饰了一下？
@ClassDecorator()
class D {
  constructor(){}
}

// 后续会尝试读取这个类的metadata
console.log(Reflect.getMetadata(CLASS_KEY, D)); // => { metaData: 'metaData' }