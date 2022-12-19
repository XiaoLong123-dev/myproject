<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <PageTool>
        <template v-slot:after>
          <el-button
            type="primary"
            class="el-icon-edit"
            @click="addpermission(1, '0')"
            >添加菜单</el-button
          >
        </template>
      </PageTool>
      <!-- 树形结构的表格 :data="tableData"-->
      <!-- 当 row 中包含 children 字段时，被视为树形数据。渲染树形数据时，必须要指定 row-key -->
      <el-table border style="width: 100%" :data="list" row-key="id">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="action" label="操作">
          <template v-slot="{ row }">
            <!-- 注意添加按钮只在第一层(type=1)时显示 -->
            <el-button
              type="text"
              size="small"
              v-if="row.type == 1"
              @click="addpermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" size="small" @click="editpermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delpermission(row.id)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>

      <!-- 对话框 -->
      <AddOrEdit
        :showaddoredit.sync="showaddoredit"
        :type="type"
        :pid="pid"
        @updateData="updateData"
        @updateEdit="updateEdit"
        ref="addoredit"
      ></AddOrEdit>
    </div>
  </div>
</template>

<script>
import AddOrEdit from "./components/addOrEdit.vue";
import {
  getPermissionList,
  addPermission,
  updatePermission,
  delPermission,
} from "@/api/permission";
// 引入转换树形结构的方法
import { tranListToTree } from "@/utils";
export default {
  name: "Permission",
  components: { AddOrEdit },
  data() {
    return {
      // 权限列表
      list: [],
      // 控制添加或编辑对话框
      showaddoredit: false,
      // 记录当前的type和pid
      type: 0,
      pid: "",
      // 记录点击编辑的id
      id: "",
      // 把当前的用户详情发给弹框组件
      // olddata: {},
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      let result = await getPermissionList();
      // console.log(result);
      if (result.success) {
        // 根节点是pid=0
        this.list = tranListToTree(result.data, "0");
      }
    },
    // 打开对话框
    // 添加权限
    addpermission(type, pid) {
      // type=1表示访问权 type=2表示按钮操作权
      // pid表示当前数据的父节点的标识
      this.type = type;
      this.pid = pid;
      this.showaddoredit = true;
    },
    // 删除权限
    delpermission(id) {
      // console.log(id);
      this.$confirm("确认删除权限吗")
        .then(() => {
          // 调用接口
          return delPermission(id);
        })
        .then(() => {
          this.$message.success("删除成功");
          // 重新拉取数据
          this.getPermissionList();
        });
    },
    // 添加成功更新页面
    async updateData(formdata) {
      // 发送请求
      // this.$message.success("添加成功");
      await addPermission(formdata);
      // // 更新页面
      this.getPermissionList();
    },
    // 编辑权限
    async editpermission(id) {
      this.id = id;
      console.log(this.$refs.addoredit);
      this.$refs.addoredit.getDetail(id);
      // 此处可以延迟出现
      this.showaddoredit = true;
    },
    // 编辑权限成功
    async updateEdit(data) {
      // 发送请求更新
      await updatePermission(data);
      this.$message.success("更新成功");
      this.getPermissionList();
    },
  },
};
</script>

<style>
</style>