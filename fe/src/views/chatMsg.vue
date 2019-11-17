<template>
  <div class="chatMsg">
    <div class="title1">
      <i>{{titFri}}</i>
    </div>

    <div class="contenMsg" id="contentFather" ref="box">
      <!-- 用户模板 -->

      <div v-for=" item in HandleMsgCHAT">
        <div :class="{'me':item.show,'you':!item.show}">
          <div class="time time_c">
            <span>{{item.stime}}</span>
          </div>
          <p>{{item.content}}</p>
          <img src alt width="20" height="20" />
        </div>
      </div>

    </div>

    <div class="input-area">
      <input type="text" v-model="meText" @keydown="HandleEnter($event)" />
      <button @click="HandleCommitMsg">发送</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// to do sockets
export default Vue.extend({
  name: "chatMsg",
  data() {
    return {
      aChat: [],
      titFri: "",
      meText: "",
      domainYou: "",
      controText: true,
      time: "time",
      me: "me",
      you: "you",
      time_r: "time_r",
      time_l: "time_l",
      lastPosition: 0
    };
  },

  created() {
    window.IDCONTRO = null;
    this.titFri = this.$route.query.name;
    var uid = this.$store.state.user.uid;
    var fid = this.$route.params.id;
    var _this = this;
    // 轮询方式 实现 交互通信
    
    function msg_load_dg() {
      if (fid != undefined) {
        _this.$axios
          .post("/api/getMsgContent", { uid, fid, id: window.IDCONTRO })
          .then(res => {
            if (res.data.code == "nullMSG") {
              console.log("去请求了");
              setTimeout(msg_load_dg, 5000);
            } else {
              window.IDCONTRO = res.data.obj.id;
              setTimeout(msg_load_dg, 5000);
              _this.aChat.push(res.data.obj);
            }
          });
      }
    }
    msg_load_dg();
  },

  methods: {
    //我发的内容显示
    HandleCommitMsg() {
      const uid = this.$store.state.user.uid;
      const fid = this.$route.params.id;
      if (this.meText != "") {
        //  发送存储请求
        this.$axios
          .post("/api/sendMsg", { uid, fid, content: this.meText })
          .then(res => {
            if (res.status == 200) {
              var me = [];
              var obj = {content:this.meText,show:true};
              window.localStorage.setItem("me", JSON.stringify(obj));
              this.aChat.push(obj);
            }
            this.meText = "";
          });
      }
    },

    HandleEnter(e) {
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        this.HandleCommitMsg();
      }
    },
    //追加聊天双方
    HandleCreateEleFrag(type, content, stime, his) {
      console.log(type, content, stime, his);
      var oDiv = document.querySelector("#contentFather");
      var div = document.createDocumentFragment();
      var odiv = document.createElement("div");
      if (type == "me") {
        var template_Me = ` <div class="me" >
         <div class="time time_c">
          <span>${stime}</span>
        </div>
        <p>${content}</p>
        <img src alt width="20" height="20" />
      </div>`;
        odiv.innerHTML = template_Me;
        div.appendChild(odiv);
        oDiv.appendChild(div);
      } else if (type == "you") {
        var template_You = `<div class="you">
         <div class="time time_c">
           
           <span>${stime}</span>
           <div style="text-align:left">${his}</div>
          </div>
          <p>${content}</p>
          <img src alt width="20" height="20" />
        
        </div>`;
        odiv.innerHTML = template_You;
        div.appendChild(odiv);

        oDiv.appendChild(div);
        console.log(oDiv);
      }
    }
    //进入该页面就是聊天的开始
  },
  computed: {
    HandleMsgCHAT() {
      var user = this.aChat;
      return user;
    }
  },
  watch: {
    aChat(old) {
      setTimeout(() => {
        this.$refs.box.scrollTop = this.$refs.box.scrollHeight;
      }, 0);
    }
  }
});
</script>

<style >
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.title1 {
  background-color: crimson;
  padding: 15px;
  text-align: center;
}
.contenMsg {
  height: 350px;
  overflow-y: scroll;
  /* border: 1px solid pink; */
}
.time {
  color: #c1c1c1;
  font-size: 6px;
}
.time_r {
  text-align: right;
}
.time_l {
  text-align: left;
}
.time_c {
  text-align: center;
}
.contenMsg .me,
.contenMsg .you {
  position: relative;
  animation: slide_up 0.3s forwards;
}
@keyframes slide_up {
  from {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
}

.contenMsg .me {
  text-align: right;
}
.contenMsg .you {
  text-align: left;
}
.contenMsg .me p {
  margin-right: 4px;
  right: 50px;
}
.contenMsg .you p {
  left: 50px;
  margin-left: 4px;
}
.contenMsg .me p {
  background-color: crimson;
  box-shadow: 0px 0px 0px 0px crimson;
}
.contenMsg .you p {
  background-color: white;
  color: #444;
}
.contenMsg .me p,
.contenMsg .you p {
  display: inline-block;
  position: absolute;
  text-align: left;
  height: 50px;
  width: 180px;
  border-radius: 4px 4px 4px 4px;
}

.contenMsg .you p::after,
.contenMsg .me p::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  content: "";
  border: 10px solid;
}

.contenMsg .you p::after {
  left: -14px;
  bottom: 1px;
  border-color: transparent white transparent transparent;
}
.contenMsg .me p::after {
  right: -14px;
  bottom: 1px;
  border-color: transparent transparent transparent crimson;
}
.contenMsg .me img,
.contenMsg .you img {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: #fff;
}
.input-area input,
.input-area button {
  width: 100%;
}
.input-area input {
  font-size: 18px;
  height: 30px;
  text-indent: 4px;
  border: 2px solid #c1c1c1;
  outline: none;
}
.input-area input:focus {
  transition: all 0.3s;
  border-right: none;
  border: 2px solid crimson;
}
.input-area button {
  background-color: crimson;
  border: none;
  padding: 9px;
}
</style>