const util = require('../lib/util')

let U = [
    [1, 2, 3],
    [0, 5, 6],
    [0, 0, 1]
]
let y = [0, 11, 1]
// console.log(util.backSubstitution(U, y))


U = [
    [1, 2, 1],
    [2, 5, 6],
    [1, 2, 1]
]

 y = [2, 11, 1]

console.log(util.catchFunc(U, y))