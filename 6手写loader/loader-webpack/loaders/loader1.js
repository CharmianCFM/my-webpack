function loader(source) { // loader的参数 就是源代码
  console.log('loader1~~~')
  return source
}
loader.pitch = function () { // loader 默认是由两部分组成 pitch normal
  console.log('loader1-pitch')
}
module.exports = loader

// 设置loader增加pitch
// loader3-pitch
// loader2-pitch
// loader1-pitch
// loader1~~~
// loader2~~~
// loader3~~~
// inline-loader