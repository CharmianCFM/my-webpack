// 单独打包 react react-dom
let path = require('path');
let webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]', // _dll_react 定义个变量接收函数返回值
    //libraryTarget:'var' // commonjs umd var this ....
  },
  plugins: [
    new webpack.DllPlugin({ 
      name: '_dll_[name]', // 规定 name = 上面的library
      path: path.resolve(__dirname, 'dist', 'manifest.json')  // 会生成_dll_react.js和manifest.json文件
    })
  ]
}