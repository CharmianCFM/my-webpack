// let {AsyncParralleHook} = require('tapable');

class AsyncParralleHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) { // express 中的中间件的原理
   let tasks = this.tasks.map(task=>task(...args));
   return Promise.all(tasks)
  }
}

let hook = new AsyncParralleHook(['name']);
hook.tapPromise('node', function (name) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('node');
      resolve();
    }, 1000);
  })
});
hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react');
      resolve();
    }, 1000);
  })
});
hook.promise('jw').then(function () {
  console.log('end')
});