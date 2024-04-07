let { AsyncParallelHook } = require('tapable');
// 异步的钩子（有两种）（串行）并行 需要等待所有的异步事件并发执行完之后 再执行回调方法
// 例如 同时发送多个请求

// tapable库中绑定事件的三种方式 tap 绑定同步 tapAsync 异步的 tapPromise
//                 call       callAsync       promise
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();
        // cb('出错了'); // BailHook
      }, 2000);
    });
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name);
        cb();
      }, 2000);
    });
  }
  start() {
    this.hooks.arch.callAsync('jw', function () {
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap();
l.start();
