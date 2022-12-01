<template>
  <!-- 添加和编辑部门 -->
  <div>
    <!-- 根据mydata中是否有id判断是新增还是编辑 -->
    <el-dialog
      :title="mydata.id ? `编辑${mydata.name}` : '新增部门'"
      :visible.sync="showDialog_2"
      width="40%"
      center
      :before-close="handleClose"
    >
      <el-form
        :model="mydata"
        label-width="100px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="mydata.name" placeholder="部门名称"></el-input>
        </el-form-item>

        <el-form-item label="部门编码" prop="code">
          <el-input v-model="mydata.code" placeholder="部门编码"></el-input>
        </el-form-item>

        <el-form-item label="部门负责人" prop="manager">
          <!-- 聚焦时获取员工列表 -->
          <el-select
            @focus="getSimpleUser"
            v-model="mydata.manager"
            placeholder="请选择"
          >
            <!-- 遍历员工列表 -->
            <el-option
              v-for="users in userList"
              :key="users.id"
              :value="users.username"
              >{{ users.username }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="mydata.introduce"
            placeholder="部门介绍"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('cancel')">取 消</el-button>
        <el-button type="primary" @click="closeDialog('submit')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDepartments,
  addDepartment,
  getDeptsDetail,
  updateDeptsDetail,
} from "@/api/departments";
import { getSimpleUser } from "@/api/employees";
export default {
  name: "AddDepartment",
  props: {
    // 控制显示与隐藏
    showDialog: {
      type: Boolean,
      default: false,
    },
    // 当前节点
    treeNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    // 定义部门名称同级不重复的校验规则
    const checkNameRepeat = async (rule, value, callback) => {
      // 获取所有的部门数组，防止有些数据被删除
      const result = await getDepartments();
      // 先找到子级部门，再从子级部门中查找是否已经存在
      // console.log(this.treeNode.id);

      // 默认的校验结果
      let isRepeat = false;
      // 两种不同的校验规则 添加 和 编辑
      if (this.mydata.id) {
        // 编辑模式
        // 找到同级的所有部门，然后排除掉自己，再去判断是否有重名的情况
        isRepeat = result.data.depts
          .filter(
            (item) => item.pid == this.mydata.pid && item.id !== this.mydata.id
          )
          .some((item) => item.name == this.mydata.name);
      } else {
        // 添加模式
        isRepeat = result.data.depts
          .filter((item) => item.pid == this.treeNode.id)
          .some((item) => item.name == value);
      }

      isRepeat
        ? callback(new Error(`同级部门下已经有${value}部门了`))
        : callback();
    };

    // 定义部门编码全部级别不重复的校验规则
    const checkCodeRepeat = async (rule, value, callback) => {
      // 获取所有的部门数组
      const result = await getDepartments();
      // 默认的校验结果
      let isRepeat = false;
      // 两种不同的校验规则 添加 和 编辑
      if (this.mydata.id) {
        // 编辑模式
        // 找到同级的所有部门，然后排除掉自己，再去判断是否有相同的编码情况
        isRepeat = result.data.depts
          .filter((item) => item.id !== this.mydata.id)
          .some((item) => item.code == value);
      } else {
        // 添加模式
        isRepeat = result.data.depts.some((item) => item.code == value);
      }
      isRepeat ? callback(new Error("该编码已经存在了")) : callback();
    };

    return {
      //   表单数据
      mydata: {
        // 部门名称
        name: "",
        // 部门编码
        code: "",
        // 部门负责人
        manager: "",
        // 部门介绍
        introduce: "",
      },
      // 表单的校验规则
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "1-20个字符之间" },
          // 自定义校验规则
          { validator: checkNameRepeat, trigger: "blur" },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "1-20个字符之间" },
          // 自定义校验规则
          { validator: checkCodeRepeat, trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "1-200个字符之间" },
        ],
        manager: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
      //   拷贝一份props
      showDialog_2: this.showDialog,
      // 员工列表
      userList: [],
    };
  },
  methods: {
    // 对话框关闭前的回调
    handleClose() {
      // 清空校验规则，重置表单
      this.mydata = {
        // 部门名称
        name: "",
        // 部门编码
        code: "",
        // 部门负责人
        manager: "",
        // 部门介绍
        introduce: "",
      };
      // 重置校验规则
      this.$refs.ruleForm.clearValidate();
      // 通知父组件改变showDialog的值
      this.$emit("update:showDialog", false);
    },

    // 确认或关闭按钮的回调
    closeDialog(type) {
      // 取消按钮的回调
      if (type == "cancel") {
        // 关闭对话框前的回调
        this.handleClose();
      } else {
        // 确定按钮的回调
        // 进行表单校验
        // 获取表单实例
        this.$refs.ruleForm.validate(async (isOk) => {
          // 表单校验通过
          if (isOk) {
            if (this.mydata.id) {
              // 修改数据
              // 校验模式需要更改
              await updateDeptsDetail(this.mydata);
            } else {
              // 新增数据
              await addDepartment({ ...this.mydata, pid: this.treeNode.id });
            }
            // 通知父组件重新渲染数据
            this.$emit("getData");
            // 关闭对话框前的回调
            this.handleClose();
          }
        });
      }
    },
    // 获取简单员工列表
    async getSimpleUser() {
      let result = await getSimpleUser();
      if (result.success) {
        // 有的可能没有username
        this.userList = result.data.filter((item) => item.username);
      }
      // console.log(result);
    },

    // 获取部门的详情，用于编辑部门,夫组件调用
    async getDeptsDetails(id) {
      let result = await getDeptsDetail(id);
      this.mydata = result.data;
      console.log(this.mydata);
      // id不能在这里使用props的treenode，因为props传值是异步的，不一定能拿到值
      // 把获取到的详情数据赋值给mydata在页面上回显
    },
  },
  mounted() {
    // console.log(this.treeNode);
  },
  watch: {
    // 检测props的变化，更新this.showDialog_2
    showDialog: function (val) {
      this.showDialog_2 = val;
    },
  },
};
</script>

<style>
</style>