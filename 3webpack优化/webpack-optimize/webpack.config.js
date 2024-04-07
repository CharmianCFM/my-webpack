let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    index:'./src/index.js',
  },
  devServer: {
    hot:true, // 启用热更新
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react' // 解析 jsx 语法
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'  // 懒加载
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
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')  // 见到import react 的时候先去查找这个manifest清单，没有时才去打包react
    // }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.NamedModulesPlugin(), // 热更新 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
}