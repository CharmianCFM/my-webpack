let { AsyncParallelHook } = require('tapable'); // 实现AsyncParallelBailHook
// tapable库中有三种注册方法 
// tap 同步注册 
// 异步注册 tapAsync(cb) tapPromise(promise)
// 调用 call callAsync promise
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          resolve();
        }, 2000);
      })
    });
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          resolve();
        }, 2000);
      })
    });
  }
  start() {
    this.hooks.arch.promise('jw').then(function () {
      console.log('end');
    });
  }
}
let l = new Lesson();
l.tap();
l.start();