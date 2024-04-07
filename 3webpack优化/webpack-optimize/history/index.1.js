import calc from './test.1';
// 打包时 import 在生产环境下 会自动去除掉没用的代码
//  1）这种叫 tree-shaking  把没用到的代码自动删除掉 （仅限 import）

// let calc = require('./test.1'); 
// es6 模块会把结果放到defalut上： default.sum、 default.minus
// require不支持tree-shaking
// console.log(calc.default.sum(1,2));

// 2）scope hosting 作用域提升 
let a = 1;
let b = 2;
let c = 3;
let d = a+b+c; // 在webpack中会自动省略一些可以简化的代码  构建时就分析好了直接console.log(6,'-------------');，abcd去掉了
console.log(d,'-------------');

