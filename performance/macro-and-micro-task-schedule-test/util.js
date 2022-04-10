/**
 * 阻塞程度
 */
function makeStuck (exp = 0) {
  let i = 0
  while(i < Number(`10e${exp}`)) {
    i++
  }
}