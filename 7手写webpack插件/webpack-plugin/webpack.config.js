let path = require('path');
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
let UploadPlugin = require('./plugins/UploadPlugin');
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
    rules:[
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader']}
    ]
  },
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath:'http://img.fullstackjavascript.cn/' // 服务器的地址 给资源加前缀
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new FileListPlugin({ // 统计生成的文件
      filename:'list.md'
    }),
    // new InlineSourcePlugin({ // 把js和link换成内联的
    //   match:/\.(js|css)/
    // })
    new UploadPlugin({ // 打包完成后自动上传到服务器
      bucket:'jwstatic', 
      domain: "img.fullstackjavascript.cn", 
      accessKey:'uimQ1Inof5KwcA5ETlLMnwoJzrIhigEEilWMpJtg', 
      secretKey:'zNoP0z1XzHFGN0JMJsxSEvLRcFPXxAVaXEDWOwdH'
    })
  ]
}