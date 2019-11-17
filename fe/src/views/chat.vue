<template>
  <div class="chat">
    <Header text="聊天栏"></Header>
    <div class="chat-area">
      <div class="chat-box" @click="HandleMsg_Tip">
        <div class="userImg"></div>
        <div class="userInfo">
          <span>{{fid}}</span>
          <span>{{content}}</span>
        </div>
        <!-- 消息提醒 -->
        <i v-if="contro_Class" class="msg_Tip">{{tip}}</i>
      </div>
    </div>
  </div>
</template>

<script >
import Header from "../components/header";
export default {
  name: "chat",
  data() {
    return {
      value: "",
      msg_Tip: "msg_Tip",
      tip: 0,
      fid: "",
      content: "",
      contro_Class: false
    };
  },
  components: {
    Header
  },
  created() {
    let uid = this.$store.state.user.uid;

    if (uid != undefined) {
      this.$axios.post("api/PostMyFriend", { uid }).then(res => {
        this.$store.dispatch("setFriends", res.data.data); // 例子
        console.log();
        var ps = this.$store.state.friend.find(e=>{
          if(e.mid === this.fid){
            return e
          }
        });
        this.value = ps.ps;
       
      });
    }

    // this.value = ps;
  },
  methods: {
    HandleMsg() {
      window.localStorage.setItem("msg_tip", true);
      this.contro_Class = true;
      this.tip++;
    },
    HandleMsg_Tip() {
      const bMsg = window.localStorage.getItem("msg_tip");
      window.localStorage.setItem("msg_tip", !bMsg);
      window.localStorage.setItem("num", 1);
      this.contro_Class = false;
      this.$router.push({
        path: "/chatMsg/" + this.fid,
        query: { id: this.fid, name: this.value }
      });
    }
  }
};
</script>

<style scoped>
.chat {
  height: 100%;
}
.chat .chat-area {
  height: 430px;

  overflow: overlay;
  background: white;
}
.chat-area .chat-box {
  margin-bottom: 2px;
  padding-bottom: 4px;
  border-bottom: 1px solid gray;
  height: 50px;
}
.chat-area .chat-box .userInfo,
.chat-area .chat-box .userImg {
  float: left;
}

.chat-area .chat-box .userImg {
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: crimson;
  background: center;
}
.chat-area .chat-box .userInfo {
  line-height: 25px;
  margin-left: 14px;
}
.chat-box {
  position: relative;
  transition: all 0.5s;
}
.chat-box:active {
  background-color: #ccc;
}
.chat-box .msg_Tip {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: crimson;
  color: white;
  text-align: center;
  font-size: 10px;
  line-height: 20px;
}
.userInfo > span {
  display: block;
}
.userInfo > span:first-child {
  color: #393939;
  font-weight: bold;
}
.userInfo > span:nth-child(2) {
  color: rgba(101, 82, 82, 0.41);
  font-size: 12px;
  font-weight: 600;
}
</style>