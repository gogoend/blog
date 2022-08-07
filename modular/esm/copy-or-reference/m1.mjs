export const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

import { limitAgeMultiply10 } from './m2.mjs'
console.log(limitAgeMultiply10)

export let limitAge = 29
export const addLimitAge = () => { limitAge++ }

