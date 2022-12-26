// 多语言

import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookie from "js-cookie";

// 引入element-ui语言包
import elementZH from "element-ui/lib/locale/lang/zh-CN";
import elementEN from "element-ui/lib/locale/lang/en";
// 引入自定义语言包
import myZH from "./zh";
import myEN from "./en";

// 完成全局注册
Vue.use(VueI18n);

export default new VueI18n({
  // i18n的选项
  // cookie中可能存在语言包
  locale: Cookie.get("language") || "en", // 指的是当前的多语言类型 随意定义的字符串
  messages: {
    // 语言包  element-ui语言包 + 自定义语言包
    zh: {
      ...elementZH,
      ...myZH,
    },
    en: {
      ...elementEN,
      ...myEN,
    },
  },
});
