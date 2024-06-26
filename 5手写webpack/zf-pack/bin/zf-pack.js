#! /usr/bin/env node

// 1) 需要找到当前执行命令的路径 拿到webpack.config.js

let path = require('path');
// config配置文件
let config = require(path.resolve('webpack.config.js'));

let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config);

// 触发entryOption钩子执行
compiler.hooks.entryOption.call();

// 运行编译
compiler.run();


