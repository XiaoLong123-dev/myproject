// 引入layout(因为需要他的布局)
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
import Layout from "@/layout/Layout.vue";

// 暴露工资管理的路由规则(单个路由规则以对象的形式暴露)
export default {
  path: "/salarys",
  component: Layout,
  name: "salarys",
  meta: { title: "工资管理", icon: "el-icon-s-platform" },
  // 配置二级路的路由表
  children: [
    {
      path: "/salarys", // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import("@/pages/salarys"),
      name: "salarys", // 给路由规则加一个name，权限管理需要用

      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: "工资管理", // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: "el-icon-s-platform",
      },
    },
    // 工资设置
    {
      path: "/salarys/setting",
      component: () => import("@/pages/salarys/setting.vue"),
      hidden: true,
      meta: {
        title: "工资设置", // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: "el-icon-s-platform",
      },
    },
    // 工资详情
    {
      path: "/salarys/details/:yearMonth/:id",
      component: () => import("@/pages/salarys/detail.vue"),
      hidden: true,
      meta: {
        title: "工资详情", // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: "el-icon-s-platform",
      },
    },
  ],
};
// 当你的访问地址 是 /salarys的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
