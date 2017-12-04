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
 * @private 
 * @param {Array[]} U 
 * @param {Array} y coefficient
 * @returns {Array} root 
 */
function chaseMethod(U, y) {
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
function GaussianEliminatio(U, y) {
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

/**
 * @private
 * @param {Array[]} X 
 * @param {Number} j index 
 * @return {Array} X's col of j
 */
function ArrayCol(X, j) {
    let A = []
    for (let i = 0; i < X.length; i++) {
        A[i] = X[i][j]
    }
    return A
}


/**
 * @private
 * @param {Array[]} X 
 * @param {Number} i index 
 * @return {Array} X's row of i
 */
function ArrayRow(X, i) {
    let A = []
    for (let j = 0; j < X.length; j++) {
        A[j] = X[i][j]
    }
    return A
}

/**
 * @private
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

/**
 * @private
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
 * @private
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

/**
 * 
 * @param {Array} A 
 * @param {String} op operation's string 
 * @param {Array} B 
 */
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

/**
 * @private
 * @param {Array} arr 
 * @param {Number} i left
 * @param {Number} j right
 * @param {function} func what you want to do with these element
 * @returns {Number} 
 */
function mapSum(arr, i, j, func=(x)=>x) {
    let sum = 0
    while(i <= j){
        sum += func(arr[i])
        i++
    }
    return sum
}

/**
 * 
 * @param {function} func what your need to compute integral
 * @param {Number} a left
 * @param {Number} b right
 * @param {Number} n count
 * @param {String} algo "T" or "S" or "C"
 * @return {Number} func's integral
 */
function integral(func, a, b, n, algo="T") {
    let diff = b - a
    let h = (b - a) / n

    let x = []
    for(let i = 0; i <= n; i++){
        x[i] = a + i * h
    }
    if (algo === "T") {
        let sum = 2 * mapSum(x, 1, n-1, func)
        return 0.5 * h * (func(x[0]) + func(x[n]) + sum)
    }
    if (algo === "S") {
        let sum1 = 2 * mapSum(x, 1, n-1, func)
        let x2 = x.map(function (d, i, arr) {
            return (d + arr[i+1]) / 2
        })
        let sum2 = 4 * mapSum(x2, 0, n-1, func)

        return h / 6 * (func(x[0]) + func(x[n]) + sum1 + sum2)
    }
    if (algo === "C") {
        // k 
        let sum1 = 7 * mapSum(x, 0, n-1, function(x){
            return func(x)
        })
        // 0.25
        let sum2 = 32 * mapSum(x, 0, n-1, function(x){
            return func(x + 1 / 4 * h)
        })
        // 0.5
        let sum3 = 12 * mapSum(x, 0, n-1, function(x){
            return func(x + 1 / 2 * h)
        })
        // 0.75
        let sum4 = 32 * mapSum(x, 0, n-1, function(x){
            return func(x + 3 / 4 * h)
        })
        // k+1
        let sum5 = 7 * mapSum(x, 1, n, function(x){
            return func(x)
        })

        return h / 90 * (sum1 + sum2 + sum3 + sum4 + sum5)
    }

    throw TypeError("不存在这样的公式:" + algo)
}


exports.backSubstitution = backSubstitution
exports.chaseMethod = chaseMethod
exports.GaussianEliminatio = GaussianEliminatio
exports.integral = integral