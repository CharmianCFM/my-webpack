let loaderUtils = require('loader-utils');
function loader(source) {
  // file-loader 需要返回一个路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source }); // 根据内容生成文件名23655cc0d2d4ce6df517730f5658b2bf.jpg
  this.emitFile(filename, source); // 发射文件
  return `module.exports="${filename}"`
}
loader.raw = true; // 二进制
module.exports = loader;



// /***/ "./src/public.jpg":
// /*!************************!*\
//   !*** ./src/public.jpg ***!
//   \************************/
// /*! no static exports found */
// /***/ (function(module, exports) {

//   module.exports="23655cc0d2d4ce6df517730f5658b2bf.jpg"

//   /***/ })