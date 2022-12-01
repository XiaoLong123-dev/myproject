<template>
  <div>
    <!-- @close="handleClose"   @open="handleOpen"
          router  是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
          -->
    <el-menu
      router
      unique-opened
      :collapse-transition="false"
      :default-active="$route.fullPath"
      class="el-menu-vertical-demo"
      background-color="#46A3FF"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/home/home1"> 选项1 </el-menu-item>
          <el-menu-item index="/404">404</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2">
          <template slot="title">选项3</template>
          <el-menu-item index="/home/home2">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-icon-arrow-down:before {
  color: white;
}
.el-menu-vertical-demo {
  height: 100%;
}
img {
  width: 100%;
}
</style>