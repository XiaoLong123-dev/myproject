<template>
  <div class="job-info">
    <!-- 基础信息 -->
    <el-form label-width="220px">
      <div class="block">
        <div class="title">基础信息</div>
        <el-form-item label="岗位">
          <el-input
            v-model="formData.post"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <!-- <el-form-item label="转正日期">
          <el-date-picker
            v-model="formData.dateOfCorrection"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item> -->
        <el-form-item label="转正状态">
          <el-select
            v-model="formData.stateOfCorrection"
            placeholder="请选择"
            disabled
          >
            <el-option
              v-for="item in EmployeeEnum.stateOfCorrection"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职级">
          <el-input v-model="formData.rank" class="inputW" />
        </el-form-item>
        <el-form-item label="转正评价">
          <el-input
            v-model="formData.correctionEvaluation"
            type="textarea"
            placeholder="1-300位字符"
          />
        </el-form-item>
        <el-form-item label="汇报对象">
          <el-select
            v-model="formData.reportId"
            filterable
            placeholder="请选择"
            class="inputW"
          >
            <el-option
              v-for="item in depts"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="HRBP">
          <el-select
            v-model="formData.hrbp"
            filterable
            placeholder="请选择"
            class="inputW"
          >
            <el-option
              v-for="item in depts"
              :key="item.id"
              :label="item.username"
              :value="item.id"
              class="inputW"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="formInfo" label="调整司龄(天)：">
          <el-input
            v-model="formData.adjustmentAgedays"
            type="number"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="首次参加工作时间">
          <el-date-picker
            v-model="formData.workingTimeForTheFirstTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="调整工龄">
          <el-input
            v-model="formData.adjustmentOfLengthOfService"
            placeholder="0.00年"
            class="inputW"
            disabled
          />
        </el-form-item>
      </div>
      <!-- 合同信息 -->
      <div class="block">
        <div class="title">合同信息</div>
        <el-form-item class="formInfo" label="首次合同开始时间：">
          <el-date-picker
            v-model="formData.initialContractStartTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="首次合同结束时间">
          <el-date-picker
            v-model="formData.firstContractTerminationTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="现合同开始时间">
          <el-date-picker
            v-model="formData.currentContractStartTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="现合同结束时间">
          <el-date-picker
            v-model="formData.closingTimeOfCurrentContract"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="合同期限">
          <el-select v-model="formData.contractPeriod" class="filter-item">
            <el-option
              v-for="item in EmployeeEnum.contractPeriod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="续签次数">
          <el-select v-model="formData.renewalNumber" class="filter-item">
            <el-option
              v-for="item in EmployeeEnum.renewalCount"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <!-- 招聘信息 -->
      <div class="block">
        <div class="title">招聘信息</div>
        <el-form-item label="其他招聘渠道">
          <el-select
            v-model="formData.otherRecruitmentChannels"
            placeholder="请选择"
          >
            <el-option
              v-for="item in EmployeeEnum.resumeSource"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘渠道">
          <el-select
            v-model="formData.recruitmentChannels"
            placeholder="请选择"
          >
            <el-option
              v-for="item in EmployeeEnum.resumeSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="社招/校招">
          <el-select v-model="formData.socialRecruitment" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.hireSourceType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐企业/人">
          <el-input
            v-model="formData.recommenderBusinessPeople"
            placeholder="请输入"
            class="infoPosition inputW"
          />
        </el-form-item>
      </div>
      <!-- 从业信息 -->
      <el-form-item>
        <el-button type="primary" @click="saveJob">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getJobDetail, updateJob, getSimpleUser } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees";
export default {
  name: "jobInfo",
  data() {
    return {
      userId: this.$route.params.id,
      depts: [],
      EmployeeEnum,
      formData: {
        adjustmentAgedays: "", // 调整司龄天
        adjustmentOfLengthOfService: "", // 调整工龄天
        closingTimeOfCurrentContract: "", // 现合同结束时间
        companyId: "", // 公司ID
        contractDocuments: "", // 合同文件
        contractPeriod: "", // 合同期限
        correctionEvaluation: "", //  转正评价
        currentContractStartTime: "", // 现合同开始时间
        firstContractTerminationTime: "", // 首次合同结束时间
        hrbp: "", // HRBP
        initialContractStartTime: "", // 首次合同开始时间
        otherRecruitmentChannels: "", // 其他招聘渠道
        post: "", // 岗位
        rank: null, // 职级
        recommenderBusinessPeople: "", // 推荐企业人
        recruitmentChannels: "", // 招聘渠道
        renewalNumber: "", // 续签次数
        reportId: "", // 汇报对象
        reportName: null, // 汇报对象
        socialRecruitment: "", // 社招校招
        stateOfCorrection: "", // 转正状态
        taxableCity: "", // 纳税城市
        userId: "", // 员工ID
        workMailbox: "", // 工作邮箱
        workingCity: "", // 工作城市
        workingTimeForTheFirstTime: "", // 首次参加工作时间
      },
    };
  },
  methods: {
    // 获取岗位信息
    async getJobDetail() {
      let result = await getJobDetail(this.userId);
      this.formData = result.data;
      console.log(result);
    },
    // 保存岗位信息
    async saveJob() {
      await updateJob(this.formData);
      this.$message.success("保存成功");
      location.reload();
    },
    // 获取HRBP、汇报对象
    async getSimpleUser() {
      let result = await getSimpleUser();
      console.log(result);
      this.depts = result.data;
    },
  },
  mounted() {
    // 获取岗位信息
    this.getJobDetail();
    //获取HRBP、汇报对象
    this.getSimpleUser();
  },
};
</script>

<style>
</style>