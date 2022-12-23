<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTool :showBefore="true">
        <template v-slot:before><span>薪资管理</span> </template>
        <template v-slot:after>
          <el-button type="primary" @click="$router.push('/salarys/setting')"
            >设置</el-button
          >
        </template>
      </PageTool>

      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="username" label="姓名" width="100" />
          <el-table-column prop="mobile" label="手机" width="130" />
          <el-table-column prop="workNumber" label="工号" width="100" />
          <el-table-column prop="departmentName" label="部门" width="100" />
          <el-table-column prop="timeOfEntry" width="130" label="入职时间">
            <template v-slot:default="obj">
              {{ obj.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="工资基数" width="100">
            <template slot-scope="scope">
              {{ scope.row.currentBasicSalary + scope.row.currentPostWage }}
            </template>
          </el-table-column>
          <el-table-column label="津贴方案" width="100"
            >通用方案</el-table-column
          >
          <el-table-column label="操作" width="160">
            <template slot-scope="scope" style>
              <!-- v-if="
                  scope.row.currentBasicSalary + scope.row.currentPostWage > 0
                " -->
              <el-button
                size="mini"
                type="primary"
                @click="changeSalary('ChangeSalary', scope.row.id)"
                >调薪</el-button
              >
              <el-button type="text" size="mini">
                <router-link
                  :to="`/salarys/details/${yearMonth}/${scope.row.id}`"
                  >查看</router-link
                >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          style="height: 50px"
          align="middle"
        >
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.pageSize"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <!--查看弹框-->
      <el-dialog
        :title="topLabel"
        :visible.sync="centerDialogVisible"
        width="50%"
        left
      >
        <component
          :is="currentComponent"
          :user-salary="selectedSalaryInfo"
          :user-id="selectUserId"
          @success="getSalarysList"
          @onDialogCancel="centerDialogVisible = false"
        />
        <!-- <ChangeSalary
          v-if="seeState == 'changeSalary'"
          :user-salary="selectedSalaryInfo"
          :user-id="selectUserId"
          @onDialogCancel="centerDialogVisible = false"
        />

        <FixedSalary v-if="seeState == 'fixedSalary'" /> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getSalarysList,
  getSalaryDetail,
  getCompanySetting,
} from "@/api/salarys";
import EmployeeData from "@/api/constant/employees";
import { getDepartments } from "@/api/departments";
import ChangeSalary from "./components/change-salary";
export default {
  name: "UsersTableIndex",
  components: { ChangeSalary },
  data() {
    return {
      seeState: "",
      centerDialogVisible: false,
      topLabel: "转正",
      approvalsType: EmployeeData.hireType,
      approvalsState: EmployeeData.workingState,
      department: [],
      subsidyScheme: [],
      list: [],
      departments: [],
      loading: false,
      page: {
        total: 0,
        page: 1,
        pageSize: 10,
      },
      yearMonth: "",
      formData: {
        approvalsTypeChecks: [],
        approvalsStateChecks: [],
        departmentChecks: [],
      },
      selectedSalaryInfo: {},
      selectUserId: null,
      currentComponent: "",
    };
  },
  computed: {},
  created() {
    this.getSalarysList(); // 获取工资
    this.getDepartments(); // 获取组织
  },
  methods: {
    // 对聘用形式进行文本显示
    formatEmployment(row) {
      const data = this.approvalsType.find(
        (item) => item.id === row.formOfEmployment.toString()
      );
      return data ? data.value : "未知";
    },
    async getSalarysList() {
      // 企业的工资设置
      const result = await getCompanySetting();

      this.yearMonth = result.data.dataMonth;
      this.loading = true;
      // 查询用户薪资列表
      // ...this.formData,
      const result2 = await getSalarysList({
        ...this.page,
      });
      // console.log(result2);
      this.list = result2.data.rows;
      this.page.total = result2.data.total;
      this.loading = false;
    },
    // 获取组织列表
    async getDepartments() {
      const result = await getDepartments();
      // console.log(result);
      this.departments = result.data.depts;
    },

    changePage(newPage) {
      this.page.page = newPage;
      this.getSalarysList();
    },
    // 调薪
    async changeSalary(key, userId) {
      this.topLabel = "调薪";
      this.currentComponent = key;
      this.centerDialogVisible = true;
      this.selectUserId = userId;
      let result = await getSalaryDetail(userId);
      // console.log(result);
      this.selectedSalaryInfo = result.data;
    },

    // 查询参数发生变化
    changeParams() {
      this.page.page = 1; // 重置第一页
      this.getSalarysList(); // 重新拉取工资数据
    },
  },
};
</script>
