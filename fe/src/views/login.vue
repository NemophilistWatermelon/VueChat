<template>
  <div class="login">
    <div class="form-panel">
      <In
        type="text"
        labName="帐名"
        placeHolder="uid/Email"
        :error="msg1"
        @inputChanged="HandelUsername($event)"
      />

      <In
        type="password"
        labName="密码"
        placeHolder="这里键入您的密码"
        :error="msg2"
        @inputChanged="HandlePassword($event)"
      />

      <Btn btnName="登录" type="submit" @click.native="HandleLogin" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import In from "../components/input.vue";
import Btn from "../components/button.vue";
import jwt_decode from "jwt-decode";
export default Vue.extend({
  name: "login",
  data() {
    return {
      msg1: "",
      msg2: "",
      nick: [],
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
    },
    HandlePassword(e) {
      this.password = e.target.value;
    },
    HandleLogin() {
      var u = this.username;
      var p = this.password;
      if (u == "") {
        this.msg1 = this.code.null;
      } else if (p == "") {
        this.msg2 = this.code.null;
      } else {
        var uid;
        var email;
        var reg = /\d{9}/;
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(u)) {
          uid = u;
        } else if (regEmail.test(u)) {
          email = u;
        }

        // var info = [uid,email];
        // var key = info.filter((e)=>{
        //   return e ;
        // })
        //  key[0]

        this.msg1 = this.msg2 = "";
        this.$axios.post("api/login", { email, uid, password: p }).then(res => {
          console.log(res);
          if (res.data.code == "failed") {
            this.msg1 = "请检查输入信息是否有误!";
          }

          const token = res.data.token != undefined ? res.data.token : null;
          token != null ? localStorage.setItem("eleToken", token) : null;
          // localStorage.setItem("eleToken",token);
          if (token != null || undefined) {
            window.location.replace("/me");
            // this.$router.push("/me")
          }
          const decoded = jwt_decode(token);
          //token 存储到 vuex 中
          this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
          this.$store.dispatch("setUser", decoded);

        });
      }
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
  components: {
    In,
    Btn
  }
});
</script>

<style scoped>
</style>