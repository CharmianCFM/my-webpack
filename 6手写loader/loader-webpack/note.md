## loader
### 1. 定义
- webpack只能处理 js模块，处理其他类型的文件就需要使用 loader 进行转换。用来将一段代码转换成另一段代码的 webpack加载器。

### 2. 配置
- 2.1 loader的顺序问题 从右向左 从下到上      
    loader的顺序 pre + normal + inline + post      
    ```javascript
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'loader1'
        },
        enforce:'pre'
      }
      // {
      //   test:/\.js$/,
      //   use:['loader3','loader2','loader1']
      // }
    ] 
    ```
- 2.2 查找路径 先去node_modules中找，找不到去./loaders中找    
    ```javascript
    resolveLoader:{
        modules:['node_modules',path.resolve(__dirname,'loaders')]
        // 别名
        // alias:{
        //   loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        // }
    },
    ```
- 2.3 loader 默认是由两部分组成 pitch normal     
    pitch3-pitch2-pitch1-normal1-normal2-normal3  
    pitch中如果有返回值，则会立即停止 pitch3-pitch2（返回值）-normal3  

### 3. 手写 loader     
loader的特点     
第一个 loader 返回 js脚本   
每个 loader 只做一件事，为了是 loader 在更多场景进行链式调用    
每个 loader 都是一个模块   
每个 loader 都是无状态的，确保 loader 在不同模块转换之间不保存状态  

- 3.1 babel-loader
- 3.2 banner-loader
- 3.3 file-loader url-loader
- 3.4 style-loader css-loader less-loader







