<template>
  <div class="box">
    <div class="login">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" class="pass">
          <el-input
            :type="typeName"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
          <i class="el-icon-view" @click="showpass"></i>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            <i class="el-icon-loading" v-show="isLoading"></i> 提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="registerForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    // 表单验证规则
    // 账号验证
    var checkmobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      if (value.length != 11) {
        return callback(new Error("手机号必须11位"));
      }
      callback();
    };
    // 密码验证
    var validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error("最少6位,最多16位"));
        } else {
          callback();
        }
      }
    };
    return {
      // 表单收集的数据
      ruleForm: {
        password: "123456",
        mobile: "13800000002",
      },
      rules: {
        password: [{ validator: validatepassword, trigger: "blur" }],
        mobile: [{ validator: checkmobile, trigger: "blur" }],
      },
      // 密码的显示
      typeName: "password",
      // 提交加载中
      isLoading: false,
    };
  },
  methods: {
    // 引入vuex方法
    ...mapActions(["user/getToken"]),
    // 提交按钮
    submitForm(formName) {
      // 对整个表单进行校验
      // validate 参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功(valid)和未通过校验的字段(object)。若不传入回调函数，则会返回一个 promise
      this.$refs[formName].validate(async (valid, object) => {
        if (valid) {
          try {
            this.isLoading = true;
            // 强制等待请求成功之后在执行其他代码
            await this["user/getToken"](this.ruleForm);
            // 跳转到home主页
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            this.isLoading = false;
          }
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 跳转到注册
    registerForm() {
      console.log("register");
    },
    // 密码显示
    showpass() {
      if (this.typeName == "password") {
        this.typeName = "text";
      } else {
        this.typeName = "password";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  /* 
  background：color img_url repeat attachment position / size
  attachment  是否固定或者跟随页面滚动。
  */
  background: url("../../images/bg.jpg") no-repeat center / cover;

  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 500px;
    height: 230px;
    border: 1px solid white;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    .pass {
      position: relative;
      i {
        position: absolute;
        top: 15px;
        right: 30px;
      }
    }
  }
}
</style>