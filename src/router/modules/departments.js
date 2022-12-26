// 引入layout(因为需要他的布局)
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
import Layout from "@/layout/Layout.vue";

// 暴露组织架构管理的路由规则(单个路由规则以对象的形式暴露)
export default {
  path: "/departments",
  component: Layout,
  name: "departments",
  meta: { title: "架构管理", icon: "el-icon-s-platform" },
  // 配置二级路的路由表
  children: [
    {
      path: "/departments", // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import("@/pages/departments"),
      name: "departments", // 给路由规则加一个name，权限管理需要用

      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: "组织架构", // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: "el-icon-s-platform",
      },
    },
  ],
};
// 当你的访问地址 是 /departments的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
