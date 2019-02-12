<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{title}}</div>
        <div class="md-subheading">{{subTitle}}</div>
      </md-card-header>
      <md-card-content>
        <md-steppers :md-active-step.sync="active" md-vertical md-linear>
          <md-step id="first" :md-label="steps[0]" :md-editable="false" :md-done.sync="first">
            <md-content class="md-accent">{{tip[0]}}</md-content>
            <div v-if="isBind">
              <p>{{bind}}</p>
              <md-button class="md-raised md-primary" @click="active='second'">{{next}}</md-button>
            </div>
            <md-card class="bindForm" v-else>
              <md-card-content>
                <form novalidate>
                  <md-field :class="getValidationClass('bank')">
                    <label>{{bank}}</label>
                    <md-input v-model.trim="$v.bankCard.bank.$model" autofocus />
                    <span class="md-error" v-if="!$v.bankCard.bank.required||!$v.bankCard.bank.minLength">{{bankError}}</span>
                  </md-field>
                  <md-field :class="getValidationClass('account')">
                    <label>{{account}}</label>
                    <md-input v-model.trim="$v.bankCard.account.$model" />
                    <span class="md-error" v-if="!$v.bankCard.account.required||!$v.bankCard.account.minLength">{{accountError}}</span>
                  </md-field>
                  <md-field :class="getValidationClass('accountHolder')">
                    <label>{{holder}}</label>
                    <md-input v-model.trim="$v.bankCard.accountHolder.$model" />
                    <span class="md-error" v-if="!$v.bankCard.accountHolder.required||!$v.bankCard.accountHolder.minLength">{{holderError}}</span>
                  </md-field>
                </form>
                <div class="loading-overlay" v-if="sending">
                  <md-progress-spinner :md-mode="mode"></md-progress-spinner>
                </div>
              </md-card-content>
              <md-card-actions>
                <md-button class="md-raised md-primary" @click="validateForm">{{addBind}}</md-button>
              </md-card-actions>
            </md-card>
          </md-step>
          <md-step id="second" :md-label="steps[1]" :md-editable="false" :md-done.sync="second">
            <p>{{tip[1]}}</p>
            <p>{{tip[2]}}</p>
            <md-button class="md-raised md-primary" @click="showDialog = true">{{approvalBtn}}</md-button>
            <cash-approval :showDialog="showDialog" @close="closeDialog" @save="saveDialog"></cash-approval>
          </md-step>
          <md-step id="third" :md-label="steps[2]" :md-editable="false" :md-done.sync="third">
            <p>{{tip[3]}}</p>
            <md-content class="md-accent">{{tip[4]}}</md-content>
          </md-step>
        </md-steppers>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { validations } from "@/views/user/cash/bankCard-validate";
import { IBankCard } from "@/model";
import CashApproval from "./CashApproval.vue";
import {
  BANK_ERROR_MSG,
  ACCOUNT_ERROR_MSG,
  HOLDER_ERROR_MSG,
  BANK,
  ACCOUNT,
  HOLDER,
  BIND,
  ADD_BIND,
  NEXT,
  CASH_CENTER_TITLE,
  CASH_CENTER_SUBTITLE,
  CASH_CENTER_STEP,
  CASH_CENTER_STEP_TIP,
  APPROVAL
} from "@/content";

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    CashApproval
  }
})
export default class CashCenter extends Vue {
  $v: any;
  sending = false;
  active = "first";
  isBind = false;
  first = false;
  second = false;
  third = false;
  showDialog = false;

  title = CASH_CENTER_TITLE;
  subTitle = CASH_CENTER_SUBTITLE(0);
  steps = CASH_CENTER_STEP;
  bank = BANK;
  account = ACCOUNT;
  holder = HOLDER;
  bankError = BANK_ERROR_MSG;
  accountError = ACCOUNT_ERROR_MSG;
  holderError = HOLDER_ERROR_MSG;
  bind = BIND;
  addBind = ADD_BIND;
  next = NEXT;
  tip = CASH_CENTER_STEP_TIP;
  approvalBtn = APPROVAL;

  mode = "indeterminate";
  bankCard: IBankCard = {
    bank: "",
    account: "",
    accountHolder: ""
  };

  created() {
    // TODO: get account balance
    this.subTitle = CASH_CENTER_SUBTITLE(123.123);
    // TODO: get isBind card
  }

  getValidationClass(fieldName) {
    const field = this.$v.bankCard[fieldName];
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
    const { bank, account, accountHolder } = this.bankCard;
    // TODO: request bindCard action
    this.isBind = true;
    this.active = "second";
  }

  closeDialog() {
    this.showDialog = false;
  }

  saveDialog() {
    this.showDialog = false;
    this.active = "third";
  }
}
</script>
<style lang="scss" scoped>
.cashCard {
  padding-right: 30px;
  margin-bottom: 15px;
  display: inline-block;
  vertical-align: top;
}
.bindForm {
  width: 400px;
  margin-top: 15px;
}
.md-content {
  padding: 0 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
