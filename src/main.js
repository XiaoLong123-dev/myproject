import Vue from "vue";
import App from "./App.vue";

// 引入样式
import "./style/first.css";
import "./style/index.scss";

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
}).$mount("#app");
