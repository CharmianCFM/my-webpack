let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
// 模块 happypack 可以实现多线程来打包 进程
let Happypack = require('happypack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库 提升打包速度
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        include: path.resolve('src'), // 包含
        use: 'Happypack/loader?id=js'
      },
      {
        test: /\.css$/,
        use: 'Happypack/loader?id=css'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Happypack({ 
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
    new Happypack({  // 用法不同
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react' // 解析 jsx 语法
          ]
        }
      }]
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略掉moment中的locale语言包（有需要需手动引入）
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}