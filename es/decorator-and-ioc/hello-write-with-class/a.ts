import B from "./b";
import { container } from './index'

// a.ts
export default class A {
  b: B;
  constructor() {
      this.b = container.get('b');
  }
}
