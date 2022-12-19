const getters = {
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username, //名称
  userId: (state) => state.user.userInfo.userId, //id
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 头像
  routes: (state) => state.permission.routes,
};
export default getters;
