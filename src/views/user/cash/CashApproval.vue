<template>
  <div>
    <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
      <md-dialog-title>提现申请</md-dialog-title>

      <form novalidate class="approvalForm">
        <md-field :class="getValidationClass('username')">
          <label>名称</label>
          <md-input v-model.trim="drawout.username" readonly />
        </md-field>
        <md-field :class="getValidationClass('balance')">
          <label>余额</label>
          <md-input v-model.trim="drawout.balance" readonly />
        </md-field>
        <md-field :class="getValidationClass('account')">
          <label>账户</label>
          <md-input v-model.trim="drawout.account" readonly />
        </md-field>
        <md-field :class="getValidationClass('accountHolder')">
          <label>开户人</label>
          <md-input v-model.trim="drawout.accountHolder" readonly />
        </md-field>
        <md-field :class="getValidationClass('bank')">
          <label>银行</label>
          <md-input v-model.trim="drawout.bank" readonly />
        </md-field>
        <md-field :class="getValidationClass('drawoutCash')">
          <label>提现金额</label>
          <md-input v-model.trim="$v.drawout.drawoutCash.$model" />
          <span class="md-error" v-if="!$v.drawout.drawoutCash.required||!$v.drawout.drawoutCash.minLength">{{drawoutCashError}}</span>
        </md-field>
        <md-field :class="getValidationClass('passwork')">
          <label>密码</label>
          <md-input v-model.trim="$v.drawout.passwork.$model" type="passwork" />
          <span class="md-error" v-if="!$v.drawout.passwork.required||!$v.drawout.passwork.minLength">{{passworkError}}</span>
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
import { validations } from "@/views/user/cash/drawout-validate";
import { IDrawout } from "@/model";
import { PASS_ERROR_MSG, AMOUNT_ERROR_MSG, CLOSE, SAVE } from "@/content";

@Component({
  mixins: [validationMixin],
  validations: validations
})
export default class CashApproval extends Vue {
  $v: any;
  sending = false;
  mode = "indeterminate";
  drawout: IDrawout = {
    username: "",
    balance: 0,
    bank: "",
    account: "",
    accountHolder: "",
    drawoutCash: 0,
    passwork: ""
  };

  drawoutCashError = AMOUNT_ERROR_MSG;
  passworkError = PASS_ERROR_MSG;
  closeMsg = CLOSE;
  saveMsg = SAVE;

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
    const field = this.$v.drawout[fieldName];
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
    const { bank, account, accountHolder } = this.drawout;
    // TODO: request bindCard action
    this.sending = false;
    this.save();
  }
}
</script>
<style lang="scss" scoped>
.approvalForm {
  padding: 0 20px;
}
.md-dialog {
  min-width: 420px;
  min-height: 640px;
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

