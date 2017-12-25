const _ = require('lodash')

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
function mapSum(arr, i, j, func = (x) => x) {
    let sum = 0
    while (i <= j) {
        sum += func(arr[i])
        i++
    }
    return sum
}

/**
 * 
 * @param {Function} func function(x) is what your need to compute integral
 * @param {Number} a left
 * @param {Number} b right
 * @param {Number} n count
 * @param {String} algo "T" or "S" or "C"
 * @return {Number} func's integral
 */
function integral(func, a, b, n, algo = "T") {
    let diff = b - a
    let h = (b - a) / n

    let x = []
    for (let i = 0; i <= n; i++) {
        x[i] = a + i * h
    }
    if (algo === "T") {
        let sum = 2 * mapSum(x, 1, n - 1, func)
        return 0.5 * h * (func(x[0]) + func(x[n]) + sum)
    }
    if (algo === "S") {
        let sum1 = 2 * mapSum(x, 1, n - 1, func)
        let x2 = x.map(function (d, i, arr) {
            return (d + arr[i + 1]) / 2
        })
        let sum2 = 4 * mapSum(x2, 0, n - 1, func)

        return h / 6 * (func(x[0]) + func(x[n]) + sum1 + sum2)
    }
    if (algo === "C") {
        // k 
        let sum1 = 7 * mapSum(x, 0, n - 1, function (x) {
            return func(x)
        })
        // 0.25
        let sum2 = 32 * mapSum(x, 0, n - 1, function (x) {
            return func(x + 1 / 4 * h)
        })
        // 0.5
        let sum3 = 12 * mapSum(x, 0, n - 1, function (x) {
            return func(x + 1 / 2 * h)
        })
        // 0.75
        let sum4 = 32 * mapSum(x, 0, n - 1, function (x) {
            return func(x + 3 / 4 * h)
        })
        // k+1
        let sum5 = 7 * mapSum(x, 1, n, function (x) {
            return func(x)
        })

        return h / 90 * (sum1 + sum2 + sum3 + sum4 + sum5)
    }

    throw TypeError("algo只能为 T S C:" + algo)
}

/**
 * 
 * @param {Function} func functon(x, y) 
 * @param {Number} x0 function(x0, y0) x0
 * @param {Number} y0 function(x0, y0) y0
 * @param {Number} xn function(xn, yn)
 * @param {Number} n 迭代次数
 * @returns {Number} function(xn, yn) yn
 */
function EulerFormula(func, x0, y0, xn, n) {
    let xi = x0
    let yi = y0
    let yp
    let yc
    let h = (xn - x0) / n
    for (let i = 0; i < n; i++) {
        yp = yi + h * func(xi, yi)
        xi = xi + h
        yc = yi + h * func(xi, yp)
        yi = 0.5 * (yp + yc)
    }
    return yi
}

/**
 * 
 * @param {Function} func functon(x, y) 
 * @param {Number} x0 function(x0, y0) x0
 * @param {Number} y0 function(x0, y0) y0
 * @param {Number} xn function(xn, yn)
 * @param {Number} n 迭代次数
 * @param {Number} l 待定系数
 * @returns {Number} function(xn, yn) yn
 */
function RungeKuttaMethod(func, x0, y0, xn, n, l=0.5) {
    let lambda2 = 0.5 / l
    let lambda1 = 1 - lambda2
    let xi = x0
    let yi = y0
    let yp
    let yc
    let h = (xn - x0) / n
    for (let i = 0; i < n; i++) {
        yp = yi + h * func(xi, yi)
        xi = xi + h
        yc = yi + h * func(xi, yp)
        let k1 = func(xi, yi)
        let k2 = func(xi + l * h, yi + l * h * k1)
        yi = yi + h * (lambda1 * k1 + lambda2 * k2)
    }
    return yi
}

/**
 * 
 * @param {Array} x 
 * @param {Array} y 
 * @param {Number} n
 * @return {Array} 差商
 */
function diffQuotient(x, y, n){
    let arr = y.map(v => v)
    let ret = [arr[0]]
    for(let i = n; i > 0; i--){
        for(let j = 0; j < i; j++){
            arr[j] = (arr[j] - arr[j+1]) / (x[j] - x[j+1])
        }
        ret.push(arr[0])        
    }
    return ret
}

/**
 * 
 * @param {Array} x 
 * @param {Arrau} y 
 * @param {Number} n 
 * @return {Funtion} funtion(value)
 */
function NewtonInterpolation(x, y, n) {
    let arr = diffQuotient(x, y, n)
    return function (value){
        let sum = arr[0]
        let temp = 1
        for (let i = 1; i <= n; i++){
            temp = temp * (value - x[i-1])
            sum += arr[i] * temp
        }
        return sum
    }
}

/**
 * 
 * @param {Array[]} A 
 * @param {Array} b 
 * @return {Array} x
 */
function leastSquares(A, b){
    let AT = transport(A, A.length, A[0].length)
    let B = []

    for(let i = 0; i < b.length; i++){
        B.push([b[i]])
    }

    let A2 = MatrixOpMtraix(AT, '*', A)    
    let B2 = MatrixOpMtraix(AT, '*', B)
    
    let b2 = []
    for(let i = 0; i < AT.length; i++){
        b2.push(B2[i][0])
    }
    return GaussianEliminatio(A2, b2)
}

/**
 * 
 * @param {Array[]} A 
 * @param {String} op
 * @param {Array[]} B 
 * @return {Array[]} new C
 */
function MatrixOpMtraix(A, op, B){
    let C = []
    if(op === '*'){
        for(let i = 0; i < A.length; i++){
            C.push([])
            for (let j = 0; j < B[0].length; j++){
                C[i][j] = 0
                for(let k = 0; k < A[0].length; k++){
                    C[i][j] += A[i][k] * B[k][j]
                }
            }
        }
    return C        
    }

    throw TypeError("没有该运算符:" + op)
}

/**
 * 
 * @param {Array[]} A 
 * @param {Number} m 
 * @param {Number} n 
 * @return {Array[]} A's transport
 */
function transport(A, m, n){
    let B = []
    for(let j = 0; j < n; j++){
        B.push([])
    }

    for(let i = 0; i < m; i++){
        
        for(let j = 0; j < n; j++){
            B[j][i] = A[i][j]
        }
    }

    return B
}


exports.backSubstitution = backSubstitution
exports.chaseMethod = chaseMethod
exports.GaussianEliminatio = GaussianEliminatio
exports.integral = integral
exports.EulerFormula = EulerFormula
exports.RungeKuttaMethod = RungeKuttaMethod
exports.NewtonInterpolation = NewtonInterpolation
exports.diffQuotient = diffQuotient
exports.transport = transport
exports.MatrixOpMtraix = MatrixOpMtraix 
exports.leastSquares = leastSquares