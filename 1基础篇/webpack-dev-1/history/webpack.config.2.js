let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css
let OptimizeCss = require('optimize-css-assets-webpack-plugin'); // 压缩 css
let UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩 js
module.exports = {
  optimization:{ // 优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        parallel: true, // 并发打包
        sourceMap: true  // 源码映射
      }),
      new OptimizeCss()
    ]
  },
  mode: 'production', 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({  // 把css抽离成一个单独的文件，而不是直接放在在<style>标签里
      filename:'main.css'
    })
  ],
  module: { 
    rules: [ 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 创建个 link 标签，引用css文件
          'css-loader',
          'postcss-loader' // 自动添加浏览器前缀 -webkit-transform: rotate(45deg) 配置文件在 postcss.config.js
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}