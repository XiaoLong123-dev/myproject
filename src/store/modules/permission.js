// vuex的权限模块
import { constRoutes, asyncRouter } from "@/router/index";
// vuex中的permission模块用来存放当前的 静态路由 + 当前用户的 权限路由
const state = {
  routes: constRoutes, //  每个人默认拥有静态路由
};

const mutations = {
  // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
  setRoutes(state, newRoutes) {
    // 错误写法（逻辑错误）
    // state.routes = [...state.routes, ...newRoutes]
    // 有一种情况  张三 登录 获取了动态路由 追加到路由上  李四登录 4个动态路由
    // 应该是每次更新 都应该在静态路由的基础上进行追加
    state.routes = [...constRoutes, ...newRoutes];
  },
};

const actions = {
  filterRoutes(context, menus) {
    // 筛选权限路由
    // 第二个参数为当前用户的所拥有的菜单权限
    // menus: ["settings","permissions"]
    // asyncRoutes是所有的动态路由
    // 用户登录传来的路由权限与动态路由作比较，如果一致则提交到nutations
    let routes = [];
    //   筛选出 动态路由中和menus中能够对上的路由
    menus.forEach((item) => {
      // item 就是标识
      // asyncRoutes 找 有没有对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
      routes.push(...asyncRouter.filter((i) => i.children[0].name == item));
      // 得到一个数组 有可能 有元素 也有可能是空数组
    });
    // 得到的routes是所有模块中满足权限要求的路由数组
    // routes就是当前用户所拥有的 动态路由的权限
    context.commit("setRoutes", routes);
    // 这里为什么还要return  state数据 是用来 显示左侧菜单用的  return  是给路由addRoutes用的
    return routes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
