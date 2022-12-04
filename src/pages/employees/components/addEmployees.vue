<template>
  <el-dialog
    title="新增员工"
    :visible.sync="isshow_2"
    :before-close="beforeClose"
    center
  >
    <el-form :model="list" label-width="120px" ref="ruleForm" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="list.username"
          placeholder="请输入姓名"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="list.mobile"
          placeholder="请输入手机"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="list.timeOfEntry"
          placeholder="请选择入职时间"
          style="width: 80%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="list.formOfEmployment" placeholder="请选择聘用形式">
          <el-option
            v-for="item in employees.hireType"
            :key="item.id"
            :value="item.id"
            >{{ item.value }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="list.workNumber"
          placeholder="请输入工号"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="list.departmentName"
          placeholder="请输入部门"
          style="width: 80%"
          @focus="getDepartments"
        ></el-input>
        <!-- 加载部门数据生成树形结构 -->
        <!-- 树形组件  
              default-expand-all 默认全部展开
        -->
        <el-tree
          v-loading="loading"
          v-show="showtree"
          :data="treedata"
          :props="{ label: 'name' }"
          default-expand-all
          @node-click="handleNodeClick"
        ></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="list.correctionTime"
          placeholder="请选择转正时间"
          style="width: 80%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeshow('false')">取 消</el-button>
      <el-button type="primary" @click="changeshow('true')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addEmployee } from "@/api/employees";
import { getDepartments } from "@/api/departments";
import { tranListToTree } from "@/utils/index.js";
// 注意，这只是引入了一个变量，并不能直接使用，需要在data中定义
import employees from "@/api/constant/employees.js";
export default {
  name: "addEmployees",
  props: {
    isshow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //   显示与隐藏
      //   isshow_2: false,
      // 收集的员工信息
      list: {
        username: "",
        mobile: "",
        timeOfEntry: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        correctionTime: "",
      },
      //   验证规则
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 1, max: 4, message: "姓名在1-4位", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        timeOfEntry: [
          { required: true, message: "入职时间不能为空", trigger: "blur" },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        correctionTime: [
          { required: true, message: "转正时间不能为空", trigger: "blur" },
        ],
      },

      // 收集树形结构数据
      treedata: [],
      // 控制树形结构的显示
      showtree: false,
      // loading效果
      loading: false,
      // 招聘形式所对应的数据
      employees: employees,
    };
  },
  computed: {
    // 利用计算属性复制一份props使用
    isshow_2: function () {
      return this.isshow;
    },
  },

  methods: {
    // 对话框关闭前的回调
    beforeClose() {
      // 清空表单
      this.list = {
        username: "",
        mobile: "",
        timeOfEntry: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        correctionTime: "",
      };
      this.loading = false;
      this.showtree = false;
      //   清空验证规则
      this.$refs.ruleForm.resetFields();
      //   更新父组件的isshow
      this.$emit("update:isshow", false);
    },

    // 确认和取消按钮的回调
    changeshow(flag) {
      if (flag == "true") {
        // 确认按钮的回调
        // 表单验证
        this.$refs.ruleForm.validate(async (isOk) => {
          if (isOk) {
            // 验证成功
            await addEmployee(this.list);
            this.$message.success("添加成功");
            // 通知父组件更新数据
            this.$emit("updateemployees");
            this.beforeClose();
          }
        });
      } else {
        // 取消按钮的回调
        this.beforeClose();
      }
    },

    // 获取部门的树形结构
    async getDepartments() {
      this.loading = true;
      this.showtree = true;
      let result = await getDepartments();
      // '' 表示一级部门,将数组转换为树形结构
      this.treedata = tranListToTree(result.data.depts, "");
      this.loading = false;
    },

    // 收集树形结构数据，树形节点被点击的回调
    handleNodeClick(data, node, mynode) {
      // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身vue组件实例。
      // console.log(data, node, mynode);
      this.list.departmentName = data.name;
      // 隐藏树形结构
      this.showtree = false;
    },
  },

  //   watch: {
  //     isshow: {
  //       handler: function (val) {
  //         this.isshow_2 = val;
  //       },
  //       immediate: true,
  //     },
  //   },
};
</script>

<style>
</style>