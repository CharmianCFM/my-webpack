module.exports = 'zfpx';
require('@babel/polyfill'); // 处理includes的补丁包 增加原型方法
class B{
  
}

function * gen(params) {
  yield 1;
}
console.log(gen().next());


'aaa'.includes('a');