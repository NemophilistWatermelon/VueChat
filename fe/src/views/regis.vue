<template>
  <div class="register">
    <div v-if="uid_show">
      注册成功您的账号是
      <p>{{uid}}</p>
      <p>当然也可以使用您的注册邮箱登录</p>
    </div>
  
    <div class="form-panel">
      <In
        type="text"
        labName="邮箱"
        placeHolder="输入正确邮箱"
        :error="msg1"
        @inputChanged="HandelUsername($event)"
      />

      <In
        type="password"
        labName="密码"
        placeHolder="密码八位"
        :error="msg2"
        @inputChanged="HandlePassword($event)"
      />
      <In
        type="text"
        labName="昵称"
        placeHolder="这里是昵称"
        :error="msg3"
        @inputChanged="HandleName($event)"
      />

      <Btn btnName="注册" type="submit" @click.native="HandleRegister" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import In from "../components/input.vue";
import Btn from "../components/button.vue";
export default Vue.extend({
  name: "register",
  data() {
    return {
      uid_show: false,
      uid: "",
      msg1: "",
      msg2: "",
      msg3: "",
      nick: "",
      username: "",
      password: "",
      code: {
        success: "输入合法",
        fail: "输入可能不正确",
        null: "输入为空"
      }
    };
  },
  created() {
    // console.log(this);
  },
  methods: {
    HandelUsername(e) {
      this.username = e.target.value;
      if (this.username == "null") {
        this.msg1 = this.code["null"];
      }
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      regEmail.test(this.username)
        ? (this.msg1 = "")
        : (this.msg1 = this.code["fail"]);
    },
    HandlePassword(e) {
      var regPassword = /^[A-Za-z0-9.#*]{8,12}/;
      this.password = e.target.value;
      console.log(this.password);
      regPassword.test(this.password)
        ? (this.msg2 = "")
        : (this.msg2 = this.code["fail"]);
    },
    HandleName(e) {
      var regName = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}/;
      this.nick = e.target.value;
      regName.test(this.nick)
        ? (this.msg3 = "")
        : (this.msg3 = this.code["fail"]);
    },
    HandleRegister() {
      var email = this.username,
        password = this.password,
        name = this.nick;
      console.log(password);
      if (email == "" || password == "" || name == "") {
        return alert("请全部填写");
      }
      if ((this.msg1 == "" && this.msg2 == "") || this.msg3 == "") {
        this.$axios
          .post("api/register", { email, password, name })
          .then(res => {
           
           
            if(res.data.code ==="failed"){
                this.uid_show = false;
            }else{
              this.uid = res.data.uid;
               this.uid_show = true;
            }
            
           
          });
      }
    }
  },
  components: {
    In,
    Btn
  }
});
</script>

<style scoped>
</style>