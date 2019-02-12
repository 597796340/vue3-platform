import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: paths,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
router.beforeEach((to, from, next) => {
  // console.log("TODO check logined");
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
