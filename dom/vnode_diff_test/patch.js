import vnode from "./vnode.js";

function isVnode(vnode) {
  return vnode.type !== undefined;
}
function isDef(s) {
  return s !== undefined;
}
function isUndef(s) {
  return s === undefined;
}

function emptyNodeAt(elm) {
  const type = elm.tagName.toLocaleLowerCase();
  return vnode(type, {}, [], undefined, elm); // 返回一个空的vnode节点
}

function sameVnode(oVnode, nVnode) {
  return oVnode.type === nVnode.type && oVnode.key === nVnode.key;
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

function addVnodes (
  parentElm,
  before,
  vnodes,
  startIdx,
  endIdx
) {
  for(; startIdx<=endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch !== null) {
      parentElm.insertBefore(createElm(ch), before)
    }
  }
}

function patchVnode (
  oVnode,
  nVnode
) {
  const elm = nVnode.elm = oVnode.elm

  const oChildren = oVnode.children
  const nChildren = nVnode.children

  // 新旧vnode相等，就不用比了
  if (oVnode === nVnode) {
    return
  }
  // 如果新节点中text属性未定义 - 可能是元素节点（元素节点text为空值）
  else if (isUndef(nVnode.text)) {
    // 要比较的新旧节点中都具有children
    if (isDef(oChildren) && isDef(nChildren)) {
      // 新/旧节点的children变量不相等（不是同一个值？），更新children
      if (oChildren !== nChildren) {
        // updateChildren(elm, oChildren, nChildren)
      }
    }
    // 如果不是上面这种情况，那就是说新节点或旧节点之一缺少children属性
    // 如果新节点中具有children
    else if (isDef(nChildren)) {
      // 如果旧节点具有text，则置为空串
      // 也就是说旧节点之前是文本节点
      if (isDef(oVnode.text)) {
        elm.textContent = ''
      }
      // 然后添加children
      addVnodes(elm, null, nChildren, 0, nChildren.length - 1)
    }
    // 如果旧节点中具有children
    else if (isDef(oChildren)) {
      // 就直接删掉节点中的所有children
      // 也就是说新节点应该是不存在了
      removeVnodes(elm, oChildren, 0, oChildren.length - 1)
    }
    // 如果新/旧节点中都没有children，那应该就是要比较text了
    // 如果旧节点具有text，那就直接清空
    // 因为根据上方判断，这里已经确认了新节点中不含text
    else if (isDef(oVnode.text)) {
      elm.textContent = ''
    }
  }
  // 如果新节点中包含text，就进入此流程
  else if (nVnode.text !== oVnode.text){
    // 这里是判断旧vnode是否包含children
    // 如果包含的话，就把所有children给删了
    if (isDef(oChildren)) {
      removeVnodes(elm, oChildren, 0, oChildren.length - 1)
    }
    // 这里将只留文本节点，同时文本节点内容使用新的vnode的内容来覆盖
    elm.textContent = nVnode.text
  }
}

export default function patch(oVnode, nVnode) {
  let elm, parent;

  if (!isVnode(oVnode)) {
    oVnode = emptyNodeAt(oVnode);
  }

  // 相同节点进行patch
  if (sameVnode(oVnode, nVnode)) {
    patchVnode(oVnode, nVnode)
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
