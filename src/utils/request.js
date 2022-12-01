import axios from "axios";
import { Message } from "element-ui";
// 设置当前最新的时间戳
import { getTimeStamp } from "@/utils/auth";
import store from "@/store";
import router from "@/router/index";
const TimeOut = 3600; // 定义超时时间
const service = axios.create({
  //    设置基础地址
  // 环境变量 npm run dev  /api   /生产环境 npm run build  /prod-api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000, // 认为只要超过5秒钟不响应 就超时
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // config请求配置
    // 检查是否携带token
    if (store.getters.token) {
      // 在token存在的情况下，在判断token是否会超时
      if (isCheckTimeout()) {
        // 已经超时了
        // 清空token
        store.dispatch("user/loinout");
        router.push("/login");

        return Promise.reject(new Error("token超时了"));
      }
      // token 没有超时
      // 如果有token,则把token注入到请求头中
      config.headers["Authorization"] = `Bearer ${store.getters.token}`;
    }
    // 一定要返回config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // axios 默认包裹了一层data
    const { success, data, message } = response.data;
    // 执行成功
    if (success) {
      return { success, data, message };
    } else {
      // 执行失败
      Message.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (err) => {
    Message.error(err.message);
    return Promise.reject(err);
  }
);

// 定义检查时间戳是否超时
function isCheckTimeout() {
  // 获取当前时间戳
  let currentTime = Date.now();
  // 获取缓存的时间戳
  let timeStamp = getTimeStamp();

  return (currentTime - timeStamp) / 1000 > TimeOut;
}

export default service;
