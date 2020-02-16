function insertion(arr){
    let current,prevIndex

    for(let i=1;i<arr.length;i++){
        current=arr[i]
        for(prevIndex=i-1; prevIndex>=0 && arr[prevIndex]>current ;prevIndex--){
            arr[prevIndex+1]=arr[prevIndex];
        }
        arr[prevIndex+1]=current
        // while(prevIndex>=0 && arr[prevIndex]>current){
        //     arr[prevIndex+1]=arr[prevIndex]
        //     prevIndex--
        // }
        // arr[prevIndex+1]=current
    }
    console.log(arr)
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
    insertion(arr)
})()