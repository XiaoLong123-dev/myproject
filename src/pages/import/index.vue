<template>
  <div>
    <UploadExcel :onSuccess="onSuccess"></UploadExcel>
  </div>
</template>

<script>
import { importEmployees } from "@/api/employees";
export default {
  name: "import",
  data() {
    return {};
  },
  methods: {
    async onSuccess(obj) {
      // {header,results} 转换为英文
      /* 
        username: "",姓名
        mobile: "",手机
        timeOfEntry: "",入职日期
        formOfEmployment: "",聘用形式
        workNumber: "",工号
        departmentName: "",部门
        correctionTime: "",转正日期
    */
      //    建立一个中英对照表
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      //   map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
      let newArr = obj.results.map((item) => {
        // item => {入职日期,姓名,工号,手机号,转正日期}

        let userInfo = {};
        Object.keys(item).forEach((items) => {
          // items => 键值(中文)
          // 对时间进行处理
          if (
            userRelations[items] == "timeOfEntry" ||
            userRelations[items] == "correctionTime"
          ) {
            // 后端接口限制了 不能是字符串 转化为时间格式
            userInfo[userRelations[items]] = new Date(
              this.formatDate(item[items], "/")
            );
          } else {
            // userRelations[items]得到英文的键值
            userInfo[userRelations[items]] = item[items];
          }
        });
        // 记得返回
        return userInfo;
      });

      //   调用接口
      await importEmployees(newArr);
      this.$message.success("导入成功");
      //   回退到之前的页面
      this.$router.back();
    },

    // 对excel的时间进行处理
    // numb 需要处理的时间  format  分隔符
    formatDate(numb, format) {
      // 转化成毫秒
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      //   setFullYear() 方法根据本地时间为一个日期对象设置年份
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style>
</style>