<template>
  <div class="friendRound">
    <div class="top">
      <div class="left">
        <span>{{reName}}朋友圈</span>
      </div>
      <div class="right">
        <router-link :to="{path: '/said', query:{id: uid} }">🖌</router-link>
      </div>
    </div>

    <div class="head">
      <div class="user_img">
        <span>{{$store.state.user.name}}</span>
        <img src alt />
      </div>
    </div>

    <div class="friend_content_body" v-for="(userSaid,index) in profile" :key="userSaid.value">
      <div class="imgbox">
        <!-- 用户头像 -->
        <img src alt />
      </div>
      <div class="toggleDiv" @click.stop="HandelToggle(userSaid,$event)">
        <span>...</span>
      </div>
      <div v-if="userSaid.show" :class="{'toggleMenu':userSaid.show}">
        <ul>
          <li @click="del(index,userSaid.id)">删除</li>
        </ul>
      </div>
      <div class="userBox">
        <p class="said_words">{{userSaid.content}}</p>

        <span v-if="font_Num_bool">查看更多</span>
      </div>
      <div class="time_">{{userSaid.stime}}</div>
      <div class="stutas">
        <div v-if="!userSaid.pl">
          <i
            @click="userSaid.vote ?  unHandleVote(userSaid.id,index,$event):HandleVote(userSaid.id,index,$event) "
            style="color:red"
          >👍{{ userSaid.vote }}</i>
          <button @click="userSaid.pl= !userSaid.pl  ">
            <i>✨</i>
            <span @click="GetPl(index,userSaid.id,$event)">评论</span>
          </button>
        </div>
      </div>
      <div v-if="userSaid.pl" :class="{'defalut_Div':userSaid.pl ,'animate_to_div':userSaid.pl,}">
        <div class="pl_area">
          <div class="area_write">
            <input type="text" @keyup="HandleSetInval(index,$event)" placeholder="说点什么吧..." />
            <button @click="HandleSend(index,userSaid.id)">发送</button>
            <button @click="userSaid.pl=!userSaid.pl">取消</button>
          </div>
          <div class="show_area">
            <ul class="show_area_pl">
              <li v-for="item in userSaid.a_pl" :key="item.value">
                <span>{{userSaid.name }}:</span>
                <span>{{item.pl}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "friendRound",
  data() {
    return {
      uid: "",
      ipt_Show: false,
      font_Num_bool: false,
      said_word: "",
      pl: "",
      profile: null,
      toggle: false
    };
  },
  created() {
    this.uid = this.$store.state.user.uid;
    console.log(this.uid);
    if (this.uid != undefined) {
      this.$axios.post("/api/said", { uid: this.uid }).then(res => {
        res.data.data.forEach(e => {
          e.show = false;
          e.pl = false;
          e.vote = false;
          e.input = "";
          e.a_pl = null;
        });
        this.profile = res.data.data;
      });
      this.GetVote();
    }
  },
  methods: {
    GetPl(index, id) {
      // 获取评论
      
      if (index !== "") {
        this.$axios.post("/api/pl/getPl", {  textID: id }).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.profile[index].a_pl = res.data.data;
            this.profile[index].name = res.data.name;
          }
        });
      }
    },
    HandleVote(num, id, e) {
      var uid = this.uid;
      console.log("发送喜欢请求");
      if (uid !== undefined) {
        this.$axios.post("/api/vote", { uid, num }).then(res => {
          this.ToggleVote(id);
        });
      }
    },
    HandleSend(index, id, event) {
      var textID = id;
      var uid = this.uid;
      var text_content = this.profile[index].input; //需要发送的评论
      if (uid !== undefined && text_content !== "") {
        console.log("发送评论请求" + textID);
        this.$axios.post("/api/pl", { textID, uid, text_content }).then(res => {
          if (res.status === 200) {
            this.$axios.post("/api/pl/getPl", { textID }).then(res => {
              this.profile[index].a_pl = res.data.data;
              this.profile[index].name = res.data.name;
            });
          }
        });
      }
    },

    HandleSetInval(index, e) {
      if (e.target.value !== "") {
        this.profile[index].input = e.target.value;
      }
    },
    
    del(index,id) {
      console.log(index);
      this.profile.shift(index);
      console.log(id);
      if(id !=""){
        this.$axios.post("/api/delPyq",{id}).then(res=>{
          console.log(res)
        })
      }
    },
    HandelToggle(el, e) {
      el.show = !el.show;
    },
    GetVote() {
      var vote = false;
      if (this.uid !== undefined) {
        this.$axios.get("/api/getVote?uid=" + this.uid).then(res => {
          if ((res.code = "success")) {
            vote = true;
          }
          var voted = res.data.data;
          var voted_length = voted.length;
          for (var i = 0; i < voted_length; i++) {
            var fId = voted[i].friendPyqID;
            this.profile.filter(e => {
              if (fId == e.id) {
                e.vote = !e.vote;
              }
            });
          }
        });
      }
    },
    ToggleVote(index) {
      this.profile[index].vote = !this.profile[index].vote;
    },
    unHandleVote(num, id, $event) {
      console.log("不喜欢");
      if (this.uid !== undefined) {
        this.$axios.post("/api/unvote", { uid: this.uid, num }).then(res => {
          this.ToggleVote(id);
        });
      }
    }
  },

  computed: {
    reName() {
      return Math.round(this.uid) === Math.round(this.$route.params.id)
        ? "我的"
        : "好友";
    }
  }
});
</script>

<style scoped>
.friendRound {
  box-sizing: border-box;
  color: white;
  overflow: scroll;

  height: 459px;
}
.friendRound .top {
  display: flex;
  height: 30px;
  line-height: 30px;
  background-color: gray;
}
.friendRound .top .left,
.friendRound .top .right {
  flex: 1;
}
.friendRound .right {
  text-align: right;
}
.friendRound .right a {
  color: white;
  text-decoration: none;
}
.head {
  position: relative;
  width: 100%;
  height: 150px;
  background-color: red;
  margin-bottom: 50px;
}
.user_img {
  position: absolute;
  right: 13px;
  bottom: -27px;

  /* background-color: white; */
}

.user_img img {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 2px;
  background-color: gray;
}
.user_img span {
  text-shadow: 0 0 3px #444;
  font-weight: bold;
  vertical-align: 36px;
  letter-spacing: 1px;
}
/* 朋友圈个人消息组 */
.friend_content_body {
  position: relative;
  background-color: white;
  border-radius: 3px;
  width: 90%;
  height: 152px;

  margin: 0 auto 14px auto;
}
.friend_content_body .imgbox {
  margin-top: 10px;
  position: absolute;
  top: 3px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  background-color: #444;
}
.friend_content_body .userBox {
  display: block;

  position: absolute;
  width: 50px;
  font-size: 14px;
  color: #444;
  left: 60px;
}
.friend_content_body .userBox p {
  width: 100%;
  height: 95px;
  margin-top: 13px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.friend_content_body .userBox span {
  font-size: 5px;
  color: rgba(133, 133, 133, 0.5);
}
.friend_content_body .stutas {
  margin-top: 10px;
  text-align: right;
  position: absolute;
  right: 0px;
  bottom: 0px;
}
.pl_area {
  height: 119px;
  overflow: hidden;
  color: white;

  background-color: rgba(250, 250, 250, 0.027);
  animation: up_Pl_area 0.5s forwards;
}
@keyframes up_Pl_area {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(32px);
  }
}

.show_area_pl {
  height: 130px;
  overflow: scroll;
}
.show_area_pl li {
  font-size: 10px;
  padding-left: 3px;
  margin: 4px;
}
.show_area_pl li span:nth-child(1) {
  font-weight: 700;
  text-shadow: 0 0 2px rgb(90, 90, 241);
  color: rgb(56, 56, 216);
}
.show_area_pl li span:nth-child(2) {
  color: #444;
}
.friend_content_body .stutas i {
  color: #5d5d5d;
  margin-right: 3px;
}
.pl_area .area_write button {
  margin-left: 3px;
}
.friend_content_body .stutas button,
.pl_area .area_write button {
  padding: 5px 5px;
  border: none;
  color: wheat;
  background-color: indianred;
  box-shadow: inset 0 0 0 2px indianred;
  outline: none;
}

.defalut_Div input {
  width: 76%;
  border: none;
  outline: none;
  color: #444;
  border-bottom: 1px solid transparent;
  height: 24px;
  transition: all 0.5s;
}
.defalut_Div input:focus {
  background-color: rgba(255, 255, 255, 0.658);
  background-color: normal;
  box-shadow: inset 0 0 0 2px #444;
  text-indent: 4px;
}
.animate_to_div {
  animation: sliderUp 0.5s forwards;
}
@keyframes sliderUp {
  from {
    transform: translateY(0);
    opacity: 0.1;
  }
  to {
    opacity: 1;
    transform: translateY(2px);
  }
}
.time_ {
  position: absolute;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  left: 3px;
  font-weight: 300;
  color: #999;
  bottom: 3px;
  font-size: 12px;
}

.toggleDiv {
  position: absolute;
  right: 5px;
  top: 0;
  width: 30px;
  height: 30px;
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 30px;
  vertical-align: middle;
  letter-spacing: 2px;
  transition: all 0.5s;
}
.toggleDiv:hover {
  cursor: pointer;
}
.toggleDiv:active {
  background-color: #f1a333;
}
.toggleMenu {
  position: absolute;
  box-shadow: 0px 0 1px 0px gray;

  right: 0;
  top: 0;
  width: 100px;

  animation: slMenu_slider 0.5s forwards;
}
.toggleMenu ul {
  margin: 0;
  padding: 0;
  display: block;
}
.toggleMenu ul li {
  text-align: center;
  padding: 3px;
  font-size: 10px;
  color: #444;
}
@keyframes slMenu_slider {
  from {
    opacity: 0.1;
    transform: translateY(0);
  }
  to {
    opacity: 0.9;
    transform: translateY(30px);
  }
}
</style>