let { AsyncSeriesHook } = require('tapable');
// AsyncSeriesHook 串行执行 tapAsync + callAsync
//                         tapPromise + promise
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('react', (name, cb) => {
        setTimeout(() => {
          console.log('react', name);
          cb();
        }, 2000);
    });
    this.hooks.arch.tapAsync('node', (name, cb) => {
      // return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          cb();
        }, 2000);
      // })
    });
  }
  start() {
    this.hooks.arch.callAsync('jw', function () {
      console.log('end');
    });
  }
}
let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子