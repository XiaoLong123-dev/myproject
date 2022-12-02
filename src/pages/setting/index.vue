<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色 -->
            <el-button type="primary">+ 新增角色</el-button>
            <!-- 角色表格 -->
            <el-table
              :data="list"
              border
              style="width: 100%; margin: 20px 0; text-align: center"
            >
              <el-table-column
                type="index"
                label="序号"
                width="150"
                align="center"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="200"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="300"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                header-align="center"
              >
                <el-button type="success" size="medium">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <Pagination
              :total="total"
              :currentpage="page.page"
              :pagesize="page.pagesize"
              @changepages="changepages"
            ></Pagination>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from "@/api/setting";
export default {
  name: "Setting",
  data() {
    return {
      // 接受角色列表
      list: [],
      // 总数据条数
      total: 0,
      page: {
        // 放置页码等
        // 当前页
        page: 1,
        // 页面尺寸
        pagesize: 1,
      },
      // element-ui的标签页组件默认激活
      activeName: "first",
    };
  },
  methods: {
    // 获取角色列表的方法
    async getRoleList(page) {
      // 是否传入默认值
      let pages = page ? page : this.page;
      let result = await getRoleList(pages);
      // console.log(result);
      if (result.success) {
        this.total = result.data.total;
        this.list = result.data.rows;
      }
    },
    // tabs组件的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页组件的自定义事件
    changepages(pages) {
      // console.log(pages);
      this.page.page = pages.page;
      this.page.pagesize = pages.pagesize;
      this.getRoleList(pages);
    },
  },
  mounted() {
    // 调用方法获取角色列表
    this.getRoleList();
  },
};
</script>

<style>
</style>