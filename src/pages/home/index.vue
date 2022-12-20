<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <div class="top">
        <el-card>
          <el-row type="flex" justify="space-between">
            <el-col class="left">
              <div class="photoes">
                <img :src="$store.state.user.userInfo.staffPhoto" />
              </div>
              <div class="title">
                <p>
                  欢迎，{{ $store.state.user.userInfo.username }},祝你工作顺利
                </p>
                <p>111111111111111111111</p>
              </div>
            </el-col>
            <el-col class="right">
              <el-row type="flex" justify="end">
                <span>
                  <p>56</p>
                  <p>今日测试</p>
                </span>
                <span>
                  <p>56</p>
                  <p>今日测试</p>
                </span>
                <span>
                  <p>56</p>
                  <p>今日测试</p>
                </span>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!-- 内容 -->
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="content-left">
              <!-- 日历 -->
              <div class="calendar">
                <el-card class="box-card">
                  <!-- 卡片标题 -->
                  <div slot="header" class="clearfix">
                    <span>工作日历</span>
                  </div>
                  <!-- 卡片内容 日历组件 -->
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
              </div>
              <!-- 公告 -->
              <div class="notices">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>公告</span>
                  </div>
                  <!-- 公告列表 -->
                  <ul>
                    <li>
                      <div class="item">
                        <img :src="$store.state.user.userInfo.staffPhoto" alt="">
                        <div class="message">
                          <p>xxx 发布了啦啦啦啦啦啦啦啦啦啦啦</p>
                          <p>2022-12-20 18:00</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="content-right">
              <!-- 流程申请 -->
              <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>流程申请</span>
                  </div>
                  <div class="sidenav">
                    <el-button class="sidebtn">加班离职</el-button>
                    <el-button class="sidebtn">请假调休</el-button>
                    <el-button class="sidebtn">审批列表</el-button>
                    <el-button class="sidebtn">我的信息</el-button>
                  </div>

              </el-card>
              <!-- 绩效指数 -->
              <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>绩效指数</span>
                  </div>
                  
                   <!-- 雷达图 -->

              </el-card>
              <!-- 帮助链接 -->
              <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>帮助链接</span>
                  </div>
                  <div class="sidelink">
                  <el-row>
                    <el-col :span="8">
                    <a href="#">
                      <span class="icon iconGuide"></span>
                      <p>入门指南</p>
                    </a></el-col>
                    <el-col :span="8">
                      <a href="#">
                      <span class="icon icnoHelp"></span>
                      <p>在线帮助手册</p>
                    </a></el-col>
                    <el-col :span="8">
                      <a href="#">
                      <span class="icon iconTechnology"></span>
                      <p>联系技术支持</p>
                    </a></el-col>
                  </el-row>
                  </div>

              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.top {
  margin-bottom: 10px;
  .left {
    display: flex;
    margin-top: 15px;

    .photoes {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: middle;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      margin-left: 10px;

      p {
        margin-bottom: 5px;
      }
    }
  }

  .right {
    span {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: red;
      margin: 0 5px;
      text-align: center;
      position: relative;

      p:nth-child(1) {
        position: absolute;
        top: 15px;
        left: 25px;
      }

      p:nth-child(2) {
        position: absolute;
        top: 30px;
        left: 8px;
        font-size: 14px;
      }

      p {
        color: white;
      }
    }
  }
}
.content {
  .content-left {
    .box-card {
      /deep/ .el-card__header {
        padding: 6px 20px !important;
      }
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both;
      }
    }

    .calendar{
      margin-bottom: 10px;
     
    }
    .notices{
      ul{
        list-style-type: none;
        li{
          display: block;
          width: 100%;
          height: 60px;
          border-bottom: 1px solid #ccc;
          .item{
            display: flex;
            img{
             vertical-align: middle;
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .message{
              margin-left:10px;
              p{
                padding: 5px;
              }
            }
          }
        }
      }
    }
  }
  .content-right {
    .box-card {
      /deep/ .el-card__header {
        padding: 6px 20px !important;
      }
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both;
      }
    }
    .sidenav{
      display: flex;
      .sidebtn{
        padding: 5px 10px;
      }
    }

  }
}

// el-card
</style>
