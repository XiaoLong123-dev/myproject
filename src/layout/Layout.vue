<template>
  <div class="home">
    <el-row type="flex">
      <!-- 左侧导航栏 -->
      <el-col :span="part">
        <div class="left" v-show="!isCollapse">
          <!-- logo -->
          <img src="~@/assets/common/logo.png" alt="" srcset="" />

          <!-- 左侧导航栏  -->
          <el-menu
            router
            unique-opened
            :default-active="$route.fullPath"
            :collapse-transition="false"
            class="el-menu-vertical-demo"
            background-color="#46A3FF"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
          >
            <SideBar :tree="routes"></SideBar>
          </el-menu>
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
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </div> </el-col
    ></el-row>
  </div>
</template>


<script>
import SideBar from "@/layout/components/SideBar/SideBar.vue";
import TagsView from "@/layout/components/TagsView";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: { SideBar, TagsView },
  data() {
    return {
      // 导航栏是否折叠
      isCollapse: false,
      // 导航栏在layout布局中占几份
      part: 4,

      // 所有路由表
      // routes: [],

      // 路由动画
      transitionName: "slide-right",
    };
  },

  computed: {
    // 获取每个用户的权限路由
    ...mapGetters(["routes"]),
  },

  methods: {
    hideOrDisplay() {
      if (this.isCollapse) {
        this.isCollapse = false;
        this.part = 4;
      } else {
        this.isCollapse = true;
        this.part = 0;
      }
    },
  },

  mounted() {},
};
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
  width: 100%;
}
.home {
  height: 100%;
  // 超出部分滚动，但是去除滚动条
  // overflow-x: hidden;
  // overflow-y: scroll;

  .left {
    min-height: 760px;
    height: 100%;
    background-color: #46a3ff;
    overflow: hidden;
    // 过度
    // transition: all 1s;
    .el-menu-vertical-demo {
      height: 100%;
    }
    img {
      width: 100%;
    }
  }
  .right {
    position: relative;
    width: 100%;
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
    min-height: 700px;
    padding-left: 10px;
    overflow: hidden;
    // 路由切换添加动画
    .slide-right-enter-active,
    .slide-right-leave-active {
      transition: all 0.5s ease;
    }
    .slide-right-leave-to {
      transform: translateX(100px);
      opacity: 0;
    }
    .slide-right-enter {
      transform: translateX(-100px);
      opacity: 0;
    }
  }
}
</style>