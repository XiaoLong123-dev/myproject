<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
          <!-- 登录账号设置 -->
          <el-tab-pane label="登录账号设置" name="login">
            <el-form
              :model="formdata"
              label-width="120px"
              style="margin-left: 200px; margin-top: 20px"
              ref="ruleForm"
              :rules="rules"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="formdata.username"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpassword">
                <el-input
                  v-model="formdata.newpassword"
                  type="password"
                  style="width: 300px"
                  placeholder="不要和旧密码重复，6-9位"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- @click="submitForm('ruleForm')" -->
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >更新</el-button
                >

                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 个人详情 -->
          <el-tab-pane label="个人详情" name="detail">
            <!-- 打印按钮 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link
                  :to="`/print/${this.$route.params.id}?type=personal`"
                >
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 动态组件 -->
            <component :is="UserComponent"></component>
          </el-tab-pane>
          <!-- 岗位信息 -->
          <el-tab-pane label="岗位信息" name="job">
            <!-- 打印按钮 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/print/${this.$route.params.id}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置岗位详情 -->
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from "@/api/user";
import { saveUserDetailById } from "@/api/employees";
// 引入员工详情组件
import userInfo from "./components/userInfo.vue";
// 岗位详情
import jobInfo from "./components/jobInfo.vue";
export default {
  name: "employeeDetail",
  components: {
    userInfo,
    jobInfo,
  },
  data() {
    return {
      // 动态组件
      UserComponent: "userInfo",
      JobInfo: "jobInfo",
      activeName: "login",
      //   因为后台返回的密码是加密之后的，不能解密，所以使用newpassword存储最新的密码
      formdata: {
        username: "",
        newpassword: "",
      },
      // 旧的用户名信息
      oldusername: "",
      //   表单检验
      rules: {
        username: [
          { required: true, message: "姓名必填", trigger: "change" },
          { min: 1, max: 5, message: "姓名在1-5位之间", trigger: "blur" },
        ],
        newpassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 表单的重置
    resetForm(formName) {
      // 重置表单数据，需要在 el-form-item 上添加 prop="password"属性，否则不生效
      // this.$refs[formName].resetFields();
      this.getUserDetail();
    },

    // 确定按钮的回调
    async submitForm(formName) {
      try {
        // 进行表单校验  promise的形式
        await this.$refs[formName].validate();
        // 校验成功
        // 发送保存信息请求
        //   把新的密码覆盖掉旧的密码并作为参数发送请求
        await saveUserDetailById({
          ...this.formdata,
          password: this.formdata.newpassword,
        });
        this.$message.success("修改成功");
        // 如果当前登录的账号和修改的是同一个用户
        if (this.$store.state.user.userInfo.username == this.oldusername) {
          // 清空token
          // 跳转页面
          this.$store.dispatch("user/loinout");
          this.$router.push("/login");
        }
        // 重置表单
        this.getUserDetail();
      } catch (error) {
        this.$message.error("请填写完整");
      }
    },

    // 根据id获取用户的基本数据
    async getUserDetail() {
      let result = await getUserDetailById(this.$route.params.id);
      if (result.success) {
        this.formdata = result.data;
        // 保存旧的用户名信息
        this.oldusername = result.data.username;
      }
    },
  },

  mounted() {
    this.getUserDetail();
  },
};
</script>

<style>
</style>