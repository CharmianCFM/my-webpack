// webpack 是node写出来的 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000,
    progress: true, //进度条
    contentBase: './build',  // 服务暴露的路径
    compress: true // 立即打开网页
  },
  mode: 'production', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径  输出路径
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,  // 去掉双引号
        collapseWhitespace: true,  // 一行
      },
      hash: true  //引用的 js开启 hash,防止缓存
    })
  ],
  module: { // 模块
    rules: [ // 规则  css-loader 接续 @import这种语法的
      // style-loader 他是把css 插入到head的标签中
      // loader的特点 希望单一功能
      // loader的用法 字符串只用一个loader  
      // 多个loader需要 []
      // loader的顺序 默认是从右向左执行  从下到上执行
      // loader还可以写成 对象方式
      {
        // 可以处理css文件
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // 把 css 放在<style>标签里， 插入到head标签中
            options:{
              insertAt:'top' //<style>标签插入到上面
            }
          },
          'css-loader'
        ]
      },
      {
        // 可以处理less文件  
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',  
            options: {
              insertAt: 'top'
            }
          },
          'css-loader', // @import  解析路径
          'less-loader' // 把less -> css
        ]
      }
      // 可以处理 sass stylus文件  node-sass sass-loader stylus stylus-loader
    ]
  }
}