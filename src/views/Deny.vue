<template>
  <div id="403">
    <div class="md-layout md-alignment-center-center">
      <div>
        <img src="/static/error/403.svg" alt="">
      </div>          
      <div>
        <h1>403</h1>
        <h2 class="my-3 headline ">Sorry, access denied.</h2>
        <md-button class="md-raised md-primary" @click="goHome">Go Home</md-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Deny extends Vue {
  goHome() {
    this.$router.push({ path: "/" });
  }
}
</script>
<style scoped lang="scss">
  #403 {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
  }
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;    
  }
</style>