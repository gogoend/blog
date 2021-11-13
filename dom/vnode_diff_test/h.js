import vnode from './vnode.js'

export default function h(type, data, children) {
  if (typeof children === "string") {
    children = [children];
  }
  // 判断子节点是否为字符串；如果是也把它转成vnode
  children = children.map((child) => {
    if (typeof child === "string") {
      return vnode(undefined, undefined, undefined, child, undefined);
    } else {
      return child;
    }
  });
  return vnode(type, data, children, undefined, undefined);
}
