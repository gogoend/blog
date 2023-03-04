import vnode from "../vnode_diff_test_with_snabbdom_implement/vnode.js";
import {
  getSequence
} from './utils.js'

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

function createKeyIdxMap (children) {
  const map = {}
  children.forEach((child, idx) => {
    let key = child.data?.key
    if (key != undefined) {
      map[key] = idx
    }
  })
  return map
}

function unmount () {
  // TODO:
}
function move () {
  // TODO:
}

function updateChildren(
  parentElm,
  oChildren,
  nChildren
) {
  const c1 = oChildren
  const c2 = nChildren
  const l1 = c1.length
  const l2 = c2.length

  let i = 0 
  let e1 = c1.length - 1 // prev ending index
  let e2 = l2 - 1 // next ending index

  // 1. sync from start
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i]
    const n2 = c2[i]
    // const n2 = (c2[i] = optimized
    //   ? cloneIfMounted(c2[i] as VNode)
    //   : normalizeVNode(c2[i]))
    if (sameVnode(n1, n2)) {
      patchVnode(
        n1,
        n2
      )
    } else {
      break
    }
    i++
  }

  // 2. sync from end
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1]
    const n2 = c2[e2]
    // const n2 = (c2[e2] = optimized
    //   ? cloneIfMounted(c2[e2] as VNode)
    //   : normalizeVNode(c2[e2]))
    if (sameVnode(n1, n2)) {
      patchVnode(
        n1,
        n2
      )
    } else {
      break
    }
    e1--
    e2--
  }

  // 3. common sequence + mount
  // (a b)
  // (a b) c
  // i = 2, e1 = 1, e2 = 2
  // (a b)
  // c (a b)
  // i = 0, e1 = -1, e2 = 0
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1
      while (i <= e2) {
        patchVnode(
          null,
          c2[i],
          // (c2[i] = optimized
          //   ? cloneIfMounted(c2[i] as VNode)
          //   : normalizeVNode(c2[i])),
        )
        i++
      }
    }
  }

  // 4. common sequence + unmount
  // (a b) c
  // (a b)
  // i = 2, e1 = 2, e2 = 1
  // a (b c)
  // (b c)
  // i = 0, e1 = 0, e2 = -1
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentElm)
      i++
    }
  }

  // 5. unknown sequence
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    const s1 = i // prev starting index
    const s2 = i // next starting index

    // 5.1 build key:index map for newChildren
    const keyToNewIndexMap = new Map()
    for (i = s2; i <= e2; i++) {
      // const nextChild = (c2[i] = optimized
      //   ? cloneIfMounted(c2[i] as VNode)
      //   : normalizeVNode(c2[i]))
      const nextChild = c2[i]
      if (nextChild.key != null) {
        if (
          // __DEV__ &&
          keyToNewIndexMap.has(nextChild.key)
        ) {
          console.warn(
            `Duplicate keys found during update:`,
            JSON.stringify(nextChild.key),
            `Make sure keys are unique.`
          )
        }
        keyToNewIndexMap.set(nextChild.key, i)
      }
    }

    // 5.2 loop through old children left to be patched and try to patch
    // matching nodes & remove nodes that are no longer present
    let j
    let patched = 0
    const toBePatched = e2 - s2 + 1
    let moved = false
    // used to track whether any node has moved
    let maxNewIndexSoFar = 0
    // works as Map<newIndex, oldIndex>
    // Note that oldIndex is offset by +1
    // and oldIndex = 0 is a special value indicating the new node has
    // no corresponding old node.
    // used for determining longest stable subsequence
    const newIndexToOldIndexMap = new Array(toBePatched)
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i]
      if (patched >= toBePatched) {
        // all new children have been patched so this can only be a removal
        unmount(prevChild, parentElm)
        continue
      }
      let newIndex
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key)
      } else {
        // key-less node, try to locate a key-less node of the same type
        for (j = s2; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j - s2] === 0 &&
            sameVnode(prevChild, c2[j])
          ) {
            newIndex = j
            break
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild, parentElm)
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i + 1
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex
        } else {
          moved = true
        }
        patchVnode(
          prevChild,
          c2[newIndex]
        )
        patched++
      }
    }

    // 5.3 move and mount
    // generate longest stable subsequence only when nodes have moved
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : EMPTY_ARR
    j = increasingNewIndexSequence.length - 1
    // looping backwards so that we can use last patched node as anchor
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i
      const nextChild = c2[nextIndex]
      if (newIndexToOldIndexMap[i] === 0) {
        // mount new
        patchVnode(
          null,
          nextChild
        )
      } else if (moved) {
        // move if:
        // There is no stable subsequence (e.g. a reverse)
        // OR current node is not among the stable sequence
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          // move(nextChild, container, anchor, MoveType.REORDER)
          move(nextChild, parentElm)
        } else {
          j--
        }
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
  if (oVnode === null) {
    // TODO: 创建新节点
    return
  }
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
        updateChildren(elm, oChildren, nChildren)
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
