<template>
  <el-dialog
    :title="formdata.id ? '编辑' : '新增'"
    :visible.sync="showaddoredit"
    :before-close="handlerClose"
    center
  >
    <el-form :model="formdata" ref="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formdata.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="code">
        <el-input v-model="formdata.code" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="formdata.description"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>

      <el-form-item label="开启">
        <!-- 开关 -->
        <!-- 使用active-text属性与inactive-text属性来设置开关的文字描述。
            active-value,inactive-value对应的值
       -->
        <el-switch
          v-model="formdata.enVisible"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionDetail } from "@/api/permission";
export default {
  name: "AddOrEdit",
  props: {
    showaddoredit: {
      type: Boolean,
      default: false,
    },
    // 类型 该类型不需要显示，因为添加的时候就已经知道类型了
    type: {
      type: Number,
      default: 0,
    },
    // 因为是树形结构，所以需要知道添加到那个节点下了
    pid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 表单数据
      formdata: {
        name: "",
        code: "",
        description: "",
        // 1 开启  0 关闭
        enVisible: "1",
      },
      // 表单校验规则
      rules: {
        name: [
          {
            required: true,
            message: "名称必填",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "标识必填",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 关闭前的回调
    handlerClose() {
      this.formdata = {
        name: "",
        code: "",
        description: "",
        enVisible: "1",
      };
      console.log(this.formdata);
      // 移除校验和清空表单
      this.$refs.ruleForm.resetFields();
      // 通知父组件关闭弹层
      this.$emit("update:showaddoredit", false);
    },
    // 确认按钮的回调
    submit() {
      // 表单校验
      this.$refs.ruleForm.validate().then(() => {
        //  表单校验成功
        if (this.formdata.id) {
          // 编辑操作
          // 通知父组件更新成功
          this.$emit("updateEdit", this.formdata);
        } else {
          // 新增操作
          // 通知父组件发送请求
          // 记得把type和pid带上不然不知道添加到哪里
          this.formdata = { ...this.formdata, type: this.type, pid: this.pid };
          this.$emit("updateData", this.formdata);
        }
        this.handlerClose();
      });
    },
    // 取消按钮的回调
    cancel() {
      // console.log(this.id);
      this.handlerClose();
    },
    // 获取当前详细权限
    // 父组件调用
    async getDetail(id) {
      if (id) {
        let result = await getPermissionDetail(id);
        this.formdata = result.data;
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>