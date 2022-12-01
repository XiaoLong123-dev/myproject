<template>
  <!-- 每个模块的头部 -->
  <el-row type="flex" justify="space-between">
    <el-col>
      <!-- 左侧结构  -->
      <i :class="icon" style="padding-right: 5px"></i>
      <span>{{ name }}</span>
    </el-col>

    <el-col :span="5">
      <!-- 右侧结构 -->
      <el-row type="flex" justify="end">
        <el-col>负责人</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus"
                >添加子部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ContainerHeader",
  props: {
    name: {
      type: String,
      default: "首页",
    },
    icon: {
      type: String,
      default: "el-icon-office-building",
    },
  },
};
</script>

<style>
</style>