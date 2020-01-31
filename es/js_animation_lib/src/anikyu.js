import Anikyu from './animation.js';

//判断文件是如何引入的，如果是通过模块引入则不在全局暴露Anikyu
window.Anikyu=Anikyu;

export default Anikyu