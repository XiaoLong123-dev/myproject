<template>
  <!-- 分页器组件 -->
  <div class="pagination">
    <!-- 总数目 -->
    <div class="total">共{{ total }}条</div>
    <div class="container">
      <!-- 上一页 -->
      <button
        class="pre disabled"
        @click="changePage(myCurrentPage - 1)"
        v-if="myCurrentPage == 1"
      >
        &lt;
      </button>
      <button class="pre" @click="changePage(myCurrentPage - 1)" v-else>
        &lt;
      </button>
      <!-- 页码 -->
      <!-- <span>1</span>
      <span>...</span>
      <span>2</span>
      <span>2</span>
      <span>...</span>
      <span>3</span> -->
      <span
        v-show="startAndEndPages().start > 1"
        @click="changePage(1)"
        :class="{ active: myCurrentPage == 1 }"
        >1</span
      >

      <span v-show="startAndEndPages().start > 1">...</span>

      <!-- 注意template不能绑定key -->
      <template v-for="(page, index) in startAndEndPages().end">
        <span
          :class="{ active: myCurrentPage == page }"
          v-if="page >= startAndEndPages().start"
          :key="index"
          @click="changePage(page)"
          >{{ page }}</span
        >
      </template>

      <span v-show="startAndEndPages().end < totalPage">...</span>

      <span
        v-show="startAndEndPages().end < totalPage"
        @click="changePage(totalPage)"
        :class="{ active: myCurrentPage == totalPage }"
        >{{ totalPage }}</span
      >
      <!-- 下一页 -->
      <button
        class="next disabled"
        @click="changePage(myCurrentPage + 1)"
        v-if="myCurrentPage == totalPage"
      >
        &gt;
      </button>
      <button class="next" @click="changePage(myCurrentPage + 1)" v-else>
        &gt;
      </button>
    </div>
    <!-- 页面尺寸 -->
    <!-- @change="selectClass($event)" -->
    <select class="pagesize" @change="selectClass($event)">
      <option value="1" selected>1条/页</option>
      <option value="5">5条/页</option>
      <option value="10">10条/页</option>
    </select>
    <!-- 直接前往第几页 -->
    <div class="goPage">
      前往<input
        type="text"
        placeholder="1"
        v-model.number="goPage"
        @keyup.enter="changePage(goPage)"
      />页
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 100,
    },
    currentpage: {
      type: Number,
      default: 1,
    },
    pagesize: {
      type: Number,
      default: 1,
    },
    // 连续页数
    limit: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      // 下拉框收集的数据
      selectClassEnd: 1,
      // 去那一页
      goPage: 1,
      // 定义props的代理
      myTotal: 100,
      myPageSize: 1,
      myCurrentPage: 1,
      myLimit: 5,
    };
  },
  computed: {
    // 计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pagesize);
    },
  },
  methods: {
    // 计算开始页和结束页
    startAndEndPages() {
      // 开始页和结束页
      let start = 0;
      let end = 0;
      // 如果总页数小于连续页数
      if (this.totalPage < this.myLimit) {
        start = 1;
        end = this.totalPage;
      } else {
        // 总页数大于连续页数
        // 需要让当前页在中间
        start = this.myCurrentPage - parseInt(this.myLimit / 2);
        end = start + this.myLimit - 1;
        // 如果start小于1
        if (start < 1) {
          start = 1;
          // end是否可能超出
          end =
            start + this.myLimit - 1 > this.totalPage
              ? this.totalPage
              : start + this.myLimit - 1;
        }
        // end超过总页数
        if (end > this.totalPage) {
          end = this.totalPage;
          // 判断start是否小于1
          start = end - this.myLimit + 1 < 1 ? 1 : end - this.myLimit + 1;
        }
      }

      return { start, end };
    },

    // 改变页码
    changePage(page) {
      if (page <= 0 || page > this.totalPage) {
        alert("页码不正确");
        return;
      }
      if (this.myCurrentPage !== page) {
        this.myCurrentPage = page;
        // 通知父组件更改页码
        // 整理参数
        let pages = { page: this.myCurrentPage, pagesize: this.myPageSize };
        this.$emit("changepages", pages);
      }
      this.goPage = 1;
    },

    // 改变页面尺寸
    selectClass(e) {
      // e.target.value 是你选中的值
      this.myPageSize = parseInt(e.target.value);
      this.myCurrentPage = 1;
      this.goPage = 1;
      // 通知父组件更改页码
      // 通知父组件更改页码
      // 整理参数
      let pages = { page: this.myCurrentPage, pagesize: this.myPageSize };
      this.$emit("changepages", pages);
      // console.log(e.target.value);
    },
  },
  mounted() {},
  watch: {
    props: {
      handler() {
        this.myTotal = this.total;
        this.myPageSize = this.pagesize;
        this.myCurrentPage = this.currentpage;
        this.myLimit = this.limit;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  width: 800px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin: 5px auto;
  display: flex;
  justify-content: space-around;

  .container {
    .pre,
    .next {
      width: 25px;
      height: 25px;
      text-align: center;
      margin: 0 10px;
    }
    span {
      width: 20px;
      height: 20px;
      padding: 0 10px;
      cursor: pointer;
    }
    .disabled {
      pointer-events: none;
      opacity: 0.4;
      background-color: #444;
    }
  }
  .pagesize {
    height: 20px;
    margin: 5px 0;
  }
  .goPage {
    input {
      width: 30px;
      margin: 0 5px;
      outline: none;
    }
  }
  .active {
    color: skyblue;
  }
}
</style>