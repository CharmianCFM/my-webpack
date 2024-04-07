// express 写个服务端监听3000端口，监听到user，返回json

// let express = require('express');
// let app = express();

// app.get('/user',(req,res)=>{
//   res.json({name:'珠峰架构1'})
// })

// app.listen(3000);





// 3) 后端和前端启动在一起
let express = require('express');
let app = express();

let webpack = require('webpack');

// 中间件 在服务端启动 webpack 模块
let middle = require('webpack-dev-middleware'); 

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler)); // 启动服务的时候连带着也会启动webpack

app.get('/user',(req,res)=>{
  res.json({name:'珠峰架构1'}) // http://localhost:3000/user即可访问到数据  http://localhost:3000会访问到dist目录
})

app.listen(3000);