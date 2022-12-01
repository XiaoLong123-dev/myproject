<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构-内容 -->
      <el-card class="departments-head">
        <!-- 放置结构内容 -->
        <treeTools :treeNode="company" @showAddDep="showAddDep"> </treeTools>
      </el-card>
      <!-- 树形组件结构 -->
      <!--node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 
            default-expand-all	是否默认展开所有节点
            allow-drag	判断节点能否被拖拽 
               allow-drop	拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，
               分别表示放置在目标节点前、插入至目标节点和放置在目标节点后-->
      <el-card class="departments-tree">
        <el-tree :data="departs" node-key="id" default-expand-all>
          <!-- 作用域插槽 -->
          <!-- 传入插槽内容 使用 scoped slot 会传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据-->
          <!-- slot-scope="obj" 接受传给插槽的内容-->
          <!-- 引入组件 -->
          <treeTools
            slot-scope="{ data }"
            :treeNode="data"
            @deleteDepts="deleteDepts"
            @showAddDep="showAddDep"
            @editDepts="editDepts"
          >
            <!-- 下拉菜单 -->
          </treeTools>
          <!-- 插槽内容 -->
        </el-tree>
      </el-card>
      <AddDepartment
        v-bind:showDialog.sync="showDialog"
        :treeNode="currentNode"
        @getData="getDepartmentsList"
        ref="adddepartment"
      ></AddDepartment>
    </div>
  </div>
</template>

<script>
import treeTools from "./components/treeTools.vue";
import { getDepartments } from "@/api/departments";
import { tranListToTree } from "@/utils";
import AddDepartment from "./components/addDepartment.vue";
export default {
  name: "Departments",
  components: {
    treeTools,
    AddDepartment,
  },
  data() {
    return {
      // 需要展示的上层结构
      company: {
        name: "组织架构管理",
        icon: "el-icon-office-building",
        manager: "负责人",
        type: "top",
        // 头部添加部门的时候，id是undefined,pid=''无法参与判断将要添加的部门是否重复
        id: "",
      },
      // 需要展示的下层结构
      departs: [],
      // 根据定义的属性查找节点，与data对应
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 添加部门的弹窗
      showDialog: false,
      // 当前节点
      currentNode: {},
    };
  },
  mounted() {
    // 获取企业的部门列表
    this.getDepartmentsList();
  },
  methods: {
    // 获取企业的部门列表
    async getDepartmentsList() {
      let result = await getDepartments();
      let arr = tranListToTree(result.data.depts, "");
      this.departs = arr;
    },

    // 删除部门的自定义事件
    deleteDepts() {
      // 重新获取数据
      this.getDepartmentsList();
    },

    // 点击添加部门的事件
    showAddDep(value) {
      this.showDialog = true;
      // 记录当前节点
      this.currentNode = value;
    },

    // 编辑部门的回调
    editDepts(node) {
      // console.log(node);
      this.currentNode = node;
      // 弹出对话框，和添加部门使用同一个组件
      this.showDialog = true;
      // 在这里调用子组件的获取部门详情的方法，
      this.$refs.adddepartment.getDeptsDetails(node.id);
    },
  },
};
</script>

<style lang="less" scoped>
.departments-head {
  /* 下拉菜单 */
  font-size: 14px;
  margin: 10px 0;
}
</style>