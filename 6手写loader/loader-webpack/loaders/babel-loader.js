let babel = require('@babel/core'); // babel核心模块
let loaderUtils = require('loader-utils')
function loader(source) { // this -> loaderContext
  console.log(this.resourcePath); // 当前要处理文件的绝对路径
  // console.log(source)
  let options = loaderUtils.getOptions(this); // 拿到配置文件中的loader options, 如options.presets
  let cb = this.async();  // this提供的
  babel.transform(source,{ // 异步 
    ...options,
    sourceMap:true,
    filename: this.resourcePath.split('/').pop() // 设置sourcemap的文件名 取当前处理的文件名
  },function (err,result) {
    cb(err, result.code, result.map);  // 执行完之后调cb,自动返回 source：result.code
  });
}


module.exports = loader;