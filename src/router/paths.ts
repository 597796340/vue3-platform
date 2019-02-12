export default [
  {
    path: "*",
    meta: {
      public: true
    },
    redirect: {
      path: "/404"
    }
  },
  {
    path: "/404",
    meta: {
      public: true
    },
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */
      `@/views/NotFound.vue`)
  },
  {
    path: "/403",
    meta: {
      public: true
    },
    name: "AccessDenied",
    component: () =>
      import(/* webpackChunkName: "deny" */
      `@/views/Deny.vue`)
  },
  {
    path: "/500",
    meta: {
      public: true
    },
    name: "ServerError",
    component: () =>
      import(/* webpackChunkName: "error" */
      `@/views/Error.vue`)
  },
  {
    path: "/test",
    meta: {
      title: "测试",
      public: true
    },
    name: "test",
    component: () =>
      import(/* webpackChunkName: "test" */
      `@/views/test.vue`)
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      public: true
    },
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */
      `@/views/user/login/Login.vue`)
  },
  {
    path: "/reset",
    meta: {
      title: "忘记密码",
      public: true
    },
    name: "resetpassword",
    component: () =>
      import(/* webpackChunkName: "reset" */
      `@/views/user/forget/ResetPassword.vue`)
  },
  {
    path: "/",
    meta: {},
    name: "Root",
    redirect: {
      name: "Home"
    }
  },
  {
    path: "/home",
    meta: {
      title: "首页"
    },
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */
      `@/views/admin/dashboard/Home.vue`)
  },
  {
    path: "/promoter",
    meta: {},
    name: "Promoter",
    component: () =>
      import(/* webpackChunkName: "promoter" */
      `@/views/admin/promoter/Promoter.vue`)
  },
  {
    path: "/indirStore",
    meta: {},
    name: "IndirStore",
    component: () =>
      import(/* webpackChunkName: "indirStore" */
      `@/views/admin/indirStore/IndirStore.vue`)
  },
  {
    path: "/dirStore",
    meta: {},
    name: "DirStore",
    component: () =>
      import(/* webpackChunkName: "dirStore" */
      `@/views/admin/dirStore/DirStore.vue`)
  },
  {
    path: "/commission",
    meta: {},
    name: "Commission",
    component: () =>
      import(/* webpackChunkName: "commission" */
      `@/views/admin/commission/Commission.vue`)
  },
  {
    path: "/info",
    meta: {},
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "info" */
      `@/views/user/info/Info.vue`)
  },
  {
    path: "/cashCenter",
    meta: {},
    name: "CashCenter",
    component: () =>
      import(/* webpackChunkName: "cashCenter" */
      `@/views/user/cash/CashCenter.vue`)
  },
  {
    path: "/cashDetail",
    meta: {},
    name: "CashDetail",
    component: () =>
      import(/* webpackChunkName: "cashDetail" */
      `@/views/user/cash/CashDetail.vue`)
  }
];
