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


// 0.7547254155426606
let x = [30, 45, 60]
let y = [1/2, 0.5 ** 0.5, 0.75 ** 0.5]
console.log(util.diffQuotient(x, y, 2))
console.log(util.NewtonInterpolation(x, y, 2)(50))


let A = [
    [2, -1],
    [8, 4],
    [2, 1],
    [7, -1],
    [4, 0]
]

let b = [1, 0, 1, 8, 3]
// [ 0.7927199191102123, -1.4641051567239636 ]
console.log(util.leastSquares(A, b))