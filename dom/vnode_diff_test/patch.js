import vnode from "./vnode.js";

function isVnode(vnode) {
  return vnode.type !== undefined;
}
function isDef(s) {
  return s !== undefined;
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

function removeVnodes(
  parentElm,
  vnodes,
  startIdx,
  endIdx
) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    if (ch != null) {
      if (isDef(ch.type)) {
        // 我猜这里不使用parentElm来做parent，而要重新取值
        // 可能有类似对话框类的组件会把DOM给放到文档中的其他地方
        // 此处可能会出现removeChild方法被重复调用的情况，需留意
        // https://www.bilibili.com/video/BV1rA411F78U?note=open&p=17&t=219
        const parent = ch.elm.parentNode;
        parent.removeChild(ch.elm)
      } else {
        // 文本节点
        parentElm.removeChild(ch.elm)
      }
    }
  }
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
      removeVnodes(parent, [oVnode], 0, 0);
    }
  }

  return nVnode;
}
