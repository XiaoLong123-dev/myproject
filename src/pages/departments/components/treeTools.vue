<template>
  <!-- 树级结构组件 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧结构  -->
      <i :class="treeNode.icon" style="padding-right: 5px"></i>
      <span>{{ treeNode.name }}</span>
    </el-col>

    <el-col :span="5">
      <!-- 右侧结构 -->
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="add"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-edit"
                command="edit"
                v-show="!treeNode.type"
                >编辑部门</el-dropdown-item
              >

              <el-dropdown-item
                icon="el-icon-delete-solid"
                command="delete"
                v-show="!treeNode.type"
                >删除部门
              </el-dropdown-item>
            </el-dropdown-menu>
            <slot name="dropdown"></slot>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from "@/api/departments";
export default {
  name: "treeTools",
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 下拉菜单的点击事件
    handleCommand(command) {
      // command 判断是 添加add 删除delete 编辑edit
      // console.log(command);
      if (command == "add") {
        // console.log("add");
        // 通知父组件弹出添加部门的表单，并把当前的数据对象传递过去
        this.$emit("showAddDep", this.treeNode);
      } else if (command == "delete") {
        // console.log("delete");
        // 调用elementui的弹框
        this.$confirm("此操作将删除该部门, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            // 删除的回调
            // 调用删除的api
            return delDepartment(this.treeNode.id);
          })
          .then(() => {
            // 如果调用删除接口成功
            // 通知父组件重新获取数据
            this.$emit("deleteDepts");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
      } else {
        // 编辑部门
        this.$emit("editDepts", this.treeNode);
      }
    },
  },
};
</script>

<style>
</style>