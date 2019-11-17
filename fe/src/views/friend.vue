<template>
  <div class="friend">
    <Header text="联系人" />
    <nav class="search-fri">
      <button @click="HandleShowSearch">添加好友</button>
      <div class="search-box" v-if="show_search">
        <input
          type="text"
          @click="HandleFriendPanel($event)"
          v-model="fri_uid"
          placeholder="输入对方的账号"
        />
        <button type="submit" @click="HandleAddFriend">search</button>
      </div>
    </nav>
    <!-- showFri -->
    <section class="friend-body-wrap" v-if="show_friend">
      <div class="list-group">
        <span>我的好友</span>
      </div>
      <div class="chat-area">
        <div class="chat-box" v-for="(item,index) in friend " :key="item.value">
          <div class="userImg"></div>
          <div class="userInfo">
            <router-link :to="{path: `/firendDetail/${item.mid}`, query:{id: item.mid,ps:item.ps} }">{{item.ps}}</router-link>
          </div>
          <div class="contro_Menu" @click="HandToggle(index,$event)">...</div>
          <div class="menu_user" v-if="item.show">
            <button>设置</button>
          </div>
        </div>
      </div>
    </section>
    <!--/ showFri -->

    <!-- addFri -->
    <div class="search-resl" v-else-if="search_res.name">
      <span style="color:gray">搜索结果如下：</span>
      <div class="serch-user">
        <div class="username">
          <span>昵称：</span>
          <span>{{search_res.name}}</span>
        </div>
        <div class="user_uid">
          <span>账号：</span>
          <span>{{search_res.uid}}</span>
        </div>
        <button class="add" @click="HandleAdd">添加为好友</button>
      </div>
    </div>
    <!--/ addFri  -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/header.vue";
export default Vue.extend({
  name: "firend",
  data() {
    return {
      fri_uid: "",
      show_search: false,
      show_friend: true,
      search_res: {
        name: "",
        uid: ""
      },
      //添加的朋友显示
      friend: null,
      show_toggle: false,
      ps: ""
    };
  },

  components: {
    Header
  },
  created() {
    const uid = this.$store.state.user.uid;
    console.log("uid", uid);
    if (uid != undefined) {
      this.$axios.post("api/PostMyFriend", { uid }).then(res => {
        console.log(res);
        this.$store.dispatch("setFriends", res.data.data); // 例子
        this.$store.state.friend.forEach(e => {
          e.show = false;
        });
        this.friend = this.$store.state.friend;
      });
    }
  },
  methods: {
    HandleAddFriend(e) {
      //todo 查询添加好友
      if (this.fri_uid != "") {
        this.$axios.post("api/searchFri", { uid: this.fri_uid }).then(res => {
          this.search_res.name = res.data.aFri[1];
          this.search_res.uid = res.data.aFri[0];
        });
      }
    },
    HandleShowSearch() {
      this.show_search = !this.show_search;
    },
    HandleFriendPanel(e) {
      this.show_friend = e ? false : true;
    },
    HandleAdd() {
      console.log(this.search_res.uid);
      console.log(this.$store.state.user.uid);

      if (this.search_res.uid != "") {
        this.$axios
          .post("api/addFri", {
            fid: this.search_res.uid,
            mid: this.$store.state.user.uid
          })
          .then(res => {
            if (res.status == 200) {
              alert("已发送您的好友添加请求!");
            }
          });
      }
    },
    HandToggle(index) {
      console.log("点啊");
      this.friend[index].show = !this.friend[index].show;
      // console.log(this.friend[index].show);
    }
  }
});
</script>

<style scoped>
.search-fri {
  height: 45px;
  padding-left: 3px;
  
}
.search-fri button {
  margin-top: 2px;
  height: 20px;
  background-color: crimson;
  color: #eee;
  border: 1px transparent;
}
.search-fri input {
  border: 1px;
  height: 20px;
}

.serch-user {
  position: relative;
  background-color: rgba(101, 82, 82, 0.41);
  font-weight: bold;
  color: red;

  font-family: Arial, Helvetica, sans-serif;
}

.serch-user .username,
.serch-user .user_uid {
  padding: 10px;
}

.add {
  position: absolute;
  right: 0;
  top: 18px;
  padding: 8px;
  margin: 4px;
  border: none;
  color: white;
  background-color: crimson;
}

/* 朋友列表设置 */
.friend-body-wrap {
  height: 353px;
  /* overflow: hidden; */
}
.friend-body-wrap .list-group {
  padding: 10px;
  display: inline-block;
  font-size: 10px;
  border: 1px solid salmon;
  background-color: salmon;
}

.chat-area {
  height: 100%;
  overflow: overlay;
  background: white;
}
.chat-area .chat-box {
  max-width: 100%;
  min-width: 100%;

  position: relative;
  cursor: pointer;
  margin-bottom: 2px;
  padding-bottom: 4px;
  /* border-bottom: 1px solid gray; */
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
  width: 80%;
  line-height: 50px;
  margin-left: 14px;
  border-bottom: 1px solid gray;
}

.chat-box:hover {
  background-color: #eee;
}
.chat-area .chat-box .userInfo > span:first-child {
  color: rgb(148, 148, 148);
  font-weight: 400;
}
.chat-area .chat-box button {
  padding: 4px;
  border: none;
  background-color: crimson;
  color: #444;
}
.chat-area .chat-box .contro_Menu {
  position: absolute;
  width: 40px;
  right: 38px;
  height: 23px;
  top: 14px;
  text-align: center;
  line-height: 14px;
  background-color: #e6e5e5;
  transition: all 0.3s;
}
.chat-area .chat-box .contro_Menu:active {
  background-color: #444;
}
.menu_user {
  position: absolute;
  left: 158px;
  top: 12px;
}
/*  朋友列表设置 结束 */
</style>