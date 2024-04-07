class SyncLoopHook{ 
  constructor(args) { 
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    this.tasks.forEach(task => { // 每个至少执行一遍
      let ret;
      do{
        ret = task(...args);
      } while (ret !== undefined)
    });
  }
}
let total = 0;
let hook = new SyncLoopHook(['name']);
hook.tap('node',function (name) {
  console.log('node',name);
  return ++total == 3?undefined :'1'
}); 
hook.tap('react', function (name) {
  console.log('react', name);
  
}); 
hook.call('jw');