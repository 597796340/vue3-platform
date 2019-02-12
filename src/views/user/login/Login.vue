<template>
  <div class="centered-container">
    <md-content class="md-elevation-8">
      <div class="title">
        <div class="md-title">{{login_msg}}——{{title}}</div>
        <div class="md-body-1">{{title_body}}</div>
      </div>
      <form novalidate>
        <md-field :class="getValidationClass('username')">
          <label>{{username}}</label>
          <md-input v-model.trim="$v.login.username.$model" autofocus/>
          <span class="md-error" v-if="!$v.login.username.required||!$v.login.username.minLength">{{usernameError}}</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label>{{password}}</label>
          <md-input v-model.trim="$v.login.password.$model" type="password"/>
          <span class="md-error" v-if="!$v.login.password.required||!$v.login.password.minLength">{{passError}}</span>
        </md-field>
      </form>
      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/reset">{{forget}}</a>
        <md-button class="md-raised md-primary" @click="validateForm">{{login_msg}}</md-button>
      </div>
      <div class="loading-overlay" v-if="sending">
        <md-progress-spinner :md-mode="mode"></md-progress-spinner>
      </div>
    </md-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { default as Component } from "vue-class-component";
import {
  USERNAME,
  PASSWORD,
  TITLE,
  TITLE_BODY,
  LOGIN,
  FORGET,
  CHECK_LOGIN_EVENT,
  LOGOFF_EVENT,
  UPDATE_PASSWORD_EVENT,
  TOKEN_STORAGE_KEY,
  USERNAME_ERROR_MSG,
  PASS_ERROR_MSG
} from "@/content";
import { validationMixin } from "vuelidate";
import { validations } from "./login-validate";
import { ILoginOption } from "@/model";
import { login } from "@/api/getData";

@Component({
  mixins: [validationMixin],
  validations: validations
})
export default class Login extends Vue {
  $v: any;
  sending = false;

  title = TITLE;
  title_body = TITLE_BODY;
  username = USERNAME;
  password = PASSWORD;
  login_msg = LOGIN;
  forget = FORGET;
  usernameError = USERNAME_ERROR_MSG;
  passError = PASS_ERROR_MSG;

  mode = "indeterminate";
  login: ILoginOption = {
    username: "",
    password: ""
  };

  getValidationClass(fieldName) {
    const field = this.$v.login[fieldName];
    if (field) {
      return field.$invalid && field.$dirty ? "md-invalid" : "";
    }
  }

  validateForm(e) {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.submit();
    }
  }

  async submit() {
    this.sending = true;
    const res: any = await login({
      username: this.login.username,
      password: this.login.password
    });
    if (res) {
      console.log(res);

      localStorage.setItem(TOKEN_STORAGE_KEY, res.accessToken);
      this.sending = false;
      this.$router.push("/home");
    }
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
