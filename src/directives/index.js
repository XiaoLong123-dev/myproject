// 自定义指令

export const imageerror = {
  // 指令对象,会在当前的dom元素插入到结点之后执行
  inserted(dom, options) {
    //   图片异常的逻辑
    //  监听img标签的错误事件  因为图片加载失败 会触发  onerror事件
    dom.src = dom.src || options.value;

    // options是 指令中的变量的解释  其中有一个属性叫value
    // dom 表示当前指令作用的dom对象
    // dom 认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候会报错 会触发图片的一个事件=>error
    dom.onerror = function () {
      // console.log("error");
      // 当图片出现异常的时候 会降指令配置的默认图片设置为该图片的内容
      // dom 可以注册error事件
      // options.value 默认图片
      dom.src = options.value;
    };
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value;
  },
};
