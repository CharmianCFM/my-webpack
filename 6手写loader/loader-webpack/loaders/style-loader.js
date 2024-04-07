let loaderUtils = require('loader-utils');
function loader(source) {
  // 我们可以在style-loader中导出一个 脚本
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return str;
}
// 在style-loader上写了pitch, 后面的css、less都不会执行，style-loader也不会执行,只执行这个 pitch
// style-loader     less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) { // remainingRequest剩余的请求
  // 让style-loader 去处理less-loader!css-loader/./index.less 
  // require路径 返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `
  // console.log('style-pitch', str)
  return str;
}
module.exports = loader;


// /***/ "./src/index.less":
// /*!************************!*\
//   !*** ./src/index.less ***!
//   \************************/
// /*! no static exports found */
// /***/ (function(module, exports, __webpack_require__) {


//   let style = document.createElement('style');
//   style.innerHTML = __webpack_require__("./loaders/css-loader.js!./loaders/less-loader.js!./src/index.less");
//   document.head.appendChild(style);


// /***/ }),

// /***/ "./src/public.jpg":
// /*!************************!*\
// !*** ./src/public.jpg ***!
// \************************/
// /*! no static exports found */
// /***/ (function(module, exports) {

// module.exports="23655cc0d2d4ce6df517730f5658b2bf.jpg"

// /***/ })






// /***/ "./src/index.less":
// /*!************************!*\
//   !*** ./src/index.less ***!
//   \************************/
// /*! no static exports found */
// /***/ (function(module, exports) {


//   let style = document.createElement('style');
//   style.innerHTML = "body {\n  background: red;\n}\n";
//   document.head.appendChild(style);


// /***/ })


