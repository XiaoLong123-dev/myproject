<template>
  <el-dialog
    :title="roledetails.id ? '编辑部门' : '新增部门'"
    :visible.sync="showdialog_2"
    width="50%"
    center
    :before-close="closeDialog"
  >
    <!-- 表单 -->
    <el-form
      label-position="right"
      label-width="80px"
      :model="roledetails"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roledetails.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roledetails.description"></el-input>
      </el-form-item>
    </el-form>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeshowdialog('false')">取 消</el-button>
      <el-button type="primary" @click="changeshowdialog('true')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { updateRole, addRoles } from "@/api/setting";
export default {
  name: "roleDialog",
  props: {
    // 控制对话框的显示与隐藏
    showdialog: {
      type: Boolean,
      default: false,
    },
    // 角色的详细信息
    roleDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 显示
      showdialog_2: false,
      //   表单收集的数据
      roledetails: {},
      //   name的校验
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 点击确认或者取消的回调
    changeshowdialog(flag) {
      if (flag == "true") {
        // 确认的回调
        // 表单的校验
        this.$refs.ruleForm.validate(async (isOk) => {
          // 表单校验成功
          if (isOk) {
            //  如果包含id是编辑功能，没有是新增功能
            if (this.roledetails.id) {
              // 编辑
              // 提交修改
              // 整理参数
              /* 
            companyId	string	必须		公司id	
            description	string	必须		描述	
            id	string	必须		标识	
            name	string	必须		角色名称	
            permIds	string []	必须		权限点数据	
            item 类型: string
        */
              let result = await updateRole(this.roledetails);
              if (result.success) {
                this.$message.success("操作成功");
              }
              // 通知父组件更新数据
              this.$emit("updateData");
            } else {
              // 新增
              let results = await addRoles(this.roledetails);
              if (results.success) {
                // 通知父组件更新数据
                this.$emit("updateData");
              }
            }
            this.closeDialog();
          }
        });
      } else {
        // 取消的回调
        this.closeDialog();
      }
    },

    // 关闭前的回调
    closeDialog() {
      // console.log(1);
      //   重置表单
      this.roledetails = {};
      this.$emit("update:showdialog", false);
      this.$refs.ruleForm.resetFields();
    },
  },

  watch: {
    roleDetail: {
      handler: function () {
        this.roledetails = this.roleDetail;
      },
      immediate: true,
    },
    showdialog: {
      handler: function (val) {
        this.showdialog_2 = val;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>