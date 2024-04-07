class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) { 
    let [first,...others] = this.tasks;
    return others.reduce((p,n)=>{ // redux源码 一致的
      return p.then(()=>n(...args)); // 把所有的promise串连起来
    }, first(...args));
  }
} // 异步promis版的串行

let hook = new AsyncSeriesHook(['name']);
hook.tapPromise('node', function (name) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 2000);
  })
});
hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 2000);
  })
});
hook.promise('jw').then(function () {
  console.log('end')
});