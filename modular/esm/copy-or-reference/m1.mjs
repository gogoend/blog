export const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

import * as m2 from './m2.mjs'
import { limitAgeMultiply10 } from './m2.mjs'
console.log(m2, limitAgeMultiply10)

export let limitAge = 29
export const addLimitAge = () => { limitAge++ }

