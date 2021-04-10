//设置基础字号
const baseSize = 16;
//设置基本缩放比
let scaleRate = 1;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 3840;
  scaleRate = scale;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

export default scaleRate;