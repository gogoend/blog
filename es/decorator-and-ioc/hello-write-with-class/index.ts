// https://juejin.cn/post/6898882861277904910

import { Container } from "./container";
import A from "./a";
import B from "./b";

// main.ts
export const container = new Container();
container.bind('a', A, []);
container.bind('b', B, [10]);

// 从容器中取出a
const a = container.get('a');
console.log(a); // A => { b: B { p: 10 } }