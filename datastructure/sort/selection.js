let util = require('./_util.js')

let { swap } = util
function selection(arr) {

    for(let i=0;i<arr.length-1;i++){
        let minIndex=i
        // 内循环：找到剩下元素中最小的元素的索引
        for(let j=i+1;j<arr.length;j++){
            if(arr[minIndex]>arr[j]){
                minIndex=j
            }
        }
        swap(minIndex,i,arr)
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
    selection(arr)
})()