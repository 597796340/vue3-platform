<template>
  <div>
    <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
      <md-dialog-title>{{AddPromoter}}</md-dialog-title>

      <form novalidate class="addForm">
        <md-field :class="getValidationClass('username')">
          <label>{{username}}</label>
          <md-input v-model.trim="promoter.username"/>
          <span class="md-error" v-if="!$v.promoter.username.required||!$v.promoter.username.minLength">{{usernameError}}</span>
        </md-field>
        <md-field :class="getValidationClass('phone')">
          <label>{{phone}}</label>
          <md-input v-model.trim="promoter.phone"/>
        </md-field>
        <md-field :class="getValidationClass('qq')">
          <label>QQ</label>
          <md-input v-model.trim="promoter.qq"/>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label>{{password}}</label>
          <md-input v-model.trim="promoter.password"/>
          <span class="md-error" v-if="!$v.promoter.password.required||!$v.promoter.password.minLength">{{passError}}</span>
        </md-field>
        <md-field :class="getValidationClass('rate')">
          <label>{{rate}}</label>
          <md-input v-model.trim="promoter.rate"/>
          <span class="md-error" v-if="!$v.promoter.rate.required||!$v.promoter.rate.between">{{rateError}}</span>
        </md-field>
      </form>
      <div class="loading-overlay" v-if="sending">
        <md-progress-spinner :md-mode="mode"></md-progress-spinner>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="close()">{{closeMsg}}</md-button>
        <md-button class="md-raised md-primary" @click="validateForm">{{saveMsg}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { validations } from "@/views/admin/promoter/promoter-validate";
import { IPromoter } from "@/model";
import {
  USERNAME_ERROR_MSG,
  PASS_ERROR_MSG,
  RATE_ERROR_MSG,
  SAVE,
  CLOSE,
  USERNAME,
  PHONE_NUMBER,
  PASSWORD,
  RATE,
  ADDPROMOTER
} from "@/content";

@Component({
  mixins: [validationMixin],
  validations: validations
})
export default class AddPromoter extends Vue {
  $v: any;
  sending = false;
  AddPromoter = ADDPROMOTER;
  username = USERNAME;
  phone = PHONE_NUMBER;
  rate = RATE;
  password = PASSWORD;
  closeMsg = CLOSE;
  saveMsg = SAVE;
  usernameError = USERNAME_ERROR_MSG;
  passError = PASS_ERROR_MSG;
  rateError = RATE_ERROR_MSG;
  mode = "indeterminate";
  promoter: IPromoter = {
    id: 1,
    username: "",
    password: "",
    phone: "",
    qq: "",
    rate: 0
  };

  @Prop()
  showDialog;

  @Emit("close")
  close() {}

  @Emit("save")
  save() {}

  created() {
    // TODO: get Account info
  }

  getValidationClass(fieldName) {
    const field = this.$v.promoter[fieldName];
    if (field) {
      return field.$invalid && field.$dirty ? "md-invalid" : "";
    }
  }

  validateForm() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.submit();
    }
  }

  async submit() {
    this.sending = true;
    const { id, username, password, phone, qq, rate } = this.promoter;
    // TODO: request bindCard action
    this.sending = false;
    this.save();
  }
}
</script>
<style lang="scss" scoped>
.addForm {
  padding: 0 20px;
}
.md-dialog {
  min-width: 420px;
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
</style>

