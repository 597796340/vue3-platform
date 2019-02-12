<template>
  <div class="centered-container">
    <md-content class="md-elevation-8">
      <div class="title">
        <div class="md-title">{{forget}}——{{title}}</div>
        <div class="md-body-1">{{title_body}}</div>
      </div>
      <form novalidate>
        <md-field :class="getValidationClass('phoneNumber')">
          <label>{{phone}}</label>
          <md-input v-model.trim="$v.reset.phoneNumber.$model" />
          <md-button class="sendCode" :disabled="sendingCode" @click="handleSendCode">{{sendCodeMsg}}</md-button>
          <span class="md-error" v-if="!$v.reset.phoneNumber.required||!$v.reset.phoneNumber.minLength">{{phoneErrorMsg}}</span>
        </md-field>

        <md-field :class="getValidationClass('verificationCode')">
          <label>{{code}}</label>
          <md-input v-model.trim="$v.reset.verificationCode.$model" />
          <span class="md-error" v-if="!$v.reset.verificationCode.required">{{codeErrorMsg}}</span>
        </md-field>

        <md-field :class="getValidationClass('password')">
          <label>{{password}}</label>
          <md-input v-model.trim="$v.reset.password.$model" type="password" />
          <span class="md-error" v-if="!$v.reset.password.required||!$v.reset.password.minLength">{{passErrorMsg}}</span>
        </md-field>

        <md-field :class="getValidationClass('rePassword')">
          <label>{{rePassword}}</label>
          <md-input v-model.trim="$v.reset.rePassword.$model" type="password" />
          <span class="md-error" v-if="!$v.reset.rePassword.required||
              !$v.reset.rePassword.minLength||!$v.reset.rePassword.sameAsPassword">{{passErrorMsg}}</span>
        </md-field>
      </form>
      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/login">{{cancel}}</a>
        <md-button class="md-raised md-primary" @click="validateForm($event)">{{confirm}}</md-button>
      </div>
      <div class="loading-overlay" v-if="sending">
        <md-progress-spinner :md-mode="mode"></md-progress-spinner>
      </div>
    </md-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  PASSWORD,
  TITLE,
  TITLE_BODY,
  FORGET,
  REPASSWORD,
  CONFIRM,
  CANCEL,
  PHONE_NUMBER,
  CODE,
  SEND_CODE_MSG,
  PHONE_ERROR_MSG,
  CODE_ERROR_MSG,
  PASS_ERROR_MSG
} from "@/content";
import { validationMixin } from "vuelidate";
import { validations } from "./reset-validate";
import { IResetPassOption } from "@/model";
import { resetPassword } from "@/api/getData";

@Component({
  mixins: [validationMixin],
  validations: validations
})
export default class Reset extends Vue {
  $v: any;
  sending = false;
  sendingCode = false;

  title = TITLE;
  title_body = TITLE_BODY;
  phone = PHONE_NUMBER;
  code = CODE;
  password = PASSWORD;
  rePassword = REPASSWORD;
  forget = FORGET;
  cancel = CANCEL;
  confirm = CONFIRM;

  phoneErrorMsg = PHONE_ERROR_MSG;
  codeErrorMsg = CODE_ERROR_MSG;
  sendCodeMsg = SEND_CODE_MSG;
  passErrorMsg = PASS_ERROR_MSG;

  mode = "indeterminate";
  timer: any;
  reset: IResetPassOption = {
    phoneNumber: "",
    verificationCode: "",
    password: "",
    rePassword: ""
  };

  async handleSendCode() {
    if (!this.timer) {
      let num = 60;
      this.timer = setInterval(() => {
        if (!num) {
          this.sendCodeMsg = SEND_CODE_MSG;
          clearInterval(this.timer);
          this.timer = undefined;
        } else {
          this.sendCodeMsg = `${num--}秒`;
        }
      }, 1000);
      // TODO: 请求后台获取验证码
      //   const res = await login();
    }
  }

  getValidationClass(fieldName) {
    const field = this.$v.reset[fieldName];
    if (fieldName === "phoneNumber") {
      this.sendingCode = !(
        this.$v.reset.phoneNumber.minLength && this.$v.reset.phoneNumber.$dirty
      );
    }
    if (field) {
      return field.$invalid && field.$dirty ? "md-invalid" : "";
    }
  }

  validateForm() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.sending = true;
      this.submit();
    }
  }

  async submit() {
    // TODO: turn to login page
    const { phoneNumber, verificationCode, password, rePassword } = this.reset;
    const res = await resetPassword({
      phoneNumber,
      verificationCode,
      password,
      rePassword
    });
    // if (res.code) {
    //   this.$router.push("/login");
    // }
  }
}
</script>

<style lang="scss" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .md-button.sendCode {
    height: 32px;
    margin: 0;
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
