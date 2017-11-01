/**
 * Seek the root of the Upper Triangle Equations
 * 
 * @param {Array[]} U Upper Triangle Equations
 * @param {Array} y coefficient
 * @returns {Array} root
 */
function backSubstitution(U, y) {
    let len = U.length
    let root = []
    for (let i = len - 1; i >= 0; i--) {
        let sum = 0
        for (let j = len - 1; j > i; j--) {
            sum += U[i][j] * root[j]
        }
        root[i] = (y[i] - sum) / U[i][i]
    }
    return root
}

/**
 * 
 * 
 * @param {Array[]} U 
 * @param {Array} y coefficient
 * @returns {Array} root 
 */
function catchFunc(U, y) {
    let len = U.length
    let root = []

    let X = []
    for (let i = 0; i < len; i++) {
        X[i] = []
        for (let j = 0; j < len + 1; j++) {
            X[i][j] = 0
        }
    }

    // catch
    X[0][0] = U[0][0]
    X[0][len] = y[0]

    for (let i = 1; i < len; i++) {
        X[i - 1][i] = U[i - 1][i]
        let l = U[i][i - 1] / X[i - 1][i - 1]
        X[i][i] = U[i][i] - l * U[i - 1][i]
        X[i][len] = y[i] - l * X[i - 1][len]
    }
    root[len - 1] = X[len - 1][len] / X[len - 1][len - 1]
    for (let i = len - 2; i >= 0; i--) {
        root[i] = (X[i][len] - X[i][i + 1] * root[i + 1]) / X[i][i]
    }
    return root
}

/**
 * 
 * 
 * @param {Array[]} U 
 * @param {Array} y coefficient
 * @returns {Array} root 
 */
function guassMethod(U, y) {
    let len = U.length
    let X = []

    for (let i = 0; i < len; i++) {
        X[i] = []
        for (let j = 0; j < len; j++) {
            X[i][j] = U[i][j]
        }
        X[i][len] = y[i]
    }

    for (let k = 0; k < len; k++) {
        let index = k;
        // get the max value's index
        for (let i = k + 1; i < len; i++) {
            if (X[i][k] > X[index][k]) {
                index = i
            }
        }
        // switch the max value line to the k row
        console.log('index',index)
        switchRow(X, k, index)
        // guass 
        for (let i = k + 1; i < len; i++) {
            let l = X[i][k] / X[k][k]
            let temp = ArrayOpScalar(X[k], '*', l)
            X[i] = ArrayOpArray(X[i], '-', temp)
        }
    }
    let temp = splitMatrix(X)
    return backSubstitution(temp.U, temp.y)
}

function ArrayCol(X, j) {
    let A = []
    for (let i = 0; i < X.length; i++) {
        A[i] = X[i][j]
    }
    return A
}


function ArrayRow(X, i) {
    let A = []
    for (let j = 0; j < X.length; j++) {
        A[j] = X[i][j]
    }
    return A
}

/**
 * 
 * @param {Array[]} X 
 * @return {Array[]} U
 * @return {Array} y
 */
function splitMatrix(X) {
    let y = ArrayCol(X, X.length)
    let U = []
    for (let i = 0; i < X.length; i++) {
        U[i] = []
        for (let j = 0; j < X[i].length - 1; j++) {
            U[i][j] = X[i][j]
        }
    }

    return {
        U,
        y
    }
}
// console.log(splitMatrix([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]))


/**
 * 
 * @param {Array[]} U 
 * @param {Number} i 
 * @param {Number} j 
 */
function switchRow(U, i, j) {
    let tempArray = U[i]
    U[i] = U[j]
    U[j] = tempArray
}

/**
 * 
 * @param {Array} A 
 * @param {String} op 
 * @param {Number} value 
 */
function ArrayOpScalar(A, op, value) {
    let len = A.length
    if (typeof value !== 'number') {
        throw TypeError('不是标量')
    }

    let X = []

    if (op === '+')
        for (let i = 0; i < len; i++) {
            X[i] = A[i] + value
        }
    else if (op === '-') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] - value
        }
    } else if (op === '*') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] * value
        }
    } else if (op === '/') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] / value
        }
    } else {
        throw TypeError('运算符错误')
    }
    return X
}

function ArrayOpArray(A, op, B) {
    let len = A.length
    let X = []

    if (op === '+')
        for (let i = 0; i < len; i++) {
            X[i] = A[i] + B[i]
        }
    else if (op === '-') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] - B[i]
        }
    } else if (op === '*') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] * B[i]
        }
    } else if (op === '/') {
        for (let i = 0; i < len; i++) {
            X[i] = A[i] / B[i]
        }
    } else {
        throw TypeError('运算符错误')
    }
    return X
}



exports.backSubstitution = backSubstitution
exports.catchFunc = catchFunc
exports.guassMethod = guassMethod