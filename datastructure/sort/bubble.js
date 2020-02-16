// function swap(a, b) {
//     let c = b;
//     b = a;
//     a = c;
// }

function bubble(arr){
    for (let i = 0; i <= arr.length; i++){
        for (let j = i+1; j <= arr.length; j++){
            if(arr[i]>arr[j]){
                let tmp=arr[j];
                arr[j]=arr[i];
                arr[i]=tmp;
            }
        }
    }
    console.log(arr)
}

(()=>{
    let arr
    if(process.argv[2]){
        arr=JSON.parse(process.argv[2])
    }else{
        arr=[]
        for(let i=0;i<10;i++){
            arr.push(Math.round(Math.random()*100))
        }
    }
    bubble(arr)
})()