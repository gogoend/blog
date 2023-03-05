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

export default function patch(oVnode, nVnode) {
  return nVnode;
}
