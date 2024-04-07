let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: { home: './src/index.js', },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
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
  resolve:{ // 解析 第三方包(没写路径的) common
    modules:[path.resolve('node_modules')], // 先去 node_modules中找
    extensions:['.js','.css','.json','.vue'], // 自动添加文件后缀
    // mainFields:['style','main']  // 指定查找顺序 先去找style文件再去找main

    // mainFiles:[], // 指定入口文件的名字 index.js  

    // alias:{ // 别名 vue -> vue.runtime  就可直接 import 'vue';
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }
  },
  devServer:{
    //3) 有服务端 不想用代理来处理 能不能在服务端中启动webpack端口 用服务端端口（前后端使用一个端口）
    
    //2） 我们前端只想单纯来模拟数据
    // before(app){ // 提供的方法 钩子
    //   app.get('/user',(req,res)=>{
    //     res.json({name:'珠峰架构-before'})
    //   })
    // }

    // 1）
    // proxy:{ // 重写的方式 把请求代理到express服务器上
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{'/api':''}  // 重写url,去掉/api,发给服务端sever.js正确的url
    //   }// 配置了一个代理
    // }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ]
}