class DonePlugin {
  apply(compiler){ // compiler.hooks
    console.log(1)
    compiler.hooks.done.tap('DonePlugin',(stats)=>{
      console.log('编译完成~~~')
    })
  }
}
module.exports = DonePlugin


// 源码 hooks种类
// class Compiler extends Tapable {
// 	constructor(context) {
// 		super();
// 		this.hooks = {
// 			/** @type {SyncBailHook<Compilation>} */
// 			shouldEmit: new SyncBailHook(["compilation"]),
// 			/** @type {AsyncSeriesHook<Stats>} */
// 			done: new AsyncSeriesHook(["stats"]),
// 			/** @type {AsyncSeriesHook<>} */
// 			additionalPass: new AsyncSeriesHook([]),
// 			/** @type {AsyncSeriesHook<Compiler>} */
// 			beforeRun: new AsyncSeriesHook(["compiler"]),
// 			/** @type {AsyncSeriesHook<Compiler>} */
// 			run: new AsyncSeriesHook(["compiler"]),
// 			/** @type {AsyncSeriesHook<Compilation>} */
// 			emit: new AsyncSeriesHook(["compilation"]),
// 			/** @type {AsyncSeriesHook<string, Buffer>} */
// 			assetEmitted: new AsyncSeriesHook(["file", "content"]),
// 			/** @type {AsyncSeriesHook<Compilation>} */
// 			afterEmit: new AsyncSeriesHook(["compilation"]),

// 			/** @type {SyncHook<Compilation, CompilationParams>} */
// 			thisCompilation: new SyncHook(["compilation", "params"]),
// 			/** @type {SyncHook<Compilation, CompilationParams>} */
// 			compilation: new SyncHook(["compilation", "params"]),
// 			/** @type {SyncHook<NormalModuleFactory>} */
// 			normalModuleFactory: new SyncHook(["normalModuleFactory"]),
// 			/** @type {SyncHook<ContextModuleFactory>}  */
// 			contextModuleFactory: new SyncHook(["contextModulefactory"]),

// 			/** @type {AsyncSeriesHook<CompilationParams>} */
// 			beforeCompile: new AsyncSeriesHook(["params"]),
// 			/** @type {SyncHook<CompilationParams>} */