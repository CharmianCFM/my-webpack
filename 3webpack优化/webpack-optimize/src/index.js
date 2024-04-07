// 懒加载
// let button = document.createElement('button');
// button.innerHTML = 'hello';
// // vue的懒加 react懒加载 远离都是这样
// button.addEventListener('click',function () {
//   // es6 草案中的语法 其实就是利用jsonp实现动态加载文件
//   import('./source.js').then(data=>{
//     console.log(data.default);  //'zfpx12345'
//   })
// });
// document.body.appendChild(button);


// 热更新
import str from './source';
console.log(str);
if(module.hot){
  module.hot.accept('./source',()=>{
    // console.log('文件更新了');
    let str = require('./source'); // 重新引用
    console.log(str); // 打印热更新后的，页面不会进行强制刷新
  })
}