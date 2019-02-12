<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <div id="inspire" class="app">
        <app-toolbar></app-toolbar>
      </div>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
    <md-snackbar :md-position="snackbar.position" :md-duration="snackbar.time" :md-active.sync="snackbar.show" md-persistent>
      <span>{{ snackbar.text }}</span>
      <md-button class="md-primary" @click="snackbar.show= false">
        <md-icon>close</md-icon>
      </md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppToolbar from "@/components/AppToolbar.vue";
import {
  CHECK_LOGIN_EVENT,
  TOKEN_STORAGE_KEY,
  LOGOFF_EVENT,
  UPDATE_PASSWORD_EVENT
} from "@/content";
import { Route, default as VueRouter } from "vue-router";
import confJson from "@/config.json";

@Component({
  components: {
    AppToolbar
  }
})
export default class App extends Vue {
  snackbar = {
    position: "center",
    time: 3000,
    show: false,
    text: ""
  };
  constructor() {
    super();
  }

  // check is log in
  [CHECK_LOGIN_EVENT]() {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      this.$router.push(confJson["unAuthenticationRedirect"]);
    }
  }

  // lisen log out
  [LOGOFF_EVENT]() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.$router.push(confJson["unAuthenticationRedirect"]);
  }

  // lisen update password
  [UPDATE_PASSWORD_EVENT]() {
    // TODO turn to info page
    this.$router.push("");
  }
}
</script>

<style lang="scss">
#appRoot {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fafafa;
}
</style>
