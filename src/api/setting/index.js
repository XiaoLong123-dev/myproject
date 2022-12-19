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

/**
 * 删除角色
 * @param {*} id 用户id
 * @returns
 */
export const deleteRoleById = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: "delete",
  });
};

/**
 * 根据id获取角色详情
 * @param {*} id
 * @returns
 */
export const getroleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`,
  });
};
/**
 * 根据Id修改角色信息
 * @param {*} id
 * data:{
 * companyId	string	必须		公司id	
   description	string	必须		描述	
   id	string	必须		标识	
   name	string	必须		角色名称	
   permIds	string []	必须		权限点数据	
   item 类型: string
 * }
 * @returns
 */
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: "put",
    data,
  });
};

/**
 * 新增角色功能
 * @param {} data{name,des}
 * @returns
 */
export const addRoles = (data) => {
  return request({
    url: "/sys/role",
    method: "post",
    data,
  });
};

/****
 * 给角色分配权限
 * data{id:角色id,permIds:权限id}
 */
export function assignPerm(data) {
  return request({
    url: "/sys/role/assignPrem",
    method: "put",
    data,
  });
}
