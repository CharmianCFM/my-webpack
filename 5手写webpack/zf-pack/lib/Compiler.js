let fs = require('fs');
let path = require('path');

let babylon = require('babylon');
let t = require('@babel/types');
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
// babylon 主要就是把源码 转换成ast
// @babel/traverse 遍历
// @babel/types 替换
// @babel/generator 生成

let ejs = require('ejs');
let {SyncHook} = require('tapable');

class Compiler {
  constructor(config) {
    // entry output
    this.config = config;
    // 1 需要保存入口文件的路径
    this.entryId; // './src/index.js'
    // 2 需要保存所有的模块依赖
    this.modules = {};
    this.entry = config.entry; // 入口路径
    // 工作路径
    this.root = process.cwd();

    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPulgins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }
    // 如果传递了plugins参数
    let plugins = this.config.plugins;
    if(Array.isArray(plugins)){
      plugins.forEach(plugin => {
        plugin.apply(this); // this是Compiler
      });
    }
    // 触发钩子afterPulgins
    this.hooks.afterPulgins.call();
  }

  // 读取源码
  getSource(modulePath) { // ./index.less
    let rules = this.config.module.rules;
    let content = fs.readFileSync(modulePath, 'utf8');

    // 拿到每个规则来处理
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) { // 模块匹配上说明 这个模块需要通过loader来转化
        function normalLoader() {
          // loader获取对应的loader函数
          let loader = require(use[len--]);
          // 递归调用loader 实现转化功能
          content = loader(content);
          if(len >= 0){
            normalLoader();
          }
        }
        normalLoader();
      }
    }

    return content
  }

  // 解析源码  https://astexplorer.net/
  parse(source, parentPath) { // AST解析语法树 用 babel
    let ast = babylon.parse(source);
    let dependencies = [];// 依赖的数组
    traverse(ast, {
      CallExpression(p) { //  a() require() 调用表达式
        let node = p.node; // ast上对应的节点
        if (node.callee.name === 'require') { // 找到require方法
          node.callee.name = '__webpack_require__'; //  1 改 require 名字
          let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字 "./a"
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // 补后缀
          moduleName = './' + path.join(parentPath, moduleName); 'src/a.js' // 加上父路径
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)]; // 2 改引用的模块的名字/路径
        }
      }
    });
    let sourceCode = generator(ast).code; // 新的源码
    return { sourceCode, dependencies }
  }

  // 构建模块modules
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容 value
    let source = this.getSource(modulePath);
    // 相对路径key   模块id modulePath  = modulePath- this.root  src/index.js
    let moduleName = './' + path.relative(this.root, modulePath); // ./src/index.js
    if (isEntry) {
      this.entryId = moduleName; // 保存入口的名字
    }

    // 解析 需要把source源码进行改造 返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName)); // path.dirname(moduleName)取当前模块的父路径./src

    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode;

    dependencies.forEach(dep => { // 附属模块的加载 递归加载
      this.buildModule(path.join(this.root, dep), false); //参数： 绝对路径和 false非入口
    });
  }

  emitFile() { // 发射文件
    // 用数据渲染我们的ejs
    // 拿到输出到哪个目录下 输出路径
    let main = path.join(this.config.output.path, this.config.output.filename);
    // 模板的路径 npm i ejs 读取 main.ejs
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    // 渲染 ejs
    let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules });
    this.assets = {}
    // 资源中 路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    // 触发钩子run
    this.hooks.run.call();
    // 执行 并且创建模块的依赖关系
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    // console.log(this.modules, this.entryId);
    // 触发钩子afterCompile
    this.hooks.afterCompile.call();
    // 发射一个文件 打包后的文件
    this.emitFile();
    // 触发钩子emit、done
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}
module.exports = Compiler