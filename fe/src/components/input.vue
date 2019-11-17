<template>
  <div class="ipt">
    <div class="form-group">
      <label for>
        {{labName}}
        <input
          :type="type"
          class="input-contro"
          :placeholder="placeHolder"
          @input="inputChanged($event)"
        />
        <span  class="msg-tip">{{error}}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ipt",
  props: {
    value: {
      type: String
    },
    name: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: "状态"
    },
    labName: {
      type: String,
      default: "xxx"
    },
    error: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    btnName: {
      type: String,
      default: "xxx"
    },
    placeHolder: {
      type: String,
      default: "text"
    }
  },
  // data() {
  //   return {
  //     isA: true
  //   };
  // },
  methods: {
    inputChanged($event) {
      this.$emit("inputChanged", $event);
    }
  },

 
});
</script>

<style scoped>
.ipt {
  position: relative;
  top: 100px;
  background-color: #fff;
  text-align: center;
  padding: 16px;
}
.form-group {
  display: inline-block;
}
.form-group label {
  color: #666;
}
.msg-tip {
  display: block;
  text-align: left;
  padding: 10px;
  color: red;
  /* background-color: pink; */
}
.msg-none {
  display: none;
}

.form-group input,
.form-group input:focus {
  border: 2px solid #eee;
  padding: 8px;
  color: #393939;
  font-weight: bold;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
}
.form-group input:focus {
  transition: all 0.5s;

  border: 2px solid #393939;
}
</style>