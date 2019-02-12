<template>
  <div>
    <md-table class="table" v-model="paginatedData" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar slot="md-table-toolbar">
        <div class="md-title">{{title}}</div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="id" md-sort-by="id">{{item.id}}</md-table-cell>
        <md-table-cell :md-label="time" md-sort-by="time">{{item.time}}</md-table-cell>
        <md-table-cell :md-label="amount" md-sort-by="amount">{{item.amount}}</md-table-cell>
        <md-table-cell :md-label="bank" md-sort-by="bank">{{item.bank}}</md-table-cell>
        <md-table-cell :md-label="account" md-sort-by="account">{{item.account}}</md-table-cell>
        <md-table-cell :md-label="accountHolder" md-sort-by="accountHolder">{{item.accountHolder}}</md-table-cell>
        <md-table-cell :md-label="operateTime" md-sort-by="operateTime">{{item.operateTime}}</md-table-cell>
        <md-table-cell :md-label="status" md-sort-by="status">{{item.status}}</md-table-cell>
      </md-table-row>
      <md-table-pagination slot="md-table-pagination" :md-data.sync="data" :md-paginated-data.sync="paginatedData" :md-page-size="10" :mdUpdate="updatePage"></md-table-pagination>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTable from "@/components/MdTable/MdTable.vue";
import MdTablePagination from "@/components/MdTable/MdTablePagination.vue";
import {
  ORDERID,
  TIME,
  AMOUNT,
  BALANCE,
  TYPE,
  REMARK,
  STATUS,
  ACTION_TIME,
  BANK,
  ACCOUNT,
  HOLDER,
  CASH_DETAIL_TITLE
} from "@/content";

@Component({
  components: {
    MdTable,
    MdTablePagination
  }
})
export default class CashDetail extends Vue {
  id = ORDERID;
  time = TIME;
  amount = AMOUNT;
  bank = BANK;
  account = ACCOUNT;
  accountHolder = HOLDER;
  operateTime = ACTION_TIME;
  status = STATUS;
  title = CASH_DETAIL_TITLE;
  data = {};
  paginatedData: any = [];

  created() {
    this.updatePage(1, 10, "username", "asc");
  }

  updatePage(page, pageSize, sortBy, sortOrder) {
    const data = [
      {
        id: 1,
        time: "2018-10-10",
        amount: 123,
        bank: 1234,
        account: "利润",
        accountHolder: "正常",
        operateTime: "",
        status: ""
      },
      {
        id: 2,
        time: "2018-10-10",
        amount: 123,
        bank: 1234,
        account: "利润",
        accountHolder: "正常",
        operateTime: "",
        status: ""
      }
    ];
    this.paginatedData = data;
    this.data = {
      mdData: data, // array with the currently page data, it returned by API
      mdCount: 6 // total row count
    };
  }
}
</script>
<style lang="scss" scoped>
.actionGroup {
  right: 0;
  display: flex;
  .item {
    margin-right: 10px;
  }
}
</style>

