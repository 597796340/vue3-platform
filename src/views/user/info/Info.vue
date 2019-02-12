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
          <label>{{tableLabel.o_id}}</label>
          <md-input v-model="orderId"></md-input>
        </md-field>
        <md-button class="md-raised md-primary btn">
          <span style="vertical-align: middle;">{{search}}</span>
        </md-button>
      </div>
    </div>
    <md-table class="table" v-model="paginatedData" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar slot="md-table-toolbar">
        <md-button class="md-raised md-primary" :disabled="downloadLoading" @click="handleDownload">
          <i class="md-icon" style="color:#fff">get_app</i>
          <span>{{exportMsg}}</span>
        </md-button>
        <p>{{exportTip}}</p>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="tableLabel.o_id" md-sort-by="id">{{item.id}}</md-table-cell>
        <md-table-cell :md-label="tableLabel.time" md-sort-by="time">{{ item.time }}</md-table-cell>
        <md-table-cell :md-label="tableLabel.amount" md-sort-by="amount">{{ item.amount }}</md-table-cell>
        <md-table-cell :md-label="tableLabel.balance" md-sort-by="balance">{{item.balance}}</md-table-cell>
        <md-table-cell :md-label="tableLabel.type" md-sort-by="type">{{ item.type }}</md-table-cell>
        <md-table-cell :md-label="tableLabel.remark" md-sort-by="remark">{{ item.remark }}</md-table-cell>
      </md-table-row>
      <md-table-pagination slot="md-table-pagination" :md-data.sync="data" :md-paginated-data.sync="paginatedData" :md-page-size="10" :mdUpdate="updatePage"></md-table-pagination>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTable from "@/components/MdTable/MdTable.vue";
import MdTablePagination from "@/components/MdTable/MdTablePagination.vue";
import { IOrderInfo } from "@/model";
import { WorkSheet } from "xlsx";
import {
  START_TIME,
  END_TIME,
  ORDERID,
  SEARCH,
  EXPORT,
  EXPORT_TIP,
  TIME,
  AMOUNT,
  BALANCE,
  TYPE,
  REMARK
} from "@/content";

@Component({
  components: {
    MdTable,
    MdTablePagination
  }
})
export default class Info extends Vue {
  table = {};
  downloadLoading = false;
  selectedDate = "";
  orderId: any = null;
  data = {};
  paginatedData: any = [];
  filename = "账户列表信息";
  startTime = START_TIME;
  endTime = END_TIME;
  search = SEARCH;
  exportMsg = EXPORT;
  exportTip = EXPORT_TIP;

  tableLabel = {
    id: ORDERID,
    time: TIME,
    amount: AMOUNT,
    balance: BALANCE,
    type: TYPE,
    remark: REMARK
  };

  created() {
    this.updatePage(1, 10, "username", "asc");
  }

  updatePage(page, pageSize, sortBy, sortOrder) {
    const data: IOrderInfo[] = [
      {
        id: 1,
        time: "2018-10-10",
        amount: 123,
        balance: 1234,
        type: "利润",
        remark: "正常"
      },
      {
        id: 2,
        time: "2018-10-10",
        amount: 123,
        balance: 1234,
        type: "利润",
        remark: "正常"
      }
    ];
    this.paginatedData = data;
    this.data = {
      mdData: data, // array with the currently page data, it returned by API
      mdCount: 6 // total row count
    };
  }

  formatJson(filterVal, jsonData) {
    return jsonData.map(v =>
      filterVal.map(j => {
        return v[j];
      })
    );
  }

  handleDownload() {
    this.downloadLoading = true;
    import("@/vendor/Export2Excel").then(excel => {
      const tHeader: any = [],
        filterVal: any = [];
      Object.keys(this.tableLabel).map(key => {
        filterVal.push(key);
        tHeader.push(this.tableLabel[key]);
      });
      const data = this.formatJson(filterVal, this.paginatedData);
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
        autoWidth: true,
        bookType: "xlsx"
      });
      this.downloadLoading = false;
    });
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

