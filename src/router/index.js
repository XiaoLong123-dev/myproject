import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Login = () => import("@/pages/login");
const Layout = () => import("@/layout/Layout");
const Import = () => import("@/pages/import");

// 二级路由
const Home = () => import("@/pages/home");

// 引入多个模块的规则
import approvalsRouter from "./modules/approvals";
import departmentsRouter from "./modules/departments";
import employeesRouter from "./modules/employees";
import permissionRouter from "./modules/permission";
import attendancesRouter from "./modules/attendances";
import salarysRouter from "./modules/salarys";
import settingRouter from "./modules/setting";
import socialRouter from "./modules/social";

// 静态路由
export const constRoutes = [
  {
    path: "/login",
    component: Login,
    // 不在菜单中显示
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/pages/404.vue"),
    // 不在菜单中显示
    hidden: true,
  },
  // 匹配不到的时候
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "首页", icon: "el-icon-s-platform" },
    children: [
      {
        path: "/home",
        component: Home,
        name: "home",
        meta: { title: "主页", icon: "el-icon-s-platform" },
      },
      // excel导入
      {
        path: "/import",
        name: "import",
        component: Import,
        meta: { title: "excel导入" },
        hidden: true,
      },
    ],
  },
];

// 动态路由
export const asyncRouter = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
];

const createRouter = () =>
  new VueRouter({
    mode: "history",
    // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
    scrollBehavior: () => ({ y: 0 }),
    // 临时合并静态路由和动态路由
    routes: [...constRoutes, ...asyncRouter],
    // routes: constRoutes,
  });

const router = createRouter();

// export function resetRouter() {
//   const newRouter = createRouter();
//   router.matcher = newRouter.matcher;
// }

export default router;
