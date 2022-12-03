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
