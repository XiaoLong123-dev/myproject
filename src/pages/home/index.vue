<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <div class="top">
        <el-card>
          <el-row type="flex" justify="space-between">
            <el-col class="left">
              <div class="photoes">
                <img
                  v-imageerror="defaultImg"
                  :src="$store.state.user.userInfo.staffPhoto"
                />
              </div>
              <div class="title">
                <p>
                  欢迎，{{ $store.state.user.userInfo.username }},祝你工作顺利
                </p>
                <p>
                  {{ $store.state.user.userInfo.username }} |
                  {{ $store.state.user.userInfo.companyName }} |
                  {{ $store.state.user.userInfo.departmentName }}
                </p>
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
                  <WorkCalendar></WorkCalendar>
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
                        <img
                          v-imageerror="defaultImg"
                          :src="$store.state.user.userInfo.staffPhoto"
                          alt=""
                        />
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
                  <span>快捷导航</span>
                </div>
                <div class="sidenav">
                  <el-button class="sidebtn" @click="loginout"
                    >切换账号</el-button
                  >
                  <el-button class="sidebtn"
                    ><a href="https://github.com/XiaoLong123-dev/myproject"
                      >项目地址</a
                    >
                  </el-button>
                  <el-button class="sidebtn"
                    ><router-link
                      :to="`/employees/${$store.state.user.userInfo.id}`"
                      >我的信息</router-link
                    >
                  </el-button>
                  <el-button class="sidebtn">
                    <router-link to="/setting">公司介绍</router-link>
                  </el-button>
                </div>
              </el-card>
              <!-- 绩效指数 -->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>绩效指数</span>
                </div>

                <!-- 雷达图 -->
                <div class="myDiv" ref="myDiv"></div>
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
                      </a></el-col
                    >
                    <el-col :span="8">
                      <a href="#">
                        <span class="icon icnoHelp"></span>
                        <p>在线帮助手册</p>
                      </a></el-col
                    >
                    <el-col :span="8">
                      <a href="#">
                        <span class="icon iconTechnology"></span>
                        <p>联系技术支持</p>
                      </a></el-col
                    >
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
import * as echarts from "echarts/core";
import { TitleComponent, LegendComponent } from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);
import WorkCalendar from "@/components/work-calendar";
export default {
  name: "Home",
  components: {
    WorkCalendar,
  },
  mounted() {
    var chartDom = document.querySelector(".myDiv");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "",
      },
      legend: {
        data: ["zs", "ls"],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "工作效率", max: 100 },
          { name: "考勤", max: 100 },
          { name: "积极性", max: 100 },
          { name: "帮助同事", max: 100 },
          { name: "自主学习", max: 100 },
          { name: "正确率", max: 100 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [10, 35, 100, 56, 33, 99],
              name: "zs",
            },
            {
              value: [78, 45, 90, 26, 100, 50],
              name: "ls",
            },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  },
  data() {
    return {
      defaultImg: require("@/assets/common/head.jpg"),
    };
  },
  methods: {
    loginout() {
      // 删除token和用户信息
      this.$store.dispatch("user/loinout");
      // 跳转到登录
      this.$router.push("/login");
    },
  },
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

    .calendar {
      margin-bottom: 10px;
    }
    .notices {
      ul {
        list-style-type: none;
        li {
          display: block;
          width: 100%;
          height: 80px;
          padding: 10px 0;
          .item {
            display: flex;
            img {
              vertical-align: middle;
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .message {
              margin-left: 10px;
              p {
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
      margin-bottom: 10px;
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
    .sidenav {
      display: flex;
      .sidebtn {
        padding: 5px 10px;
      }
    }

    .myDiv {
      width: 100%;
      height: 400px;
      text-align: center;
    }

    .sidelink {
      padding: 5px 0;
    }
  }
}

// el-card
</style>
