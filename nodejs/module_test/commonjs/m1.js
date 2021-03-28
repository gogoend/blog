// console.log(arguments);
const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

let limitAge = [29]
const addLimitAge = () => {limitAge[0]++}

module.exports = {
    people,
    limitAge,
    addLimitAge
}
const m2 = require('./m2.js')
console.log(m2)