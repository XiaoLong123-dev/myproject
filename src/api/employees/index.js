// 员工相关的请求
import request from "@/utils/request";

// 获取员工的简单列表---用于选择负责人
export const getSimpleUser = () => {
  return request({
    url: "/sys/user/simple",
  });
};
