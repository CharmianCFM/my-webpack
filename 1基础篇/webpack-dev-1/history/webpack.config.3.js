// 处理 js、第三方库
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    // new webpack.ProvidePlugin({ // 在每个模块中都注入$， window.$就访问不到了
    //     $:'jquery'
    // })
  ], 
  externals: {   // <script>标签引入无需打包
      jquery: "$"  
  },
  module: { 
    rules: [
      // {
      //   test:require.resolve('jquery'), // expose-loader: 引用jquery的时候把它变成一个全局变量$
      //   use:'expose-loader?$'  // 暴露$为全局变量，window.$
      // },
      
      // loader 默认 是从右边向左执行 从下到上
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'eslint-loader', // 规则在.eslintrc.json中配置
      //     options:{
      //        enforce:'pre' // 修改执行顺序 previous跑到下面的normal loader之前执行， 也可设置post
      //     }
      //   }
      // },
      {
        test:/\.js$/, // normal 普通的loader
        use:{
          loader:'babel-loader',
          options:{ // 用babel-loader 需要把es6-es5
            presets:[
              '@babel/preset-env' 
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }], // 处理class装饰器
              ["@babel/plugin-proposal-class-properties", { "loose": true }], // class类属性
              "@babel/plugin-transform-runtime" // generator (es7)
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