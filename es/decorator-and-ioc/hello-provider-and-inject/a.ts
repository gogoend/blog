import { B } from './b';
import { Provider } from './provider'
import { Inject } from './inject'

// a.ts
@Provider('a')
export default class A {

  @Inject()
  b: B;
}
