import vnode from "../vnode_diff_test_with_snabbdom_implement/vnode.js";
import {
  getSequence
} from './utils.js'

function isSameTypeVnode(oVnode, nVnode) {
  return oVnode.type === nVnode.type && oVnode.key === nVnode.key;
}

function unmount (child, parentEl) {
  // TODO:
  parentEl.removeChild(child.elm)
}

function move (child, parentEl, anchor) {
  // TODO:
  parentEl.insertBefore(child.elm, anchor)
}

function mountElement (child, parentEl, anchor) {
  // TODO:
}

function patch (child, parentEl, anchor) {
  // TODO:
}

/**
 * diff 算法核心
 * https://www.bilibili.com/video/BV1QL4y1u7Nd
 * @param {*} c1 
 * @param {*} c2 
 * @param {*} param2 
 */
function diffCore (c1, c2, {
  unmount,
  move,
  mountElement,
  patch,
}) {
  let i = 0;

  const l1 = c1.length, l2 = c2.length
  // 最后一个元素的索引
  let e1 = l1 - 1, e2 = l2 - 1

  // 从左往右遍历
  while(i<=e1 && i<=e2) {
    const n1 = c1[i]
    const n2 = c2[i]
    if (isSameTypeVnode(n1, n2)) {
      patch(n1.key)
    } else {
      break
    }
    i++
  }
  // 从往右遍历
  while(i<=e1 && i<=e2) {
    const n1 = c1[e1]
    const n2 = c2[e2]
    if (isSameTypeVnode(n1, n2)) {
      patch(n1.key)
    } else {
      break
    }
    //
    e1--
    e2--
  }

  // 老节点已遍历完，新节点未遍历完，此时创建新节点
  if (i > e1) {
    if (i <= e2) {
      while (i <= e2) {
        const n2= c2[i]
        mountElement(n2.key)
        i++
      }
    }
  }

  // 旧节点未遍历完，新节点已遍历完，此时删除旧节点
  else if (i > e2) {
    if (i <= e1) {
      while (i <= e1) {
        const n1= c1[i]
        unmount(n1.key)
        i++
      }
    }
  }

  // 4. 新节点、旧节点均为遍历完，中间存在乱序的情况
  else {
    // 4.1 把新节点处理为Map key:index
    const keyToNewIndexMap = new Map()

    // 新、旧节点列表中，开始索引
    const s1 = i, s2 = i
    for (i = s2; i <= e2; i++) {
      const nextChild = c2[i]
      keyToNewIndexMap.set(
        nextChild.key,
        i
      )
    }

    // 新增、更新节点的总数
    const toBePatched = e2 - s2 + 1
    // 每次新增、更新一个节点，patched++
    let patched = 0


    // 4.2 下标是新节点相对下标，初始为0
    const newIndexToOldIndexMap = new Array(toBePatched)
    for (i = 0; i < toBePatched; i++) {
      // 若旧节点被复用，则对应老节点下标+1
      newIndexToOldIndexMap[i] = 0
    }

    // 遍历旧元素
    for (i = s1; i<=e1; i++) {
      // 遍历过程中，如果 toBePatched === patched，那……（1:23）
      const prevChild = c1[i]

      if (
        patched >= toBePatched
        // 其实此处 === 即可
      ) {
        unmount(prevChild.key)
        continue;
      }
      // 检查旧节点有没有对应新节点
      let newIndex = keyToNewIndexMap.get(prevChild.key)

      if (newIndex === undefined) {
        // 没有对应，旧节点无法复用
        unmount(prevChild.key)
      } else {
        // 找到节点，旧节点可以复用(略绕，见p2 14:38)
        newIndexToOldIndexMap[newIndex - s2] = i + 1

        patch(prevChild.key)
        // 每复用一个旧节点，patched++
        patched++
      }
    }
    
    // move mount noop
    // 遍历新元素，来对节点进行移动（考虑到insertBefore，从后往前遍历）
    for(i = toBePatched - 1; i >=0; i--) {
      const nextChildIndex = s2 + i
      const nextChild = c2[nextChildIndex]

      // 判断节点是不是mount
      if (newIndexToOldIndexMap[i] = 0) {
        mountElement(nextChild.key)
      } else {
        // move
        // TODO: 最长递增子序列在此次使用！
      }
    }
  }
}

export default function patchEntry(oVnode, nVnode) {
  diffCore(oVnode.children, nVnode.children, {
    unmount,
    move,
    mountElement,
    patch,
  })
  return nVnode;
}
