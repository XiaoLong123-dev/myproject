<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>公司设置</h2>
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
      page: {
        // 放置页码等
        page: 1,
        pagesize: 10,
        total: 0,
      },
    };
  },
  methods: {
    // 获取角色列表的方法
    async getRoleList() {
      let result = await getRoleList({});
    },
  },
  mounted() {
    // 调用方法获取角色列表
  },
};
</script>

<style>
</style>