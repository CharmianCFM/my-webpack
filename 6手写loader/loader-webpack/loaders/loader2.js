function loader(source) { // loader的参数 就是源代码
  console.log('loader2~~~')
  return source
}
loader.pitch = function () {
  console.log('loader2-pitch')
  return 'xxx'
}
module.exports = loader

// loader.pitch有return值，则会立即停止，并返回执行上一个loader
// loader3-pitch
// loader2-pitch
// loader3~~~