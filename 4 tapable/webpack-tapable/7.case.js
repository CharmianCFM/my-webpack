// let {AsyncSerieslHook} = require('tapable');
class AsyncSerieslHook{
  constructor(){
    this.tasks = [];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){ // express 中的中间件的原理
    let finalCallback = args.pop();
    let index = 0;
    let next = ()=>{ // compose
      if (index === this.tasks.length) return finalCallback(); // 最后执行finalCallback
      let task = this.tasks[index++];
      task(...args, next); // 执行完了之后再执行下一个
    }
    next();
  }
}

let hook = new AsyncSerieslHook(['name']);
hook.tapAsync('node',function (name,cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 2000);
});
hook.tapAsync('react', function (name,cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 2000);
});

hook.callAsync('jw',function () {
  console.log('end')
});