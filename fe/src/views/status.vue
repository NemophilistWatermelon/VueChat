<template>
  <div class="status">
    <div class="tit">
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
      <div class="main-band">
          <router-view></router-view>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "status"
});
</script>

<style scoped>
.tit,.status{
    height: inherit;
}
.tit a {
  text-decoration: none;
  display: inline-block;
  padding: 14px;
  font-size: 12px;
  color: white;
  background-color: #393939;
}
.router-link-active {
  transition: all 0.5s;
  color: white !important;
  background-color: crimson !important;
}
.main-band{
  
    margin: 0 15px;
    box-shadow: 0 0 1px 0 #d6d6d6;
    height: 458px;
}
</style>