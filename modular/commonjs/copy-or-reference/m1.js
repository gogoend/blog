const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

let m2 = require('./m2.js'), limitAgeMultiply10 = m2.limitAgeMultiply10
console.log(m2, limitAgeMultiply10)

let limitAge = 29
const addLimitAge = () => { limitAge++ }

module.exports = {
    ...module.exports,
    people,
    limitAge,
    addLimitAge
}
