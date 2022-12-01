<template>
  <div class="siderbar">
    <div v-for="(item, index) in tree" :key="index">
      <!-- hidden=true且该路由又有子路由时 直接递归进入子路由 -->
      <div v-if="item.hidden && item.children">
        <SideBar :tree="item.children"></SideBar>
      </div>
      <div v-if="!item.hidden">
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i :class="item.meta.icon || ''"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <SideBar :tree="item.children"></SideBar>
        </el-submenu>

        <el-menu-item :index="item.path" v-if="!item.children">
          <i :class="item.meta.icon || ''"></i>
          <span slot="title"> {{ item.meta.title }}</span>
        </el-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    // console.log(this.tree);
    // console.log(this.$route.fullPath);
  },
  methods: {
    // mycallback(item) {
    //   console.log(item.path);
    // },
  },
};
</script>

<style lang="less" scoped>
.siderbar {
  /deep/ .el-icon-arrow-down:before {
    color: white;
  }
}
</style>