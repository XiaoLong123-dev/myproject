<template>
  <el-card class="settingContent">
    <el-tabs v-model="activeName">
      <el-tab-pane label="津贴设置" name="first">
        <el-form
          :rules="rules"
          ref="firstForm"
          :model="firstForm"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="通用方案" prop="pass">
            <el-input
              v-model="firstForm.subsidyName"
              style="width: 400px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="备注" prop="checkPass">
            <el-input
              v-model="firstForm.subsidyRemark"
              style="width: 400px"
              value="适用于全体"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="津贴名称" prop="age" class="nameList">
            <p>
              <el-input placeholder="交通补贴" style="width: 200px" disabled />

              <el-input
                v-model="firstForm.transportationSubsidyAmount"
                placeholder="请输入内容"
                style="width: 200px"
              />
            </p>
            <p>
              <el-input placeholder="通讯补贴" style="width: 200px" disabled />

              <el-input
                v-model="firstForm.communicationSubsidyAmount"
                placeholder="请输入内容"
                style="width: 200px"
              />
            </p>
            <p>
              <el-input
                placeholder="午餐补贴"
                style="width: 200px"
                :disabled="true"
              />

              <el-input
                v-model="firstForm.lunchAllowanceAmount"
                placeholder="请输入内容"
                style="width: 200px"
              />
            </p>
            <p>
              <el-input
                placeholder="住房补助"
                style="width: 200px"
                :disabled="true"
              />

              <el-input
                v-model="firstForm.housingSubsidyAmount"
                placeholder="请输入内容"
                style="width: 200px"
              />
            </p>
          </el-form-item>
          <el-form-item label="适用计税方式" prop="age">
            <template>
              <el-radio v-model="firstForm.taxCalculationType" label="1"
                >税前</el-radio
              >
              <el-radio v-model="firstForm.taxCalculationType" label="2"
                >税后</el-radio
              >
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getSettings, saveSettings } from "@/api/salarys";

export default {
  name: "UsersTableIndex",
  data() {
    return {
      labelPosition: "left",
      activeName: "first",
      firstForm: {
        socialSecurityType: 1,
        transportationSubsidyScheme: 1,
        communicationSubsidyScheme: 1,
        lunchAllowanceScheme: 1,
        housingSubsidyScheme: 1,
        taxCalculationType: "1",
        transportationSubsidyAmount: 200,
        communicationSubsidyAmount: 100,
        lunchAllowanceAmount: 100,
        housingSubsidyAmount: 100,
      },
      rules: {},
    };
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings() {
      getSettings().then((res) => {
        this.firstForm = res.data;
        console.log(res);
      });
    },
    tabSwitch(obj) {
      this.tabLab = obj;
    },
    async submitForm() {
      await saveSettings(this.firstForm);
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    resetForm() {
      this.$refs.firstForm.resetFields();

      this.getSettings();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.settingContent {
  padding: 20px;
}
</style>
