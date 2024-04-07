// 添加注释的 loader
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');

function loader(source) {
  // this.cacheable(false) 不需要缓存   如果loader中有大量计算推荐使用缓存
  this.cacheable && this.cacheable() // 不写也是默认的这种使用缓存

  let options = loaderUtils.getOptions(this);
  let cb = this.async();

  let schema = { // 格式校验
    type:'object',
    properties:{
      text:{
        type:'string',
      },
      filename:{
        type:'string'
      }
    }
  }
  validateOptions(schema, options,'banner-loader');

  if(options.filename){
    this.addDependency(options.filename); // 自动的添加文件依赖  使依赖options.filename文件，这个文件变化的时候就要打包
    fs.readFile(options.filename, 'utf8', function (err,data) { // 读取 banner.js中的内容，作为注释添加到源码的前面
      cb(err, `/**${data}**/${source}`);
    });
  }else{ // 没有 filename 用 text
    cb(null, `/**${options.text}**/${source}`);
  }
}
module.exports = loader;