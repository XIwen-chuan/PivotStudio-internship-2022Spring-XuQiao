console.log(1 + 2)
console.log(1 - 2)
console.log(1 * 2)
console.log(1 / 2)

console.log(3 + 4)
console.log(3 - 4)
console.log(3 * 4)
console.log(3 / 4)

let a = 1;

let b = (param1, param2) => {
    console.log(param1);
    return param2;
};

let c = (param1, param2) => param1 + param2;

for (let i = 1; i < 10; i++) {
    setTimeout(function() {
        console.log(i)
    }, 1000)
};

let arr1 = [1, 3, 5, 7, 9];
arr1.forEach(function(val, index, arr) {
    console.log(val + index)
});
arr1.filter(function(val, index, arr) {
    if (index < 3) return true;
});
arr1.find(function(val, index, arr) {
    if (index = 3) return true;
})