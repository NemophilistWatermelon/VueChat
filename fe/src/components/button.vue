<template>
  <div class="btn">
    <div class="form-group">
      <input :type="type" class="btn-primary" :value="btnName" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "btn",
  props: {
    type:{
      type:String,
    },
    btnName: {
      type: String,
      default: "按钮XXX"
    }
  }
});
</script>

<style scoped>
.btn {
  position: relative;
  top: 100px;
  left: 0;
  background-color: #fff;
  text-align: center;
}
.form-group input[type="button"], .form-group input[type="submit"] {
  display: inline;
  padding: 10px 50px;

  background-color: #888;
  border: none;
  color: white;
  outline: none;
}
.form-group input[type="button"]:hover,.form-group input[type="submit"]:hover {
  transition: background-color 0.3s;
  background-color: #393939;
}
</style>