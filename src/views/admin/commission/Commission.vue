<template>
  <div>
    <md-tabs @md-changed="changeTab">
      <md-tab id="tab-fir" :md-label="first"></md-tab>
      <md-tab id="tab-sec" :md-label="second"></md-tab>
      <md-tab id="tab-th" :md-label="third"></md-tab>
    </md-tabs>
    <p>{{content}}</p>
    <md-table class="table" v-model="data" md-sort="money" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar slot="md-table-toolbar">
        <h1 class="md-title">{{tableTitle}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="cash" md-sort-by="money">{{item.money}}</md-table-cell>
        <md-table-cell :md-label="dirCash" md-sort-by="dirStoreCommission">{{ item.dirStoreCommission }}</md-table-cell>
        <md-table-cell :md-label="indirCash" md-sort-by="indirStoreCommission">{{ item.indirStoreCommission }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTable from "@/components/MdTable/MdTable.vue";
import { ICommission } from "@/model";
import { commissionTitle } from "@/views/showItem";
import {
  CASH,
  DIR_CASH,
  INDIR_CASH,
  FIRST_PROXY,
  SECOND_PROXY,
  THIRD_PROXY
} from "@/content";

@Component({
  components: {
    MdTable
  }
})
export default class IndirStore extends Vue {
  tableTitle = commissionTitle.get("tab-fir").title;
  content = commissionTitle.get("tab-fir").content;
  cash = CASH;
  dirCash = DIR_CASH;
  indirCash = INDIR_CASH;
  first = FIRST_PROXY;
  second = SECOND_PROXY;
  third = THIRD_PROXY;

  data = {};

  created() {
    this.getData();
  }

  changeTab(tab) {
    this.tableTitle = commissionTitle.get(tab).title;
    this.content = commissionTitle.get(tab).content;
  }

  getData() {
    const data: ICommission[] = [
      {
        money: "100-900",
        dirStoreCommission: 123,
        indirStoreCommission: 123
      },
      {
        money: "200-900",
        dirStoreCommission: 123,
        indirStoreCommission: 123
      }
    ];
    this.data = data;
  }
}
</script>
