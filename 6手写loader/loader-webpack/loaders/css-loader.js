function loader(source) {
  // return source
  let reg = /url\((.+?)\)/g; // 匹配 url('./public.jpg')
  let pos = 0;
  let current;
  let arr = ['let list = []'];
  while (current = reg.exec(source)) { // [matchUrl, group]
    let [matchUrl, g] = current;
    //console.log(matchUrl, g) // url('./public.jpg')  ./public.jpg
    let last = reg.lastIndex - matchUrl.length; // 前半部分的最后一位的 index
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`); // 前半部分
    pos = reg.lastIndex; // 后半部分的第一位 index
    // 把 g 替换成 require的写法  => url(require('xxx'))
    arr.push(`list.push('url('+require(${g})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`) // 后半部分
  arr.push(`module.exports = list.join('')`);
  // console.log('css-loader', arr.join('\r\n'))
  return arr.join('\r\n');
}

module.exports = loader;