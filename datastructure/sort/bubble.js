let util = require('./_util.js')

let { swap } = util
function bubble(arr) {
    for (let i = 0; i <= arr.length; i++) {
        for (let j = i + 1; j <= arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(i, j, arr)
            }
        }
    }
    
    console.log(arr)
    return arr
}

(() => {
    let arr
    if (process.argv[2]) {
        arr = JSON.parse(process.argv[2])
    } else {
        arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(Math.round(Math.random() * 100))
        }
    }
    bubble(arr)
})()