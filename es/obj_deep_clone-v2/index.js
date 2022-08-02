// 1_init

// 2_getCloneDeepFn
let getObjectTagFromValue = val => Object.prototype.toString.call(val)
let concatObjectTag = ctorName => `[object ${ctorName}]`

let isBasicValue = val => val === null || ['string', 'boolean', 'number', 'bigint', 'undefined', 'symbol'].includes(typeof val)

let hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

let cloneDeep = (val, memoMap = new Map()) => {
    if(isBasicValue(val)){
        return val
    }
    if(memoMap.has(val)) {
        return memoMap.get(val)
    }

    if (getObjectTagFromValue(val) === concatObjectTag('Object')) {
        let newVal = new val.constructor()
        memoMap.set(val, newVal)

        for(let key in val) {
            if (hasOwn(val, key)) {
                newVal[key] = cloneDeep(val[key], memoMap)
            }
        }

        return newVal
    }
    if (getObjectTagFromValue(val) === concatObjectTag('Array')) {
        let newVal = new val.constructor()
        memoMap.set(val, newVal)

        for (let i = 0; i < val.length; i++) {
            if (hasOwn(val, i)){
                newVal[i] = cloneDeep(val[i], memoMap)
            }
        }
        
        return newVal
    }

    return val
}

// 3_gogoendA
gogoend_a = [{b:{c: {d: { e: { f: [1,2,3, {g: {h: {}}}]} }}}},{i:{j: {k: { l: { m: [4,5,6, {n: {o: {}}}]} }}}}]
gogoend_a.push(gogoend_a)

// 4_gogoendB
gogoend_b = cloneDeep(gogoend_a)