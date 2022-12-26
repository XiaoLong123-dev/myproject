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
            <!-- <span>{{ item.meta.title }}</span> -->
            <!--全局挂载i18n之后 每个组件都会有一个$t方法 $t(key)会返回当前语言模式下的语言包显示的内容 -->
            <!-- $t()可以传入带点的字符串 表示查询嵌套结构的值 -->
            <!-- name必须和路由组件 -->
            <span>{{ $t("route." + item.name) }}</span>
          </template>
          <SideBar :tree="item.children"></SideBar>
        </el-submenu>

        <el-menu-item :index="item.path" v-if="!item.children">
          <i :class="item.meta.icon || ''"></i>
          <!-- <span slot="title"> {{ item.meta.title }}</span> -->
          <span slot="title">{{ $t("route." + item.name) }}</span>
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