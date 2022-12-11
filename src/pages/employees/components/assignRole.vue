<template>
  <!-- 分配角色 -->
  <el-dialog
    title="分配角色"
    :visible.sync="showDialog"
    :before-close="handlerClose"
  >
    <!-- 多选框 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 循环的选项 -->
      <!-- label 是存储的值,也可以展示 -->
      <el-checkbox :label="item.id" v-for="item in list" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <!-- 按钮 -->
    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="8">
        <el-button @click="" size="medium" @click="cancle">取 消</el-button>
        <el-button type="primary" size="medium" @click="submit"
          >确 定</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 获取全部角色列表
import { getRoleList } from "@/api/setting";
// 获取用户的基本信息
import { getUserDetailById } from "@/api/user";
// 给员工分配角色
import { assignRoles } from "@/api/employees";
export default {
  name: "AssignRole",
  props: {
    // 控制对话框的显示与隐藏
    showDialog: {
      type: Boolean,
      default: true,
    },
    // 角色id
    userId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 所有的角色列表
      list: [],
      //   当前用户拥有的角色
      roleIds: [],
    };
  },
  methods: {
    // 对话框关闭前的回调
    handlerClose() {
      // 清空信息
      this.roleIds = [];
      // 通知父组件关闭弹层
      this.$emit("update:showDialog", false);
    },
    // 取消按钮的回调
    cancle() {
      //   关闭弹层
      this.handlerClose();
    },
    // 确认按钮的回调
    async submit() {
      //   console.log("submit");
      let result = await assignRoles({
        id: this.userId,
        roleIds: this.roleIds,
      });
      if (result.success) {
        this.$message.success("修改角色成功");
      }
      //   关闭弹层
      this.handlerClose();
    },
    // 获取全部角色列表
    async getAllRoleList() {
      let result = await getRoleList({ page: 1, pagesize: 20 }); // 假设不会超过20条数据
      //   console.log(result);
      if (result.success) {
        this.list = result.data.rows;
      }
    },
    // 获取当前用户的基本信息
    // 注意这个方法父组件去调用，props赋值是异步的，所以不能直接使用this.userId赋值
    // 通过函数参数的方式传递
    async getUserDetailById(id) {
      let result = await getUserDetailById(id);
      if (result.success) {
        this.roleIds = result.data.roleIds;
      }
    },
  },
  created() {
    this.getAllRoleList();
  },
};
</script>

<style>
</style>