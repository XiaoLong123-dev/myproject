<template>
  <!-- 打印组件 -->
  <div class="dashboard-container" id="myPrint">
    <div class="app-container">
      <el-card>
        <!-- 打印按钮 -->
        <el-row>
          <el-button v-print="printObj" size="small" type="primary"
            >打印</el-button
          >
        </el-row>
        <!-- 员工个人信息打印 -->
        <div v-if="type === 'personal'">
          <h2 class="centInfo">员工信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
            <tr class="title">
              <td colspan="8" class="centInfo">基本信息</td>
            </tr>
            <tr>
              <th style="width: 10%">姓名</th>
              <td colspan="6" style="width: 80%">{{ formData.username }}</td>
              <td rowspan="5" style="width: 10%">
                <img
                  style="width: 155px; height: 218px"
                  :src="formData.staffPhoto"
                />
              </td>
            </tr>
            <tr>
              <th>性别</th>
              <td colspan="6">{{ formData.sex }}</td>
            </tr>
            <tr>
              <th>手机</th>
              <td colspan="6">{{ formData.mobile }}</td>
            </tr>
            <tr>
              <th>出生日期</th>
              <td colspan="6">{{ formData.dateOfBirth | formatDate }}</td>
            </tr>
            <tr>
              <th>最高学历</th>
              <td colspan="6">{{ formData.theHighestDegreeOfEducation }}</td>
            </tr>
            <tr>
              <th style="width: 10%">是否可编辑</th>
              <td style="width: 35%">{{ formData.isItEditable }}</td>
              <th style="width: 10%">是否隐藏号码</th>
              <td colspan="5" style="width: 45%">
                {{ formData.doYouHideNumbers }}
              </td>
            </tr>
            <tr>
              <th>国家地区</th>
              <td>{{ formData.nationalArea }}</td>
              <th>护照号</th>
              <td colspan="5">{{ formData.passportNo }}</td>
            </tr>
            <tr>
              <th>身份证号</th>
              <td>{{ formData.idNumber }}</td>
              <th>身份证照片</th>
              <td colspan="5">{{ formData.iDCardPhoto }}</td>
            </tr>
            <tr>
              <th>籍贯</th>
              <td>{{ formData.nativePlace }}</td>
              <th>民族</th>
              <td colspan="5">{{ formData.nation }}</td>
            </tr>
            <tr>
              <th>英文名</th>
              <td>{{ formData.englishName }}</td>
              <th>婚姻状况</th>
              <td colspan="5">{{ formData.maritalStatus }}</td>
            </tr>
            <tr>
              <th>员工照片</th>
              <td>{{ formData.staffPhoto }}</td>
              <th>生日</th>
              <td colspan="5">{{ formData.birthday }}</td>
            </tr>
            <tr>
              <th>属相</th>
              <td>{{ formData.zodiac }}</td>
              <th>年龄</th>
              <td colspan="5">{{ formData.age }}</td>
            </tr>
            <tr>
              <th>星座</th>
              <td>{{ formData.constellation }}</td>
              <th>血型</th>
              <td colspan="5">{{ formData.bloodType }}</td>
            </tr>
            <tr>
              <th>户籍所在地</th>
              <td>{{ formData.domicile }}</td>
              <th>政治面貌</th>
              <td colspan="5">{{ formData.politicalOutlook }}</td>
            </tr>
            <tr>
              <th>入党时间</th>
              <td>{{ formData.timeToJoinTheParty }}</td>
              <th>存档机构</th>
              <td colspan="5">{{ formData.archivingOrganization }}</td>
            </tr>
            <tr>
              <th>子女状态</th>
              <td>{{ formData.stateOfChildren }}</td>
              <th>子女有无商业保险</th>
              <td colspan="5">
                {{ formData.doChildrenHaveCommercialInsurance }}
              </td>
            </tr>
            <tr>
              <th>有无违法违纪行为</th>
              <td>{{ formData.isThereAnyViolationOfLawOrDiscipline }}</td>
              <th>有无重大病史</th>
              <td colspan="5">
                {{ formData.areThereAnyMajorMedicalHistories }}
              </td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">通讯信息</td>
            </tr>
            <tr>
              <th>QQ</th>
              <td>{{ formData.qQ }}</td>
              <th>微信</th>
              <td colspan="5">{{ formData.weChat }}</td>
            </tr>
            <tr>
              <th>居住证城市</th>
              <td>{{ formData.residenceCardCity }}</td>
              <th>居住证办理日期</th>
              <td colspan="5">{{ formData.dateOfResidencePermit }}</td>
            </tr>
            <tr>
              <th>居住证截止日期</th>
              <td>{{ formData.residencePermitDeadline }}</td>
              <th>现居住地</th>
              <td colspan="5">{{ formData.placeOfResidence }}</td>
            </tr>
            <tr>
              <th>通讯地址</th>
              <td>{{ formData.postalAddress }}</td>
              <th>联系手机</th>
              <td colspan="5">{{ formData.contactTheMobilePhone }}</td>
            </tr>
            <tr>
              <th>个人邮箱</th>
              <td>{{ formData.personalMailbox }}</td>
              <th>紧急联系人</th>
              <td colspan="5">{{ formData.emergencyContact }}</td>
            </tr>
            <tr>
              <th>紧急联系电话</th>
              <td colspan="7">{{ formData.emergencyContactNumber }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">账号信息</td>
            </tr>
            <tr>
              <th>社保电脑号</th>
              <td>{{ formData.socialSecurityComputerNumber }}</td>
              <th>公积金账号</th>
              <td colspan="5">{{ formData.providentFundAccount }}</td>
            </tr>
            <tr>
              <th>银行卡号</th>
              <td>{{ formData.bankCardNumber }}</td>
              <th>开户行</th>
              <td colspan="5">{{ formData.openingBank }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">教育信息</td>
            </tr>
            <tr>
              <th>学历类型</th>
              <td>{{ formData.educationalType }}</td>
              <th>毕业学校</th>
              <td colspan="5">{{ formData.graduateSchool }}</td>
            </tr>
            <tr>
              <th>入学时间</th>
              <td>{{ formData.enrolmentTime }}</td>
              <th>毕业时间</th>
              <td colspan="5">{{ formData.graduationTime }}</td>
            </tr>
            <tr>
              <th>专业</th>
              <td>{{ formData.major }}</td>
              <th>毕业证书</th>
              <td colspan="5">{{ formData.graduationCertificate }}</td>
            </tr>
            <tr>
              <th>学位证书</th>
              <td colspan="7">{{ formData.certificateOfAcademicDegree }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">从业信息</td>
            </tr>
            <tr>
              <th>上家公司</th>
              <td>{{ formData.homeCompany }}</td>
              <th>职称</th>
              <td colspan="5">{{ formData.title }}</td>
            </tr>
            <tr>
              <th>简历</th>
              <td>{{ formData.resume }}</td>
              <th>有无竞业限制</th>
              <td colspan="5">
                {{ formData.isThereAnyCompetitionRestriction }}
              </td>
            </tr>
            <tr>
              <th>前公司离职证明</th>
              <td>{{ formData.proofOfDepartureOfFormerCompany }}</td>
              <th>备注</th>
              <td colspan="5">{{ formData.remarks }}</td>
            </tr>
          </table>
          <div class="foot">签字：___________日期:___________</div>
        </div>
        <!-- 岗位信息打印 -->
        <div v-else>
          <h2 class="centInfo">岗位信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
            <tr class="title">
              <td colspan="4" class="centInfo">基本信息</td>
            </tr>
            <tr>
              <th style="width: 10%">姓名</th>
              <td style="width: 40%">{{ formData.username }}</td>
              <th style="width: 10%">入职日期</th>
              <td style="width: 40%">{{ formData.dateOfEntry }}</td>
            </tr>
            <tr>
              <th>部门</th>
              <td>{{ formData.departmentName }}</td>
              <th>岗位</th>
              <td>{{ formData.post }}</td>
            </tr>
            <tr>
              <th>工作邮箱</th>
              <td>{{ formData.workMailbox }}</td>
              <th>工号</th>
              <td>{{ formData.workNumber }}</td>
            </tr>
            <tr>
              <th>转正日期</th>
              <td>{{ formData.dateOfCorrection }}</td>
              <th>转正状态</th>
              <td>{{ formData.stateOfCorrection }}</td>
            </tr>
            <tr>
              <th>职级</th>
              <td>{{ formData.rank }}</td>
              <th>汇报对象</th>
              <td>{{ formData.reportName }}</td>
            </tr>
            <tr>
              <th>HRBP</th>
              <td>{{ formData.hRBP }}</td>
              <th>聘用形式</th>
              <td>{{ formData.formOfEmployment }}</td>
            </tr>

            <tr>
              <th>管理形式</th>
              <td>{{ formData.formOfManagement }}</td>
              <th>调整司龄</th>
              <td>{{ formData.adjustmentAgedays }}</td>
            </tr>
            <tr>
              <th>司龄</th>
              <td>{{ formData.ageOfDivision }}</td>
              <th>首次参加工作时间</th>
              <td>{{ formData.workingTimeForTheFirstTime }}</td>
            </tr>

            <tr>
              <th>调整工龄天</th>
              <td>{{ formData.adjustmentOfLengthOfService }}</td>
              <th>工龄</th>
              <td>{{ formData.workingYears }}</td>
            </tr>
            <tr>
              <th>纳税城市</th>
              <td>{{ formData.taxableCity }}</td>
              <th>转正评价</th>
              <td>{{ formData.correctionEvaluation }}</td>
            </tr>
            <tr class="title">
              <td colspan="4" class="centInfo">合同信息</td>
            </tr>
            <tr>
              <th>首次合同开始时间</th>
              <td>{{ formData.initialContractStartTime }}</td>
              <th>首次合同结束时间</th>
              <td>{{ formData.firstContractTerminationTime }}</td>
            </tr>
            <tr>
              <th>现合同开始时间</th>
              <td>{{ formData.currentContractStartTime }}</td>
              <th>现合同结束时间</th>
              <td>{{ formData.closingTimeOfCurrentContract }}</td>
            </tr>

            <tr>
              <th>合同期限</th>
              <td>{{ formData.contractPeriod }}</td>
              <th>合同文件</th>
              <td>{{ formData.contractDocuments }}</td>
            </tr>
            <tr>
              <th>续签次数</th>
              <td colspan="3">{{ formData.renewalNumber }}</td>
            </tr>
            <tr class="title">
              <td colspan="4" class="centInfo">招聘信息</td>
            </tr>
            <tr>
              <th>其他招聘渠道</th>
              <td>{{ formData.otherRecruitmentChannels }}</td>
              <th>招聘渠道</th>
              <td>{{ formData.recruitmentChannels }}</td>
            </tr>
            <tr>
              <th>社招校招</th>
              <td>{{ formData.socialRecruitment }}</td>
              <th>推荐企业人</th>
              <td>{{ formData.recommenderBusinessPeople }}</td>
            </tr>
          </table>
          <div class="foot">签字：___________日期:___________</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPersonalDetail, getJobDetail } from "@/api/employees";
import { getUserDetailById } from "@/api/user";
export default {
  name: "Print",
  data() {
    return {
      formData: {},
      userId: this.$route.params.id,
      type: this.$route.query.type, // 打印类型
      // 打印的区域
      printObj: {
        id: "myPrint",
      },
    };
  },
  // 创建完毕状态
  created() {
    this.type === "personal" ? this.getPersonalDetail() : this.getJobDetail();
  },

  // 组件更新
  methods: {
    async getPersonalDetail() {
      let result = await getPersonalDetail(this.userId); // 获取个人基本信息
      this.formData = result.data;
      // console.log(this.formData);
    },
    async getJobDetail() {
      const userInfo = await getUserDetailById(this.userId);
      const jobInfo = await getJobDetail(this.userId); // 获取个人基本信息
      this.formData = { ...userInfo.data, ...jobInfo.data };
      // console.log(this.formData);
    },
  },
};
</script>

<style lang="scss">
.foot {
  padding: 30px 0;
  text-align: right;
}
</style>

