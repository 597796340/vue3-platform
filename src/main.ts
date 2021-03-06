import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueMaterial from "vue-material";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueMaterial);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
