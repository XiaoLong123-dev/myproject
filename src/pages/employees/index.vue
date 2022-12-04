<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部工具栏 -->
      <PageTool :showBefore="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button type="primary">excel导入</el-button>
          <el-button type="success">excel导出</el-button>
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
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <!-- 利用作用域插槽获取用户的信息 -->
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
  </div>
</template>

<script>
// 对聘用形式的解释
import EmployeeEnum from "@/api/constant/employees.js";
import { getEmployeesList, delEmployees } from "@/api/employees";
import addEmployees from "./components/addEmployees.vue";
export default {
  components: { addEmployees },
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
    };
  },
  methods: {
    // 发送请求获取员工列表
    async getEmployeesList(pages) {
      let page = pages ? pages : this.page;
      this.loading = true;
      let result = await getEmployeesList(page);
      console.log(result);
      if (result.success) {
        this.page.total = result.data.total;
        this.employeelist = result.data.rows;
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

        // if (this.employeelist.length == 0) {
        //   if (this.page.page !== 1) {
        //     this.getEmployeesList({
        //       page: this.page.page - 1,
        //       size: this.page.size,
        //     });
        //   } else {
        //     this.getEmployeesList({
        //       page: this.page.page + 1,
        //       size: this.page.size,
        //     });
        //   }
        // } else {
        //   this.getEmployeesList(this.page);
        // }
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
  },
  mounted() {
    // 发送请求获取员工列表
    this.getEmployeesList();
  },
};
</script>

<style>
</style>