function radix(arr, base = 10) {
    let max = Math.max(...arr)

    let devide = base ** 0;

    // 定义桶
    let basket = []
    basket.length = base;
    for(let i=0;i<base;i++){
        basket[i]=[]
    }

    // 将原数组中元素依次放入对应桶中
    for (let i = 0; i <= max; i++ , devide *= base, base *= base) {
        for (let j = 0; j < arr.length; j++) {
            let bIndex = arr[j] % base / devide;
            // if (!Array.isArray(basket[bIndex])) {
            //     basket[bIndex] = []
            // }
            basket[bIndex].push(arr[j])
        }

        // 将该次排序好的所有数字重新放回数组
        let index = 0
        for (let k = 0; k < basket.length; k++) {
            for (let j = 0; j < basket.length; j++) {
                if (basket[k][j] !== undefined) arr[index++] = basket[k][j]
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
    radix(arr)
})()