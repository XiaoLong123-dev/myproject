// 公司设置管理

import request from "@/utils/request";

// 角色管理
// 获取全部角色列表
// params
// page	是	1	页码
// pagesize	是	10	每页条数
export const getRoleList = (params) => {
  return request({
    url: "/sys/role",
    params,
  });
};
