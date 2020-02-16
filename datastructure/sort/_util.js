function swap(a, b, arr) {
    let tmp = arr[b];
    arr[b] = arr[a];
    arr[a] = tmp
}
module.exports={
    swap
}