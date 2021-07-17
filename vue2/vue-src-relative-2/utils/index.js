export function isObj(val){
    return val && typeof val === 'object'
}

export function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
        return arr.splice(index, 1)
        }
    }
}