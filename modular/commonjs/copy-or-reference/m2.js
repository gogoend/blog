let m1 = require('./m1'), limitAge = m1.limitAge

console.log(m1)
console.log(limitAge)

let limitAgeMultiply10 = limitAge * 10

module.exports = {
    ...module.exports,
    limitAgeMultiply10
}
