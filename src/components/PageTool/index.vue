<template>
  <!-- 通用的工具栏插槽 -->
  <el-card class="pagetool">
    <el-row type="flex" align="middle" justify="space-between">
      <el-col>
        <div class="before" v-if="showBefore">
          <!-- 图标 -->
          <i class="el-icon-info" style="color: blue"></i>
          <!-- 具名插槽 -->
          <slot name="before">adad</slot>
        </div>
      </el-col>
      <el-col>
        <!-- 靠右对齐 -->
        <el-row type="flex" justify="end">
          <slot name="after">111</slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "PageTool",
  props: {
    // 控制是否显示前面的div
    showBefore: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.pagetool {
  margin: 10px;
  .before {
    padding: 0 15px;
    line-height: 34px;
    // 原来是占满的
    display: inline-block;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background-color: rgb(230, 247, 255, 1);
    i {
      padding-right: 5px;
    }
  }
}
</style>