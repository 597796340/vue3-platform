<template>
  <md-table :value.sync="paginatedData" md-sort="userName" md-sort-order="asc">
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="UUID" md-sort-by="uuid">{{ item.uuid }}</md-table-cell>
      <md-table-cell md-label="User Name" md-sort-by="userName">{{ item.userName }}</md-table-cell>
    </md-table-row>
    <md-table-pagination slot="md-table-pagination" :md-data.sync="data" :md-paginated-data.sync="paginatedData" :md-page-size="pageSize" :mdUpdate="updatePage"></md-table-pagination>
  </md-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MdTablePagination from "../components/MdTable/MdTablePagination.vue";
import MdTable from "../components/MdTable/MdTable.vue";

const allData = [
  {
    uuid: 1,
    userName: "test 1"
  },
  {
    uuid: 2,
    userName: "test 2"
  },
  {
    uuid: 3,
    userName: "test 3"
  },
  {
    uuid: 4,
    userName: "test 4"
  },
  {
    uuid: 5,
    userName: "test 5"
  },
  {
    uuid: 6,
    userName: "test 6"
  },
  {
    uuid: 7,
    userName: "test 4"
  },
  {
    uuid: 8,
    userName: "test 5"
  },
  {
    uuid: 9,
    userName: "test 6"
  }
];

@Component({
  components: {
    MdTable,
    MdTablePagination
  }
})
export default class Test extends Vue {
  data = {};
  paginatedData: any = [];
  pageSize = 5;

  created() {
    this.load();
  }

  load() {
    this.updatePage(1, this.pageSize, "userName", "asc");
  }

  updatePage(page, pageSize, sortBy, sortOrder) {
    // it will called when: page change, sort change and pageSize change
    // data: will get async data or static data
    const data = allData.slice((page - 1) * pageSize, page * pageSize);
    this.data = {
      mdData: data, // array with the currently page data, it returned by API
      mdCount: allData.length // total row count
    };
  }
}
</script>

<style lang="scss" scoped>
</style>