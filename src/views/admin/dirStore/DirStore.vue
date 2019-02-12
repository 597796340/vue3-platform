<template>
  <div>
    <div class="md-layout">
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
          <label>{{s_id}}</label>
          <md-input v-model="userId"></md-input>
        </md-field>
        <md-field class="md-layout-item item md-size-10">
          <label>QQ</label>
          <md-input v-model="qq"></md-input>
        </md-field>
        <md-field class="md-layout-item item md-size-10">
          <label>{{phoneMsg}}</label>
          <md-input v-model="phone"></md-input>
        </md-field>
        <md-button class="md-raised md-primary btn">
          <span style="vertical-align: middle;">{{search}}</span>
        </md-button>
      </div>
    </div>
    <md-table class="table" :value.sync="paginatedData" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar slot="md-table-toolbar">
        <h1 class="md-title">{{dirStore}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="s_id" md-sort-by="id">{{item.id}}</md-table-cell>
        <md-table-cell :md-label="phoneMsg" md-sort-by="phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="QQ" md-sort-by="qq">{{ item.qq }}</md-table-cell>
        <md-table-cell :md-label="status" md-sort-by="status">{{ item.status }}</md-table-cell>
        <md-table-cell :md-label="totalOrderCount" md-sort-by="totalOrderCount">{{ item.totalOrderCount }}</md-table-cell>
        <md-table-cell :md-label="endOrderCount" md-sort-by="endOrderCount">{{ item.endOrderCount }}</md-table-cell>
        <md-table-cell :md-label="regTime" md-sort-by="addTime">{{ item.addTime }}</md-table-cell>
        <md-table-cell :md-label="action">
          <a class="md-primary">{{remark}}</a>
        </md-table-cell>
      </md-table-row>
      <md-table-pagination slot="md-table-pagination" :md-data.sync="data" :md-paginated-data.sync="paginatedData" :md-page-size="10" :mdUpdate="updatePage"></md-table-pagination>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTablePagination from "@/components/MdTable/MdTablePagination.vue";
import MdTable from "@/components/MdTable/MdTable.vue";
import { IMerchant } from "@/model";
import {
  START_TIME,
  END_TIME,
  STOREID,
  PHONE_NUMBER,
  SEARCH,
  DIR_STORE,
  STATUS,
  TOTAL_ORDER_COUNT,
  END_ORDER_COUNT,
  REG_TIME,
  ACTION,
  REMARK
} from "@/content";

@Component({
  components: {
    MdTable,
    MdTablePagination
  }
})
export default class DirStore extends Vue {
  selectedDate = null;
  userId = null;
  phone = null;
  qq = null;
  data = {};
  startTime = START_TIME;
  endTime = END_TIME;
  s_id = STOREID;
  phoneMsg = PHONE_NUMBER;
  search = SEARCH;
  dirStore = DIR_STORE;
  status = STATUS;
  totalOrderCount = TOTAL_ORDER_COUNT;
  endOrderCount = END_ORDER_COUNT;
  regTime = REG_TIME;
  action = ACTION;
  remark = REMARK;
  paginatedData: any = [];

  created() {
    this.updatePage(1, 10, "username", "asc");
  }

  updatePage(page, pageSize, sortBy, sortOrder) {
    const data: IMerchant[] = [
      {
        id: 1,
        phone: "13755555555",
        qq: "555555555",
        status: "正常",
        addTime: "2018-10-10",
        totalOrderCount: 123,
        endOrderCount: 123
      },
      {
        id: 2,
        phone: "13755555555",
        qq: "555555555",
        status: "正常",
        addTime: "2018-10-10",
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
