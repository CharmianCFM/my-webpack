let {AsyncSeriesWaterfallHook} = require('tapable');

let h = new AsyncSeriesWaterfallHook(['name']);
// tapAsync tapPromise
h.tapAsync('node',function (name, cb) {
  setTimeout(() => {
    console.log('node');
    cb(null, '我饿了');
    // cb('error', '我饿了'); 第一个参数为error不空即报错了，会跳过下面的直接执行最后一个cb end
  }, 1000);
});
h.tapAsync('react', function (data, cb) {
  setTimeout(() => {
    console.log('react', data);
    cb();
  },2000);
});

h.callAsync('jw',function () {
  console.log('end');
});

// tapPromise版本自行实现 思考题


// AsyncSeriesBailHook
// tapable (compose + promise + asyncCallback)
// webpack