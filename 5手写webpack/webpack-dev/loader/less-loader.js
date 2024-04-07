let less = require('less');
function loader(source){
  let css = '';
  less.render(source, function (err,c) {
    css = c.css;
  });
  css = css.replace(/\n/g,'\\n'); // 转义变换行
  return css;
}
module.exports = loader