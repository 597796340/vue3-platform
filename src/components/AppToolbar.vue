<template>
  <div class="page-container">
    <md-app class="toolbar">
      <md-app-toolbar class="md-primary" md-elevation="3">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{appConfig.titelContent}}</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-menu md-size="medium" md-align-trigger>
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>account_circle</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item v-for="(item, index) in appConfig.toolBarActions" :key="index" @click="bindAction(item.action)">
                  <md-icon>{{item.icon}}</md-icon>
                  <span>{{item.name}}</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-primary" md-elevation="3">
          <span class="md-title">LOGO</span>
        </md-toolbar>
        <md-list>
          <md-list-item v-for="(item, index) in appConfig.navItemList" :key="index" @click="navigateTo(item.to)">
            <md-icon>{{item.icon}}</md-icon>
            <span class="md-list-item-text">{{item.name}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </md-app-content>
    </md-app>

    <md-dialog-confirm :md-active.sync="active" :md-content="logout_tip" :md-confirm-text="confirm" :md-cancel-text="cancel" @md-cancel="active = false" @md-confirm="onConfirm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SideNavDataList } from "@/configurer/conf.interface";
import { AppConfigService } from "@/configurer/app-config.service";
import {
  CHECK_LOGIN_EVENT,
  LOGOFF_EVENT,
  LOGOUT_TIP,
  CONFIRM,
  CANCEL
} from "@/content";

@Component
export default class AppToolbar extends Vue {
  logout_tip = LOGOUT_TIP;
  confirm = CONFIRM;
  cancel = CANCEL;
  active = false;
  menuVisible = true;
  appConfig: SideNavDataList;
  configService = new AppConfigService();

  constructor() {
    super();
    this.appConfig = this.configService.get<SideNavDataList>();
    // check is log in
    // this.$parent[CHECK_LOGIN_EVENT]();
  }

  onConfirm() {
    this.active = false;
    this.$parent[LOGOFF_EVENT]();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(url: string) {
    this.$router.push(url);
  }

  bindAction(event: string) {
    event === LOGOFF_EVENT ? (this.active = true) : this.$parent[event]();
  }
}
</script>

<style scoped lang="scss">
.md-app {
  height: 100vh;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  height: 100vh;
  z-index: 5;
}
</style>
