// 员工相关的请求
import request from "@/utils/request";

// 获取员工的简单列表---用于选择负责人
export const getSimpleUser = () => {
  return request({
    url: "/sys/user/simple",
  });
};

/**
 * 获取员工信息
 * @param {*} params
 * page	是	1	页码
 *  size	是	10	每页条数
 * @returns
 */
export const getEmployeesList = (params) => {
  return request({
    url: "/sys/user",
    params,
  });
};

/**
 * 根据id删除员工
 * @param {*} id
 * @returns
 */
export const delEmployees = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: "delete",
  });
};

/**
 * 新增员工
 * username	string	非必须		姓名	
    mobile	string	非必须		手机号	
    formOfEmployment	number	非必须		聘用形式	
    workNumber	string	非必须		工号	
    departmentName	string	非必须		组织名称	
    timeOfEntry	string	非必须		入职时间	
    correctionTime	string	非必须		转正时间
 * @param {*} data
 * @returns
 */
export const addEmployee = (data) => {
  return request({
    url: "/sys/user",
    method: "post",
    data,
  });
};

/**
 * 导入员工excel
 * @param {*} data 数组
 * @returns
 */
export const importEmployees = (data) => {
  return request({
    url: "/sys/user/batch",
    method: "post",
    data,
  });
};

/** *
 *
 * 保存员工新的账号密码信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: "put",
    data,
  });
}
