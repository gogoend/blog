import { PROPS_KEY } from "./inject";

interface ClassConstructOption {
  clazz: any,
  constructorArgs?: any[]
}

export class Container {
  bindMap = new Map<string | symbol, ClassConstructOption>();

  // 实例的注册
  bind(identifier: string, clazz: any, constructorArgs: Array<any>) {
      this.bindMap.set(identifier, {
          clazz,
          constructorArgs
      });
  }

  // 实例的获取
  get<T>(identifier: string): T {
      const target = this.bindMap.get(identifier)!;
      const { clazz, constructorArgs } = target;

      const inst = Reflect.construct(clazz, constructorArgs);
      
      // TODO:
      const props = Reflect.getMetadata(PROPS_KEY, clazz);
      for(let prop in props) {
        const identifier = props[prop].value
        // 递归获取注入的对象
        inst[prop] = this.get(identifier)
      }

      return inst
  }
}