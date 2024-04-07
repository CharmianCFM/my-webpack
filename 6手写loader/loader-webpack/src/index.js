// console.log('hello')

// 1) inline-loader 设置
// -！ 不会让文件 再去通过pre + normal loader来处理了
// ！ 没有normal
// !! 什么都不要
// let str = require('!!inline-loader!./a.js'); // 只用inline-loader处理./a.js

// 设置 require('inline-loader!./a.js');
// loader1~~~
// loader2~~~
// loader3~~~ // index.js
// loader1~~~
// loader2~~~
// inline-loader
// loader3~~~ // a.js

// !! 什么都不要
// loader1~~~
// loader2~~~
// loader3~~~ // index.js
// inline-loader // a.js



// loader 默认是由两部分组成 pitch normal


// 2) babel
// class Zfpx {
//   constructor(){
//     this.name = 'zfpx';
//   }
//   getName(){
//     return this.name
//   }
// }
// let zf  = new Zfpx();
// console.log(zf.getName())


// 3) url loader
// import p from './public.jpg'
// let img = document.createElement('img');
// img.src = p;
// document.body.appendChild(img);


// 4) css less style
import './index.less'
