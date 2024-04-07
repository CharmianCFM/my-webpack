// 异步 串行 瀑布 钩子
class AsyncSeriesWaterfallHook{
  constructor(){
    this.tasks = [];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){ 
    let finalCallback = args.pop();
    let index = 0;
    let next = (err, data)=>{ // 自己实现一个cb
      let task = this.tasks[index];
      if (!task) return finalCallback(); // task执行完毕执行最后一个回调
      if(index === 0){ // 第一个回调传name
        task(...args, next);
      }
      else{
        task(data, next); 
      }
      index++;
    }
    next();
  }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('node',function (name,cb) {
  setTimeout(() => {
    console.log('node', name);
    cb(null, '结果');
  }, 1000);
});
hook.tapAsync('react', function (data,cb) {
  setTimeout(() => {
    console.log('react', data);
    cb(null);
  }, 1000);
});

hook.callAsync('jw',function () {
  console.log('end')
});