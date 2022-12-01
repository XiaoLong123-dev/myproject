const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    // 代理跨域的配置
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      // 备用地址 http://ihrm.itheima.net/
      // http://ihrm-java.itheima.net/
      "/api": {
        target: "http://ihrm.itheima.net/", // 跨域请求的地址
        changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
      },
    },
  },
  //路径别名的配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  },
});
