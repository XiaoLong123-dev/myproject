import Vue from "vue";
import App from "./App.vue";

// 引入样式
import "./style/first.css";
import "./style/index.scss";

// 引入多语言
import i18n from "@/lang";
// 动态决定使用那个语言包
Vue.use(ElementUI, {
  // elementui本身支持i18n的处理
  // i18n此时会根据当前的locale属性去寻找对应的显示内容
  i18n: (key, value) => i18n.t(key),
  // t方法  会去对应的语言包里寻找对应的内容
  // 再改变locale里的内容，就会改变对应的当前语言
});

// 引入mixin
import checkPermision from "@/minxin/checkPermision";
// 检验是否拥有删除用户的权限
Vue.mixin(checkPermision);

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入路由
import router from "./router/index";
// 引入仓库
import store from "./store";
// 引入权限管理
import "@/permission.js";

// 获取所有的自定义指令
import * as directive from "@/directives/index";
// 注册自定义指令
Object.keys(directive).forEach((item) => {
  // console.log(item, directive[item]);
  //  Vue.directive('自定义指令名', directive[item]);
  Vue.directive(item, directive[item]);
});

// 引入全局自定义组件
import Component from "@/components";
Vue.use(Component);

// 引入并注册filter
import * as filters from "@/utils/filters";
Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item]);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
}).$mount("#app");
