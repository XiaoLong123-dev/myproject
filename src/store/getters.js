const getters = {
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username, //名称
  userId: (state) => state.user.userInfo.userId, //id
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 头像
};
export default getters;
