<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="right-top">
      <el-breadcrumb-item
        :to="item.path"
        v-for="(item, index) in matcheds"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <!-- 头像信息 -->
    <div class="demo-type">
      <div class="demo-type-img">
        <img
          v-imageerror="defaultImage"
          :src="staffPhoto"
          alt=""
          srcset=""
          @click="showEr(staffPhoto)"
        />
      </div>
      <!-- 姓名 -->
      <div class="demo-type-name">Hi~ {{ name }}</div>
    </div>

    <!-- 下拉菜单 -->
    <el-dropdown class="downselect" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login"> 登录</el-dropdown-item>
        <el-dropdown-item command="giteeaddress">
          <a href="https://gitee.com/" target="_black">项目地址</a>
        </el-dropdown-item>
        <el-dropdown-item command="loginout">退出账号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 弹层组件 -->
    <!-- 点击头像显示二维码 -->
    <el-dialog title="二维码" :visible.sync="showDialog" center>
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// 引入二维码的包
import qrcode from "qrcode";
export default {
  name: "TagsView",
  data() {
    return {
      // 路由信息
      matcheds: [],
      // 默认头像
      defaultImage: require("@/assets/common/head.jpg"),
      // 控制二维码的显示与隐藏
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters(["name", "staffPhoto"]),
    // 对图片进行处理
  },

  methods: {
    ...mapActions(["user/getUserInfo", "user/loinout"]),
    // 打开导航栏
    // handleOpen(key, keyPath) {
    // console.log(this.$route);
    // console.log(key, keyPath);
    // },
    // 关闭导航栏
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },

    // 点击下拉菜单的事件
    handleCommand(command) {
      // 点击登录
      if (command == "login") {
        this.$router.push("/login");
      }
      // 点击退出登录
      if (command == "loginout") {
        // 删除token和用户信息
        this["user/loinout"]();
        // 跳转到登录
        this.$router.push("/login");
      }
    },
    // 显示二维码弹层
    showEr(staffPhoto) {
      // 如果staffPhoto存在再显示弹层
      if (staffPhoto) {
        this.showDialog = true;

        // 页面渲染是异步的，
        this.$nextTick(() => {
          // 此时页面结构已经加载完成
          // 将地址转换为二维码
          // 如果转换的二维码后面信息 是一个地址的话，就会跳转到该地址 否则就会显示内容
          qrcode.toCanvas(this.$refs.myCanvas, staffPhoto);
        });
      } else {
        this.$message.error("该用户还未上传头像");
      }
    },
  },
  mounted() {
    // console.log(this.defaultImage);
  },
  // 检测路由的变化，同步面包屑
  watch: {
    $route: {
      handler() {
        if (this.$route.matched.length > 0) {
          // this.matcheds = this.$route.matched.filter(
          //   (item) => item.meta.title && item.meta.title!= "首页"
          // );
          this.matcheds = this.$route.matched;
        }
        // console.log(this.$route.matched);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="less" >
.right-top {
  line-height: 8vh;
  text-align: center;
  padding-left: 50px;
}
.demo-type {
  display: flex;
  position: absolute;
  right: 40px;
  top: 0;
  .demo-type-img {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    cursor: pointer;
    vertical-align: middle;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .demo-type-name {
    margin-top: 18px;
    padding: 0 10px;
  }
}
.downselect {
  position: absolute;
  top: 20px;
  right: 20px;

  .el-dropdown-link {
    cursor: pointer;
    // color: #409eff;
    color: white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>