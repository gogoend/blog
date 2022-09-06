import { Provider } from './provider'

@Provider('b', [20])
export class B {
  constructor(private p: number){
  }
}
