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
        let result = await store.dispatch("user/getUserInfo");
        // 这里可以拿到用户的路由权限信息
        console.log(result);
        // 筛选用户的可用路由
        // actions中函数 默认是Promise对象 调用这个对象 想要获取返回的值话 必须 加 await或者是then
        // actions是做异步操作的
        let routes = await store.dispatch(
          "permission/filterRoutes",
          result.roles.menus
        );
        // console.log(routes);
        // 因为返回的数据是以数组的方式存储的，而addRoute直接使用routes会报错，所以我遍历拿到其中的所有路由对象
        for (var i = 0; i < routes.length; i++) {
          router.addRoute(routes[i]); // 添加动态路由到路由表  铺路
          if (i == routes.length - 1) {
            /* 
            我们发现在页面刷新的时候，本来应该拥有权限的页面出现了404，这是因为404的匹配权限放在了静态路由，
            而动态路由在没有addRoutes之前，找不到对应的地址，就会显示404，所以我们需要将404放置到动态路由的最后
            */
            router.addRoute({
              path: "*",
              redirect: "/404",
              hidden: true,
            });
          }
        }
        // router.addRoute(...routes);

        console.log(to.path);
        // routes就是筛选得到的动态路由
        // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
        // addRoutes  必须 用 next(地址) 不能用next()
        // 添加完动态路由之后
        // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
        next(to.path);
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
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
