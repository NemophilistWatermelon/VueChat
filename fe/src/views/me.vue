<template>
  <transition name="fade">
    <div class="me" v-if="show">
      <Header text="我的"></Header>
      <div class="userHeader">
        <div class="imgbox">
          <img src alt />
        </div>
        <div class="namebox">
          <span>{{user.name}}</span>
        </div>
        <div class="menu-set">
          <ul>
            <li>个人资料</li>
            <li>设置</li>
            <li class="li-warnning" @click="HandleLoginout">退出登录</li>
          </ul>
        </div>

        <div class="msgBox" v-if="show_msg">
          <span>通知</span>
          <div class="user-msg">
            <div class="fid-user">
              用户
              <em>{{ oFi_info.uid}}</em>
              <span>{{oFi_info.msg }}!</span>

              <button @click="HandleAgree">同意</button>
              <button @click="HandleRefuse">拒绝</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/header.vue";
import jwt_decode from "jwt-decode";
export default Vue.extend({
  name: "me",
  data() {
    return {
      show: true,
      user: {},
      show_msg: false,
      pardon: true,
      oFi_info: {
        uid: "",
        msg: ""
      }
    };
  },
  components: {
    Header
  },
  beforeMount() {
    const token = localStorage.getItem("eleToken");
    const decoded = jwt_decode(token);
    this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
    this.$store.dispatch("setUser", decoded);

    this.user.name = decoded.name;
    console.log(this.$store.state.user.uid);
    var uid = this.$store.state.user.uid;
    if (uid != undefined) {
      this.$axios.get(`api/addFri/` + uid).then(res => {
        console.log("res", res);
        if (res.data.data.length !== 0) {
          this.oFi_info.uid = res.data.data[0]["uid"];
          this.oFi_info.msg = res.data.data[0]["msg"];
          this.show_msg = true;
        }
      });
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    HandleAgree() {
      this.pardon = true;
      if (this.pardon) {
        this.$axios
          .post("api/addFricBoolean", {
            uid: this.$store.state.user.uid,
            boolean: this.pardon
          })
          .then(res => {
            if (res.data.code == 200) {
              this.show_msg = false;
            }
          });
      }
      //todo 同意加好友 走该走的路
    },
    HandleRefuse() {
      //不同意加好友走 该走的路
      this.pardon = false;
      this.show_msg = false;
    },
    HandleLoginout() {
      if (confirm("确定要退出吗")) {
        window.localStorage.removeItem("eleToken");
        window.location.reload();
      }
    }
  }
});
</script>
 <style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.userHeader .imgbox {
  display: block;
  width: 45px;
  height: 45px;
  background: gray;
  margin: 0px auto;
  border-radius: 50%;
}

.namebox {
  margin: 13px 0;
  text-align: center;
  color: gray;
}
.menu-set {
  margin: 30px 0;
}
.menu-set ul {
  width: 300px;

  line-height: 30px;
  margin: 0px auto;
  border: 1px dotted;
  text-align: center;
  background-color: #fff;
  color: gray;
  border-radius: 4px;
}

.msgBox {
  padding: 0 10px;
}
.msgBox .user-msg {
  height: 145px;
  background-color: #333;
  padding: 10px;
}
.msgBox .user-msg .fid-user {
  height: 30px;
  background-color: #111010;
  line-height: 30px;
}
.msgBox .user-msg .fid-user em {
  color: pink;
}
.msgBox .user-msg .fid-user button {
  background-color: #111010;
  color: bisque;
  border: none;
}
.li-warnning {
  background-color: crimson;
  color: white;
  transition: all 0.2s;
}
.li-warnning:active {
  background-color: rgb(212, 94, 94);
}
</style>


