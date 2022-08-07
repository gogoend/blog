const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

let limitAgeMultiply10 = require('./m2.js').limitAgeMultiply10
console.log(limitAgeMultiply10)

let limitAge = 29
const addLimitAge = () => { limitAge++ }

module.exports = {
    ...module.exports,
    people,
    limitAge,
    addLimitAge
}
