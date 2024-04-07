// let {AsyncParralleHook} = require('tapable');
class AsyncParralleHook {
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) { // express 中的中间件的原理
    let finalCallback = args.pop(); // 拿出最终的函数
    let index = 0; // index计数 等价于 Promise.all方法
    let done = () => { // 提供给一个done方法 cb 每执行完一个task加 1
      index++;
      if (index === this.tasks.length) finalCallback();
    }
    this.tasks.forEach(task => task(...args, done));
  }
}

let hook = new AsyncParralleHook(['name']);
hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000);
});
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
});

hook.callAsync('jw', function () {
  console.log('end')
});