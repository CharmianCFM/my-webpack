let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization:{ // 取代了旧的commonChunkPlugins
    splitChunks:{ // 分割代码块
      cacheGroups:{ // 缓存组
        common:{ // 公共的模块 common.js
          chunks: 'initial', // 从入口处就开始抽离
          minSize:0,
          minChunks:2, // 引用两次及以上
        },
        vendor:{ // 第三方模块 vendor.js
          priority: 1, // 提升优先级，先抽第三方模块再抽公共模块
          test: /node_modules/, // 把你抽离出来
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  mode: 'production',
  entry: {
    index:'./src/index.js',
    other:'./src/other.js'
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}