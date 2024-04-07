1 在 zf-pack 下运行 npm link; 把该模块链接出去
2 在 webpack-dev 下运行 npm link zf-pack, 就可以在 webpack-dev中执行命令：npx zf-pack 执行下面的编译文件 
    "bin": {
        "zf-pack": "./bin/zf-pack.js"
    },



3 编译的目标就是生成./dist/main.js，
    两个关键点：
        入口文件index.js
        所有的模块依赖this.modules = {};