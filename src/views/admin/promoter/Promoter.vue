<template>
  <div>
    <div class="md-layout">
      <md-button class="md-raised md-size-20 btn" @click="showDialog = true">
        <md-icon>add</md-icon>
        <span style="vertical-align: middle;">{{promoter}}</span>
      </md-button>

      <div class="actionGroup md-layout md-alignment-top-right">
        <div class="item">
          <md-datepicker v-model="selectedDate">
            <label>{{startTime}}</label>
          </md-datepicker>
        </div>
        <div class="item">
          <md-datepicker v-model="selectedDate">
            <label>{{endTime}}</label>
          </md-datepicker>
        </div>
        <md-field class="md-layout-item item md-size-10">
          <label>{{promoter}}</label>
          <md-input v-model="userId"></md-input>
        </md-field>
        <md-field class="md-layout-item item md-size-10">
          <label>{{phone}}</label>
          <md-input v-model="phone"></md-input>
        </md-field>
        <md-button class="md-raised md-primary btn">
          <span style="vertical-align: middle;">{{search}}</span>
        </md-button>
      </div>
    </div>
    <md-table class="table" :value.sync="paginatedData" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar slot="md-table-toolbar">
        <h1 class="md-title">{{promoter}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="promoterId" md-sort-by="id">{{item.id}}</md-table-cell>
        <md-table-cell :md-label="username" md-sort-by="username">{{ item.username }}</md-table-cell>
        <md-table-cell :md-label="phoneNumber" md-sort-by="phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="QQ" md-sort-by="qq">{{ item.qq }}</md-table-cell>
        <md-table-cell :md-label="rate" md-sort-by="rate">{{ item.rate }}</md-table-cell>
        <md-table-cell :md-label="amount" md-sort-by="amount">{{item.amount}}</md-table-cell>
        <md-table-cell :md-label="balance" md-sort-by="balance">{{ item.balance }}</md-table-cell>
        <md-table-cell :md-label="time" md-sort-by="time">{{ item.time }}</md-table-cell>
        <md-table-cell :md-label="totalOrderCount" md-sort-by="totalOrderCount">{{ item.totalOrderCount }}</md-table-cell>
        <md-table-cell :md-label="endOrderCount" md-sort-by="endOrderCount">{{ item.endOrderCount }}</md-table-cell>
        <md-table-cell :md-label="action">
          <a class="md-primary">{{edit}}</a>
          <a class="md-primary">{{reset}}</a>
        </md-table-cell>
      </md-table-row>
      <md-table-pagination slot="md-table-pagination" :md-data.sync="data" :md-paginated-data.sync="paginatedData" :md-page-size="10" :mdUpdate="updatePage"></md-table-pagination>
    </md-table>

    <AddPromoter :showDialog="showDialog" @close="closeDialog" @save="saveDialog"></AddPromoter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTablePagination from "@/components/MdTable/MdTablePagination.vue";
import MdTable from "@/components/MdTable/MdTable.vue";
import AddPromoter from "./AddPromoter.vue";
import { showMoney } from "@/views/showItem";
import { IPromoter } from "@/model";
import {
  PROMOTER,
  PROMOTERID,
  USERNAME,
  PHONE_NUMBER,
  RATE,
  AMOUNT,
  BALANCE,
  TIME,
  TOTAL_ORDER_COUNT,
  END_ORDER_COUNT,
  EDIT,
  RESET,
  ACTION,
  START_TIME,
  END_TIME,
  SEARCH
} from "@/content";

@Component({
  components: {
    MdTable,
    MdTablePagination,
    AddPromoter
  }
})
export default class Promoter extends Vue {
  showDialog = false;
  promoter = PROMOTER;
  promoterId = PROMOTERID;
  username = USERNAME;
  phoneNumber = PHONE_NUMBER;
  rate = RATE;
  amount = AMOUNT;
  balance = BALANCE;
  time = TIME;
  totalOrderCount = TOTAL_ORDER_COUNT;
  endOrderCount = END_ORDER_COUNT;
  action = ACTION;
  edit = EDIT;
  reset = RESET;
  startTime = START_TIME;
  endTime = END_TIME;
  search = SEARCH;

  selectedDate = null;
  userId = null;
  phone = null;
  data = {};
  paginatedData: any = [];

  created() {
    this.updatePage(1, 10, "username", "asc");
  }

  updatePage(page, pageSize, sortBy, sortOrder) {
    const data: IPromoter[] = [
      {
        id: 1,
        username: "Dubbin",
        phone: "13755555555",
        qq: "555555555",
        rate: 0.12,
        amount: 123,
        balance: 123,
        time: "2018-10-10",
        totalOrderCount: 123,
        endOrderCount: 123
      },
      {
        id: 2,
        username: "Shawna Dubbin",
        phone: "13755555555",
        qq: "555555555",
        rate: 0.12,
        amount: 123,
        balance: 123,
        time: "2018-10-10",
        totalOrderCount: 123,
        endOrderCount: 123
      }
    ];
    this.paginatedData = data;
    this.data = {
      mdData: data, // array with the currently page data, it returned by API
      mdCount: 6 // total row count
    };
  }

  closeDialog() {
    this.showDialog = false;
  }

  saveDialog() {
    // TODO: save promoter info and close dialog
    this.showDialog = false;
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
.btn {
  top: 10px;
}
a {
  background-color: transparent;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
  display: block;
}
</style>
