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
 * @param {any} U 
 * @param {any} y coefficient
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
        X[i-1][i] = U[i-1][i]
        let l = U[i][i-1] / X[i - 1][i - 1]
        X[i][i] = U[i][i] - l * U[i - 1][i]
        X[i][len] = y[i] - l * X[i - 1][len]
    }
    console.log(X)
    root[len - 1] = y[len - 1] / X[len - 1][len - 1]
    for (let i = len - 2; i >= 0; i--) {
        root[i] = y[i] / X[i][i]
        root[i] = (y[i] - U[i][i + 1] * root[i + 1]) / U[i][i]
    }
    return root
}

exports.backSubstitution = backSubstitution
exports.catchFunc = catchFunc