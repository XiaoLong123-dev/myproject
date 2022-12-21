<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="datechange"
      >
        <el-option
          v-for="item in yearList"
          :label="item"
          :key="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px"
        @change="datechange"
      >
        <el-option v-for="item in 12" :key="item" :value="item" :label="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text">{{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  // 过滤器,让日历中的单元格只显示天
  filters: {
    getDay(value) {
      return value.split("-")[2];
    },
  },
  name: "WorkCalendar",
  data() {
    return {
      currentYear: null,
      currentMonth: null,
      currentDate: null,
      //   年份列表
      yearList: [],
    };
  },
  methods: {
    // 是否是周末
    isWeek(date) {
      return date.getDay() == 6 || date.getDay() == 0;
    },
    // 日期改变
    datechange() {
      const year = this.currentYear;
      const month = this.currentMonth;
      this.currentDate = new Date(`${year}-${month}`);
    },
  },

  created() {
    /* 
    date .getMonth(); //获取当前月份(0-11,0代表1月)
    date .getDate(); //获取当前日(1-31)
    date .getDay(); //获取当前星期X(0-6,0代表星期天)
    */
    // 日期处理
    // 组件要求起始时间必须是周一开始，以一个月为开始
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    // 根据当前年，生成可选年份 前后各5年
    this.yearList = Array.from(
      Array(11),
      (value, index) => this.currentYear + index - 5
    );
  },

  mounted() {},
};
</script>

<style lang="less" scoped>
/deep/ .el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>