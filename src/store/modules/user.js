import { getToken, setToken, removeToken, setTimeStamp } from "@/utils/auth";
import { login, getUserInfoList, getUserDetailById } from "@/api/user";
import { resetRouter } from "@/router/index";
const state = {
  token: getToken(),
  userInfo: {},
};

const actions = {
  // 获取登陆数据
  async getToken(context, data) {
    let result = await login(data); // 获取token
    // 设置当前时间戳
    setTimeStamp();

    if (result.success) {
      context.commit("GETTOKEN", result.data);
    }
  },

  // 获取用户信息
  async getUserInfo(context, data) {
    let result = await getUserInfoList();

    // 根据id获取用户的详情(包含头像信息)
    let obj = await getUserDetailById(result.data.userId);

    if (result.success) {
      context.commit("GETUSERINFO", { ...result.data, ...obj.data });
    }
    // 返回出去其中有个menu属性，其中有该用户的路由权限
    return result.data; // 权限管理的时候会用到
  },

  // 登出操作
  loinout(context) {
    // 清除token
    context.commit("RETOKEN");
    // 清除 用户资料
    context.commit("REUSERINFO");
    // 还需要清空添加的动态路由
    // 重置路由
    resetRouter();
    // 还有一步  vuex中的数据是不是还在
    // 要清空permission模块下的state数据
    // vuex中 user子模块  permission子模块
    // 子模块调用子模块的action  默认情况下 子模块的context是子模块的 局部的
    // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块 全局的
    context.commit("permission/setRoutes", [], { root: true });
  },
};

const mutations = {
  // 移除token
  RETOKEN(state) {
    state.token = null;
    // 清除缓存
    removeToken();
  },
  // 设置token
  GETTOKEN(state, data) {
    state.token = data;
    // 设置缓存
    setToken(data);
  },
  //获取用户信息
  GETUSERINFO(state, data) {
    state.userInfo = data;
  },
  // 删除用户信息
  REUSERINFO(state) {
    state.userInfo = {};
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
