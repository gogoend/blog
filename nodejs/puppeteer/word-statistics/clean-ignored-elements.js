/**
 * 清理应当被忽略的元素 - 目前使用CSS选择器进行匹配
 * @param {string} text 
 * @returns string
 */
module.exports = function cleanIgnoredElements (root) {
  const selectorForIgnore = [
    'code'
  ]
  ;selectorForIgnore.forEach(
    (selector) => {
      root.querySelectorAll(selector).forEach(root => root.remove());
    }
  )
}