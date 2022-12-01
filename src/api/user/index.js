// 与用户相关的接口
import request from "@/utils/request";

// 登陆的接口
export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "post",
    data,
  });
};
// 获取用户信息
export const getUserInfoList = () => {
  return request({
    url: "/sys/profile",
    method: "post",
  });
};

// 通过id获取用户的基本信息
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`,
  });
};
