## tapable
###     sync
1.        SyncHook 同步 1
2.        SyncBailHook  有一个返回值不是 undefined 时候就停止执行 Bail保险 熔断型的 2
3.        SyncWaterfullHook 上一个函数的返回值作为下一个的参数 3
4.        SyncLoopHook 某个监听事件 如果返回了值 这个方法会再次执行，只有返回undefined这个方法才会停止执行 4
###     async
1.       AsyncParallel  异步并发
-             AsyncParallelHook 并发执行多个异步函数 5、6
-             AsyncParallelBailHooK 异步并发带保险的钩子
2.        AsyncSeries 异步串行
-           AsyncSeriesHook 7、8
-           AsyncSeriesBailHook
-           AsyncSeriesWaterfullHook 9



### tapable库中有三种注册方法 
- 同步注册 tap 
- 异步注册 tapAsync(cb) 
- tapPromise(promise)
    // 调用 call callAsync promise
