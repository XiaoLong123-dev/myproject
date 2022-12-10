// 全局自定义组件的注册
import PageTool from "./PageTool";
import Pagination from "./Pagination";
import UploadExcel from "./UploadExcel";
import imageUpload from "./imageUpload";
export default {
  // vue.use()的时候会调用里面的install(v)方法,而install方法的参数v就是vue实例
  install(Vue) {
    Vue.component("PageTool", PageTool);
    Vue.component("Pagination", Pagination);
    Vue.component("UploadExcel", UploadExcel);
    Vue.component("imageUpload", imageUpload);
  },
};
