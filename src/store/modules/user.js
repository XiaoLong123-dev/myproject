import { getToken, setToken, removeToken, setTimeStamp } from "@/utils/auth";
import { login, getUserInfoList, getUserDetailById } from "@/api/user";
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
    return result.data; // 权限管理的时候会用到
  },

  // 登出操作
  loinout(context) {
    // 清除token
    context.commit("RETOKEN");
    // 清除 用户资料
    context.commit("REUSERINFO");
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
