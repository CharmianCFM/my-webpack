// 4 处理图片资源
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization:{ // 优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCss()
    ]
  },
  mode: 'development', 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
    // publicPath:'http://www.zhufengpeixun.cn'  // 给 js 增加域名，例如放 cdn 上了
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'css/main.css'  // 放在 css 目录下
    }),
   
  ],
  externals: {
      jquery: "$"
  },
  module: { 
    rules: [
      {
        test:/\.html$/,
        use:'html-withimg-loader'  // 解析html,加载src图片<img src="./logo.png" alt="">
      },
      {
        test:/\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片 小于多少k的时候 用base64来转化    base64的大小会比源文件大1/3，但是少了一次图片的网络请求
        // 否则用file-loader产生真实的图片
        use:{
          loader: 'url-loader',
          options:{
            limit:1,
            outputPath:'/img/', // 设置文件夹
            publicPath:'http://www.zhufengpeixun.cn' // 给图片加前缀，图片放在cdn上
          }
        }
      },
      {
        test:/\.js$/, // normal 普通的loader
        use:{
          loader:'babel-loader',
          options:{ // 用babel-loader 需要把es6-es5
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
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