let path = require('path');
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path: path.resolve(__dirname,'dist')
  },
  resolveLoader:{ // 解析 路径 
    modules:['node_modules',path.resolve(__dirname,'loaders')] //node_modules下没有就去 loaders 下
    // 别名
    // alias:{
    //   loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
    // }
  },
  devtool:'source-map',
  watch:true,
  module:{
    rules:[
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.jpg$/,
        // file-loader目的就是根据图片生成一个md5发射到dist目录下，还会返回当前的图片路径
        // url-loader: base64 or file-loader
        use: {
          loader: 'url-loader',
          options:{
            limit:20*1024
          }
        }
      },
      {
        test:/\.js$/,
        use:{ /**珠峰*/
          loader: 'banner-loader', // 自定义 loader
          options:{
            text:'珠峰cfm',
            filename:path.resolve(__dirname,'banner.js')
          }
        }
      }
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'babel-loader',
      //     options:{
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // }
    ]




    //  1）loader的分类 pre 在前面的  post 在后面  normal
    // loader的顺序 pre + normal + inline + post
    // rules:[ // loader的顺序问题 从右向左 从下到上
    //   {
    //     test:/\.js$/,
    //     use:{
    //       loader:'loader1'
    //     },
    //     enforce:'pre'
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader2'
    //     }
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader3'
    //     },
    //     enforce: 'post'
    //   }
    //   // {
    //   //   test:/\.js$/,
    //   //   use:['loader3','loader2','loader1']
    //   // }
    // ]

  }
}