## 知识点汇总
1. noParse: /jquery/, // 不去解析jquery中的依赖库 提升打包速度
2. rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        include: path.resolve('src'), // 包含
3. plugins:[
     new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略掉moment中的locale语言包（有需要需手动引入）
    ]
4. 动态链接库 DllPlugin 先把打包后的结果存好（不会变的模块），《script》中直接用。改代码后 react也不需要再重新打包，快且小
5. 多线程打包 happypack中使用babel，适用于复杂项目，否则会适得其反
6. webpack自带的优化
    1）tree-shaking  把没用到的代码自动删除掉 （仅限 import）
    2）scope hosting 作用域提升 简化代码
7. 抽取公共代码 common vendor
8. 懒加载 @babel/plugin-syntax-dynamic-import
9. 热更新