<template>
  <div class="home md-gutter">
    <md-card class="md-layout">
      <md-card class="md-layout-item md-size-20" v-for="(item, index) in showMoney" :key="index">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{item.value + item.unit}}</div>
            <div class="md-subhead">{{item.title}}</div>
          </md-card-header-text>
        </md-card-header>
      </md-card>
    </md-card>
    <md-card class="md-layout">
      <md-card class="md-layout-item md-size-20" v-for="(item, index) in showMerchant" :key="index">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{item.value + item.unit}}</div>
            <div class="md-subhead">{{item.title}}</div>
          </md-card-header-text>
        </md-card-header>
      </md-card>
    </md-card>
    <md-card class="md-layout">
      <md-card class="md-layout-item md-size-20" v-for="(item, index) in showBuyer" :key="index">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{item.value + item.unit}}</div>
            <div class="md-subhead">{{item.title}}</div>
          </md-card-header-text>
        </md-card-header>
      </md-card>
    </md-card>
    <md-card>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{shareTitle}}</div>
          <div class="md-subhead">{{shareMsg}}</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <md-input v-model="shareLink" readonly/>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button ref="copy" :data-clipboard-text="shareLink" @click="copyValue">{{copy}}</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

    <md-dialog-alert :md-active.sync="success" :md-content="resMsg" :md-confirm-text="confirm"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClipboardJS from "clipboard";
import { showMoney, showMerchant, showBuyer } from "@/views/showItem";
import { getShareUrl } from "@/api/getData";
import {
  SHARE_TITLE,
  SHARE_MSG,
  COPY,
  COPY_SUCCESS,
  COPY_FAILED,
  CONFIRM
} from "@/content";

@Component
export default class Home extends Vue {
  success = false;
  shareTitle = SHARE_TITLE;
  shareMsg = SHARE_MSG;
  copy = COPY;
  resMsg = "";
  confirm = CONFIRM;
  showMoney = showMoney;
  showMerchant = showMerchant;
  showBuyer = showBuyer;
  shareLink = "http://XXXX";
  clipboard: any;

  async mounted() {
    this.clipboard = new ClipboardJS((<any>this.$refs.copy).$el, "copy");
    const res = await getShareUrl();
    // if (res.code) {
    //   this.shareLink = res.shareUrl;
    // }
  }

  copyValue() {
    this.clipboard.on("success", () => {
      this.success = true;
      this.resMsg = COPY_SUCCESS;
    });
    this.clipboard.on("error", () => {
      this.success = true;
      this.resMsg = COPY_FAILED;
    });
  }
}
</script>

<style lang="scss" scoped>
.md-layout {
  padding-top: 20px;
  margin-bottom: 20px;
}
.md-layout-item {
  min-width: 250px;
  margin-bottom: 20px;
}
</style>
