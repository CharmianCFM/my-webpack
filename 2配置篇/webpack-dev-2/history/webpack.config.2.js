let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
// 1) cleanWebpackPlugin 
// 2) copyWebpackPlugin
// 3) bannerPlugin  内置插件
module.exports = {
  mode: 'production',
  entry: { home: './src/index.js', },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  watch:true, // 监控 代码修改后实时build
  watchOptions:{ // 监控的选项
    poll:1000, // 每秒 问我 1000次
    aggregateTimeout:500, // 防抖 我一直输入代码 
    ignored:/node_modules/ // 不需要进行监控哪个文件
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin('./dist'), // 每次构建前先删除dist目录
    new CopyWebpackPlugin([ // 拷贝插件 把doc文件夹下的内容拷贝到 dist下
      {from:'doc',to:'./'}
    ]),
    new webpack.BannerPlugin('make 2019 by jw')  // 在打包后的资源中增加代码签名
  ]
}