import React from 'react';
import {render} from 'react-dom';

render(<h1>jsx1</h1>, window.root) //window.root是 html中的 div id='root'




// import jquery from 'jquery';
// import moment from 'moment'; // import moment就会自动引入它的locale语言包，很大，需忽略

// // 手动引入所需要的语言（被webpack.IgnorePlugin忽略掉了）
// import 'moment/locale/zh-cn'

// // 设置语言
// moment.locale('zh-cn');

// let r = moment().endOf('day').fromNow();   
// console.log(r);