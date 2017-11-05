#!/usr/bin/env node

const fs = require('fs')
const util = require('../lib/util')
const scanf = require('scanf')

console.log('请输入矩阵U的行数和列数')
let m = scanf('%d')
let n = scanf('%d')

console.log('请输入矩阵U')
let U = []
for (let i = 0; i < m; i++) {
    U[i] = []
    for (let j = 0; j < n; j++) {
        U[i][j] = scanf("%d")
    }
}

console.log('请输入矩阵y')
let y = []
for (let i = 0; i < m; i++) {
    y[i] = scanf("%d")
}
console.log(util.chaseMethod(U, y))