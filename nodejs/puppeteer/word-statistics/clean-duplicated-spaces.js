/**
 * 清理重复空格空行
 * @param {string} text 
 * @returns string
 */
module.exports = function cleanDuplicatedSpaces (text) {
  const REG_EXP = /[\n\s]+/g

  return text.replace(REG_EXP, ' ')
}