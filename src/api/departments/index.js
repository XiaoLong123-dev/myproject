// 组织结构的相关请求
import request from "@/utils/request";

// 获取企业的部门列表
export const getDepartments = () => {
  return request({ url: "/company/department" });
};

// 删除组织架构的部门
export const delDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: "delete",
  });
};

// 新增部门
/**
 * 
 * @param {*} data 
 * code	string	非必须		部门编码，同级部门不可重复	
  introduce	string	非必须		介绍	
  manager	string	非必须		负责人名称	
  name	string	非必须		部门名称	
  pid	string	非必须		父级部门ID
 * 
 * 
 * @returns 
 */
export const addDepartment = (data) => {
  return request({
    url: "/company/department",
    method: "post",
    data,
  });
};

// 获取某个部门的详情
export const getDeptsDetail = (id) => {
  return request({
    url: `/company/department/${id}`,
  });
};

// 根据id修改部门详情
export const updateDeptsDetail = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: "put",
    data,
  });
};
