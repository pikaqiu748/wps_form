import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "defalut",
    redirect: "/firstPage",
    component: () => import("@/views/FirstHome.vue"),
    meta: {
      title: "介绍主页",
    },
    children: [
      {
        path: "/firstPage",
        name: "firstPage",
        component: () => import("@/components/homePage/FirstPage.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/solution",
        name: "solution",
        component: () => import("@/components/homePage/Solution.vue"),
        meta: {
          title: "行业解决方案",
        },
      },
      {
        path: "/freeTemplate",
        name: "freeTemplate",
        component: () => import("@/components/homePage/FreeTemplate.vue"),
        meta: {
          title: "免费模板",
        },
      },
      {
        path: "/help",
        name: "help",
        component: () => import("@/components/homePage/Help.vue"),
        meta: {
          title: "帮助中心",
        },
      },
    ],
  },
  {
    // 子路由前面不需要加'/'
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      title: "注册",
    },
  },
  {
    path: "/usercenter",
    name: "usercenter",
    component: () => import("@/views/UserCenter.vue"),
    meta: {
      title: "个人中心",
      requireAuth: true,
    },
  },
  {
    path: "/createForm",
    name: "createForm",
    component: () => import("@/views/CreateForm.vue"),
    meta: {
      title: "新建表单",
      requireAuth: true,
    },
  },

  {
    path: "/formStaticsDetail",
    name: "FormStaticsDetail",
    // component:
    meta: {
      title: "数据统计&分析",
      requireAuth: true,
    },
    component: () => import("@/views/FormStaticsDetail.vue"),
    redirect: "/formStaticsDetail/formInfo/formStatics",
    children: [
      {
        name: "FormInfo",
        path: "formInfo",
        component: () => import("@/views/FormInfo.vue"),
        meta: {
          title: "表单详情",
          requireAuth: true,
        },
        // redirect: '/formInfo/formDetail',
        children: [
          {
            name: "FormStatics",
            path: "formStatics",
            component: () => import("@/components/FormStatics.vue"),
          },
          {
            name: "FormDetail",
            path: "formDetail",
            component: () => import("@/components/FormDetail.vue"),
          },
        ],
      },
      {
        name: "FormProblem",
        path: "formProblem",
        component: () => import("@/views/FormQuestion.vue"),
        meta: {
          title: "表单问题",
          requireAuth: true,
        },
      },
      {
        name: "FormShare",
        path: "formShare",
        component: () => import("@/views/FormShare.vue"),
        meta: {
          title: "表单分享",
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/submitSucceed/:formId",
    name: "submitSucceed",
    component: () => import("@/views/SubmitSucceed.vue"),
    meta: {
      title: "提交成功",
      // requireAuth: true,
    },
  },
  {
    path: "/FormQuestion",
    name: "FormQuestion",
    component: () => import("@/views/FormQuestion.vue"), //.vue不能省略
    meta: {
      title: "表单问题",
      requireAuth: true,
    },
  },
  {
    path: "/WatchDetail",
    name: "WatchDetail",
    component: () => import("@/views/WatchDetail.vue"),
    meta: {
      title: "查看详情",
      requireAuth: true,
    },
  },
  {
    path: "/FormPreview",
    name: "FormPreview",
    component: () => import("@/views/FormPreview.vue"), //.vue不能省略
    meta: {
      title: "表单预览",
      requireAuth: true,
    },
  },
  {
    path: "/writeform/:formId",
    name: "writeform",
    component: () => import("@/views/WriteForm.vue"), //.vue不能省略
    meta: {
      title: "表单填写",
      // requireAuth: true,
    },
  },
];
export default routes;
