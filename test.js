let util = require('./index')

let PI = 3.141592653

let pai = function(x){
    return 4 / (1 + x * x)
}

console.log('PI', util.integral(pai, 0, 1, 100000, algo="T"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="S"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="C"))

function func(x, y){
    return -2 * x * y
}

// 0.03916389509898707
console.log('精确解:', 0.03916389509898707)
console.log(util.EulerFormula(func, 0, 1, 1.8, 1800))
console.log(util.RungeKuttaMethod(func, 0, 1, 1.8, 18000000, 1/2))
console.log(util.RungeKuttaMethod(func, 0, 1, 1.8, 180000, 1/2))