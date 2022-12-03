<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色 -->
            <el-button type="primary" @click="addRole">+ 新增角色</el-button>
            <!-- 角色表格 -->
            <el-table
              :data="list"
              border
              style="width: 100%; margin: 20px 0; text-align: center"
            >
              <el-table-column
                type="index"
                label="序号"
                width="150"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="200"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="300"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                header-align="center"
              >
                <!-- 作用域插槽，可以获取每行的数据 -->
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <el-button type="success" size="medium">分配权限</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="editRole(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleterole(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <Pagination
              :total="total"
              :currentpage="page.page"
              :pagesize="page.pagesize"
              @changepages="changepages"
            ></Pagination>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <!-- alert警告组件 -->
            <el-alert
              title="对公司名称、地址、营业执照、地区的更新,将使的公司资料被重新审核，请谨慎修改"
              type="info"
              style="margin: 10px 0"
              show-icon
              :closable="false"
            >
            </el-alert>
            <!-- 表单 -->
            <el-form
              label-position="right"
              label-width="80px"
              :model="companyForm"
            >
              <el-form-item label="企业名称">
                <el-input disabled v-model="companyForm.name"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled v-model="companyForm.address"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input disabled v-model="companyForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled v-model="companyForm.email"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  v-model="companyForm.remark"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 对话框组件 -->
    <roleDialog
      v-bind:showdialog.sync="showdialog"
      :roleDetail="roleDetail"
      @updateData="getRoleList(page)"
    ></roleDialog>
  </div>
</template>

<script>
import roleDialog from "./components/roleDialog.vue";
import { getRoleList, deleteRoleById, getroleDetail } from "@/api/setting";
export default {
  name: "Setting",
  components: {
    roleDialog,
  },
  data() {
    return {
      // 接受角色列表
      list: [],
      // 总数据条数
      total: 0,
      page: {
        // 放置页码等
        // 当前页
        page: 1,
        // 页面尺寸
        pagesize: 1,
      },
      // element-ui的标签页组件默认激活
      activeName: "first",
      // 控制编辑和添加对话框的显示与隐藏
      showdialog: false,
      // 角色的详细信息
      roleDetail: {},
      // 公司信息
      companyForm: {
        name: "",
        address: "",
        phone: "",
        email: "",
        remark: "",
      },
    };
  },
  methods: {
    // 获取角色列表的方法
    async getRoleList(page) {
      // 是否传入默认值
      let pages = page ? page : this.page;
      let result = await getRoleList(pages);
      if (result.success) {
        this.total = result.data.total;
        this.list = result.data.rows;
      }
    },
    // tabs组件的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页组件的自定义事件
    changepages(pages) {
      // console.log(pages);
      this.page.page = pages.page;
      this.page.pagesize = pages.pagesize;
      this.getRoleList(pages);
    },
    // 删除角色信息
    async deleterole(id) {
      // 提示对话框
      try {
        // console.log(id);
        await this.$confirm("确认删除角色吗");
        // 确认删除
        await deleteRoleById(id);
      } catch (error) {
        // 取消删除
      }
      this.getRoleList();
    },
    // 点击编辑角色信息
    async editRole(value) {
      // 获取角色的详情信息
      let result = await getroleDetail(value.id);
      console.log(result);
      if (result.success) {
        this.roleDetail = result.data;
        // 显示对话框
        this.showdialog = true;
      }
    },
    // 新增角色
    addRole() {
      // 显示对话框
      this.showdialog = true;
    },
  },
  mounted() {
    // 调用方法获取角色列表
    this.getRoleList();
  },
};
</script>

<style>
</style>