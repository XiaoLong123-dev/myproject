<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部工具栏 -->
      <PageTool :showBefore="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button type="primary" @click="$router.push('/import')"
            >excel导入</el-button
          >
          <el-button type="success" @click="exportdata">excel导出</el-button>
          <el-button type="info" @click="addemployee">新增员工</el-button>
        </template>
      </PageTool>
      <el-card>
        <!-- 表格 -->
        <!-- 在列中设置sortable属性即可实现以该列为基准的排序，
      接受一个Boolean，默认为false。可以通过 Table 的default-sort属性设置默认的排序列和排序顺序。 -->
        <el-table
          :data="employeelist"
          v-loading="loading"
          border
          style="width: 100%"
          :default-sort="{ prop: 'index', order: 'descending' }"
        >
          <el-table-column label="序号" sortable="" type="index" width="80px" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <!--  对当前列的进行格式化 -->
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- 作用域插槽 利用过滤器格式化时间-->
            <template slot-scope="{ row }">{{
              row.timeOfEntry | formatDate
            }}</template>
          </el-table-column>
          <!-- 在职状态 <el-table-column label="账户状态" sortable="" prop="enableState" /> -->
          <el-table-column label="手机" sortable="" prop="mobile" />
          <el-table-column label="操作" fixed="right" width="280">
            <!-- 利用作用域插槽获取用户的信息 -->
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRole(row)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="delEmployees(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <!-- 分页 -->
          <Pagination
            :total="page.total"
            :currentpage="page.page"
            :pagesize="page.size"
            @changepages="changepages"
          ></Pagination>
        </el-row>
      </el-card>
    </div>
    <!--弹层组件 -->
    <addEmployees
      :isshow.sync="isshow"
      @updateemployees="updateemployees"
    ></addEmployees>
    <!-- 角色弹层 -->
    <AssignRole
      :showDialog.sync="showDialog"
      :userId="userId"
      ref="assign"
    ></AssignRole>
  </div>
</template>

<script>
// 对聘用形式的解释
import EmployeeEnum from "@/api/constant/employees.js";
import { getEmployeesList, delEmployees } from "@/api/employees";
import addEmployees from "./components/addEmployees.vue";
// 引入时间处理函数
import { formatDate } from "@/utils/filters";
import AssignRole from "./components/assignRole.vue";
export default {
  components: { addEmployees, AssignRole },
  data() {
    return {
      // 员工列表
      employeelist: [],
      // 分页器
      page: {
        page: 1,
        size: 1,
        total: 10,
      },
      // loading效果
      loading: false,
      // 对话框的控制
      isshow: false,
      // 显示角色的对话框
      showDialog: false,
      // 用于记录角色的id
      userId: "",
    };
  },
  methods: {
    // 发送请求获取员工列表
    async getEmployeesList(pages) {
      let page = pages ? pages : this.page;
      this.loading = true;
      let result = await getEmployeesList(page);
      if (result.success) {
        this.page.total = result.data.total;
        this.employeelist = result.data.rows;
        console.log(this.employeelist);
        this.loading = false;
      }
    },

    // 分页组件改变页码的回调
    changepages(pages) {
      this.page.page = pages.page;
      this.page.size = pages.pagesize;
      this.getEmployeesList(this.page);
    },

    // 对聘用形式进行格式化处理
    formatEmployment(row, column, cellValue, index) {
      // row 当前行的信息
      // colum 当前列的属性
      // cellValue 列的值
      // 1 表示正式 2 表示非正式
      let result = EmployeeEnum.hireType.find((item) => item.id == cellValue);

      // 返回值将呈现在页面上
      return result ? result.value : "未知";
    },

    // 根据id删除角色
    async delEmployees(row) {
      // console.log(row);
      // trycatch可以捕获取消
      try {
        let oldpage = this.page.page;
        let oldsize = this.page.size;
        await this.$confirm("确定要删除？");
        await delEmployees(row.id);
        this.$message.success("删除成功");
        // 更新page
        this.page = { page: oldpage - 1, size: oldsize };
        // 有问题
        this.getEmployeesList(this.page);
      } catch (error) {
        console.log(error);
      }
    },

    // 新增员工
    addemployee() {
      this.isshow = true;
    },

    // 添加成功重新更新数据
    updateemployees() {
      this.getEmployeesList();
    },

    // excel导出
    async exportdata() {
      // let datas = this.changeexcel();
      // console.log(datas);
      // console.log(this.excelheader());

      // 表头的数据，决定表格的顺序
      const headers = {
        姓名: "username",
        入职日期: "timeOfEntry",
        手机号: "mobile",
        密码: "password",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };

      // 调用接口获取全部的员工数据
      let result = await getEmployeesList({ page: 1, size: this.page.total });
      // console.log(result);
      let datas = this.excelData(headers, result.data.rows);

      // 复杂表头的导出(有两个表头)
      // 必要参数multiHeader 复杂表头的部分，merges 需要合并的部分
      // multiHeader [[其中有几个[]就是有几行表头],[],[]]
      const multiHeader = [["姓名", "主要信息", "", "", "", "", "", "部门"]];
      // merges 合并单元格
      const merges = ["A1:A2", "B1:G1", "H1:H2"];

      // 利用懒加载
      import("@/vendor/Export2Excel.js").then((excel) => {
        // excel 为导出的对象
        excel.export_json_to_excel({
          // 表头["",""]  表头必须是中文
          // header: this.excelheader(),

          header: Object.keys(headers),

          // 数据，与表头对应，[[],[]]  对数据进行转化，并与表头对应
          data: datas,

          // 导出的文件名 filename
          filename: "员工表",

          // 复杂表头
          multiHeader,
          merges,
        });
      });
    },

    // // 表头的数据----用于导出excel
    // excelheader() {
    //   //    建立一个中英对照表
    //   const userRelations = {
    //     id: "id",
    //     timeOfEntry: "入职日期",
    //     mobile: "手机号",
    //     username: "姓名",
    //     password: "密码",
    //     formOfEmployment: "聘用形式",
    //     correctionTime: "转正日期",
    //     workNumber: "工号",
    //     departmentName: "部门",
    //     staffPhoto: "头像",
    //   };
    //   let arr = [];
    //   // 将表头的英文对应成中文
    //   this.employeelist.forEach((item) => {
    //     Object.keys(item).forEach((key) => {
    //       arr.push(userRelations[key]);
    //     });
    //   });
    //   // console.log(arr);
    //   return arr;
    // },

    // 收集员工具体数据----用于导出excel
    // changeexcel() {
    //   // 对data数据进行处理
    //   let newdata = this.employeelist.map((item) => {
    //     // console.log(item);
    //     let arr = [];
    //     Object.keys(item).forEach((key) => {
    //       // console.log(key);
    //       arr.push(item[key]);
    //     });
    //     return arr;
    //   });
    //   // console.log(newdata);
    //   return newdata;
    // },

    // excel导出，整理员工数据变为二维数组,并与表头一一对应，返回一个二重数组
    excelData(headers, data) {
      // headers 表头的中英对照，data  所有的员工数据
      return data.map((item) => {
        // item  每一条员工数据
        return Object.keys(headers).map((key) => {
          // key 是中文  headers[key] 是英文
          // item[headers[key]]  是当前key对应的数据，可以做到导出时hearders与data相对应

          if (
            headers[key] == "timeOfEntry" ||
            headers[key] == "correctionTime"
          ) {
            // 对时间格式进行处理
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            // 对招聘形式做格式化处理
            let obj = EmployeeEnum.hireType.find(
              (o) => o.id == item[headers[key]]
            );
            return obj ? obj.value : "未知";
          }
          return item[headers[key]];
        });
      });
    },

    // 点击角色，显示角色弹层
    async showRole(row) {
      this.userId = row.id;
      // 调用父组件的方法，获取当用户的角色值
      // 此时，对话框中的选中状态再切换时会闪烁，让下面的代码先执行，然后再执行显示弹层代码
      await this.$refs.assign.getUserDetailById(row.id);
      // 显示弹层
      this.showDialog = true;
    },
  },

  mounted() {
    // 发送请求获取员工列表
    this.getEmployeesList();
  },
};
</script>

<style>
</style>