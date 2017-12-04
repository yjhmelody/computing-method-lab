let util = require('./index')

let PI = 3.141592653

let pai = function(x){
    return 4 / (1 + x * x)
}

console.log('PI', util.integral(pai, 0, 1, 100000, algo="T"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="S"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="C"))