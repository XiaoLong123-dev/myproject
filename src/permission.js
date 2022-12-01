// 路由权限管理

import router from "@/router/index";
import store from "@/store/index";
// 进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 定义路由的白名单
const whiteList = ["/login", "/404"];

// 前置守卫
router.beforeEach(async (to, form, next) => {
  // 开启进度条
  nprogress.start();

  // 获取token
  const token = store.getters.token;
  //   判断token是否存在
  // 只有在token存在的时候才获取用户信息

  if (token) {
    // 如果token存在
    // 判断是否去登录页
    if (to.path == "/login") {
      // 已经有token了，直接跳转到主页
      next({ path: "/" });
    } else {
      // 获取用户信息
      // 只有在放行的时候才去获取用户资料
      // 判断vuex中是否已经存储了用户的信息
      if (!store.getters.userId) {
        await store.dispatch("user/getUserInfo");
        // 如果后续需要根据用户的资料获取数据 这里必须是同步
      }
      next();
    }
  } else {
    // 如果token不存在
    // 是否去不需要权限的页面，如404
    if (whiteList.indexOf(to.path) > -1) {
      // 要去的地址在白名单
      next();
    } else {
      next("/login");
    }
  }
  // 关闭进度条--为了解决手动切换地址时进度条不关闭的问题
  nprogress.done();
});

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done();
});
