const util = require('../lib/util')

// root = [-5, 1, 1]
let U = [
    [1, 2, 3],
    [0, 5, 6],
    [0, 0, 1]
]
let y = [0, 11, 1]
// console.log(util.backSubstitution(U, y))


// root = [1, 2, 3]
U = [
    [1, 2, 0],
    [1, 1, 2],
    [0, 1, 3]
]
y = [5, 9, 11]
// console.log(util.catchFunc(U, y))

U = [
    [2, 2, -1],
    [1, -1, 0],
    [4, -2, -1]
]
y = [-4, 0, -6]
console.log(util.guassMethod(U, y))