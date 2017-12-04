const util = require('../lib/util')
const assert = require('assert')

/**
 * 
 * @param {Array} actual 
 * @param {Array} excepted 
 * @param {String} message 
 * @param {Number} deviation
 */
let ArrayApproximateEqual = (function () {
    let count = 0
    return function ArrayApproximateEqual(actual, excepted, message, deviation=1e-7) {
        for (let i = 0; i < excepted.length; i++) {
            assert(actual[i] + deviation >= excepted[i], message)
            assert(actual[i] - deviation <= excepted[i], message)
        }
        count++
        console.log(`第${count}个测试通过`)
    }
})()

// root = [-5, 1, 1]
let U = [
    [1, 2, 3],
    [0, 5, 6],
    [0, 0, 1]
]
let y = [0, 11, 1]
ArrayApproximateEqual(util.backSubstitution(U, y), [-5, 1, 1])


// root = [1, 2, 3]
U = [
    [1, 2, 0],
    [1, 1, 2],
    [0, 1, 3]
]
y = [5, 9, 11]
ArrayApproximateEqual(util.chaseMethod(U, y), [1, 2, 3])

// root = [1, 1, 8]
U = [
    [2, 2, -1],
    [1, -1, 0],
    [4, -2, -1]
]
y = [-4, 0, -6]

ArrayApproximateEqual(util.GaussianEliminatio(U, y), [1, 1, 8])

let pai = function(x){
    return 4 / (1 + x * x)
}

let PI = 3.141592653
console.log('PI', util.integral(pai, 0, 1, 100000, algo="T"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="S"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="C"))