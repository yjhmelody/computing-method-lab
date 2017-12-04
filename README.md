# Computing Method

* 回代法
* 追赶法
* 列主元高斯消去法

## 目录结构

[lib/util.js](lib/util.js)里面是实现细节，包含许多内部辅助函数

[test/test.js](test/test.js)里面测试了实现的算法，可以直接在里面更改测试数据来测试，可以`查看这里来理解接口`使用

bin/`[method].js`里面是对应算法的控制台版本给老师测试，因为读文件版本不方便实现（这个命令行版本还借用了第三方库才方便实现），所以只实现了这个。demo如下:

```

$ bin/backSubstitution.js
请输入矩阵U的行数和列数
3 3
请输入矩阵U
1 2 3
4 5 6
7 8 9
请输入矩阵y
10 11 12
[ 4.8, 0.6, 1.3333333333333333 ]
```

`index.js` 暴露最终实现的算法接口:
* backSubstitution
* chaseMethod
* GaussianEliminatio
* integral (里面实现3个复化求积算法)


integral:在test.js
```js
let util = require('./index')

let PI = 3.141592653

let pai = function(x){
    return 4 / (1 + x * x)
}

console.log('PI', util.integral(pai, 0, 1, 100000, algo="T"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="S"))
console.log('PI', util.integral(pai, 0, 1, 100000, algo="C"))
```


文档在[out/util.js.html](out/util.js.html)里，部分文档是内部接口。


## 其他

存放在github只是为了个人方便，之后可能打算换语言来实现（用JS写这些全是坑）。