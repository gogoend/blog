import vnode from "./vnode.js";

function isVnode(vnode) {
  return vnode.type !== undefined;
}

function emptyNodeAt(elm) {
  const type = elm.tagName.toLocaleLowerCase();
  return vnode(type, {}, [], undefined, elm);
}

function sameVnode(oVnode, nVnode) {
  return oVnode.type === nVnode.type && oVnode.key === nVnode.type;
}

function createElm(vnode) {
  const data = vnode.data;
  const children = vnode.children;
  const type = vnode.type;

  // 如果存在节点标签
  if (type) {
    const elm = vnode.elm = document.createElement(type, data)
    if (Array.isArray(children)) {
      // 如果存在子节点，就递归创建子节点
      for (let i = 0; i < children.length; ++i) {
        const ch = children[i];
        if (ch != null) {
          elm.appendChild(createElm(ch));
        }
      }
    } else if (typeof vnode.text === "string") {
      elm.appendChild(document.createTextNode(vnode.text));
    }
  } else {
    // 如果不存在节点标签名，说明是纯文本节点
    vnode.elm = document.createTextNode(vnode.text);
  }
  return vnode.elm
}

export default function patch(oVnode, nVnode) {
  let elm, parent;

  if (!isVnode(oVnode)) {
    oVnode = emptyNodeAt(oVnode);
  }

  // 相同节点进行patch
  if (sameVnode(oVnode, nVnode)) {
    // patchVnode(oVnode, nVnode, insertedVnodeQueue)
  } else {
    // 不同节点进行则重新创建
    elm = oVnode.elm;
    parent = elm.parentNode;

    createElm(nVnode);

    if (parent !== null) {
      parent.insertBefore(nVnode.elm, elm.nextSibling);
      // removeVnodes(parent, [oldVnode], 0, 0);
    }
  }

  return nVnode;
}
