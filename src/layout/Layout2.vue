<template>
  <div class="home">
    <el-row type="flex">
      <!-- 左侧导航栏 -->
      <el-col :span="part">
        <div class="left">
          <!-- logo -->
          <img src="~@/assets/common/logo.png" alt="" srcset="" />

          <!-- 左侧导航栏 -->
          <!-- <SideBar :isCollapse="isCollapse"></SideBar> -->

          <!-- 测试 -->
          <SideBar :isCollapse="isCollapse" :tree="routes"></SideBar>
        </div>
      </el-col>
      <!-- 导航栏结束 -->

      <!-- 右侧头部 -->
      <!-- 不写:span="20"会自动计算剩余部分 -->
      <el-col>
        <div class="right">
          <!-- 控制导航栏的显示或隐藏 -->
          <div class="hideOrDisplay" @click="hideOrDisplay">
            <transition-group name="myIcon">
              <i
                class="el-icon-s-fold"
                v-if="!isCollapse"
                key="el-icon-s-fold"
              ></i>
              <i class="el-icon-s-unfold" key="el-icon-s-unfold" v-else></i>
            </transition-group>
          </div>

          <!-- 头部面包屑部分 -->
          <TagsView></TagsView>
        </div>

        <!-- 内容区域 -->
        <div class="content">
          <router-view></router-view>
        </div> </el-col
    ></el-row>
  </div>
</template>


<script>
import SideBar from "@/layout/components/SideBar/SideBar.vue";
import TagsView from "@/layout/components/TagsView";
export default {
  name: "Layout",
  components: { SideBar, TagsView },
  data() {
    return {
      // // 路由信息
      // matcheds: [],
      // 导航栏是否折叠
      isCollapse: false,
      // 导航栏在layout布局中占几份
      part: 4,
      // // 默认头像
      // defaultImage: require("@/assets/common/head.jpg"),

      // 路由表
      routes: [],
    };
  },

  // computed: {
  //   ...mapGetters(["name", "staffPhoto"]),
  //   // 对图片进行处理
  // },

  // methods: {
  //   ...mapActions(["user/getUserInfo", "user/loinout"]),
  //   // 打开导航栏
  //   // handleOpen(key, keyPath) {
  //   // console.log(this.$route);
  //   // console.log(key, keyPath);
  //   // },
  //   // 关闭导航栏
  //   // handleClose(key, keyPath) {
  //   //   console.log(key, keyPath);
  //   // },

  //   // 点击下拉菜单的事件
  //   handleCommand(command) {
  //     // 点击登录
  //     if (command == "login") {
  //       this.$router.push("/login");
  //     }
  //     // 点击退出登录
  //     if (command == "loginout") {
  //       // 删除token和用户信息
  //       this["user/loinout"]();
  //       // 跳转到登录
  //       this.$router.push("/login");
  //     }
  //   },

  // 控制左侧导航栏的折叠
  // hideOrDisplay() {
  //   if (this.isCollapse) {
  //     this.isCollapse = false;
  //     this.part = 4;
  //   } else {
  //     this.isCollapse = true;
  //     this.part = 1;
  //   }
  // },
  // },

  created() {
    this.getRoutes();
  },
  mounted() {},

  methods: {
    hideOrDisplay() {
      if (this.isCollapse) {
        this.isCollapse = false;
        this.part = 4;
      } else {
        this.isCollapse = true;
        this.part = 1;
      }
    },
    getRoutes() {
      // 获取所有路由表
      this.routes = this.$router.options.routes;
      console.log(this.$router.options.routes);
    },
  },

  mounted() {
    // console.log(this.staffPhotoes);
  },

  // // 检测路由的变化，同步面包屑
  // watch: {
  //   $route: {
  //     handler() {
  //       if (this.$route.matched.length > 0) {
  //         // this.matcheds = this.$route.matched.filter(
  //         //   (item) => item.name && item.name != "首页"
  //         // );
  //         this.matcheds = this.$route.matched;
  //         // console.log(this.$route.matched);
  //       }
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
};
</script>

<style lang="less" >
.home {
  // 超出部分滚动，但是去除滚动条
  // overflow-x: hidden;
  // overflow-y: scroll;
  .left {
    height: 100vh;
    background-color: #46a3ff;
    overflow: hidden;
    // /deep/ .el-icon-arrow-down:before {
    //   color: white;
    // }
    // .el-menu-vertical-demo {
    //   height: 100%;
    // }
    // img {
    //   width: 100%;
    // }
  }
  .right {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 8vh;
    border-bottom: 1px solid #e0e0e0;
    background-color: #46a3ff;
    .hideOrDisplay {
      position: absolute;
      left: 10px;
      top: 17px;
      font-size: 26px;
    }
  }
  .content {
    width: 100%;
    height: 92vh;
    padding-left: 10px;
    overflow: hidden;
    padding: 10px;
  }
}
</style>