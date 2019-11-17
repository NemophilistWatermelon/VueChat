<template>
  <div class="sigleFri">
    <span class="title" @click="HandleReturn"> 返回 </span>
    <div class="userBox">
      <img src alt />
      <div class="user-msg">
        <input :class="alt ? 'org_Name':'alt_Name'" type="text" v-model="value" @click="HandleName"   >
         <button style=" padding:4px;border:none;background-color:orange"  v-if="!alt" @click="RestName">修改备注</button>
        <span >{{friUid}}</span>
      </div>
    </div>
    <div class="hisRes">
    
      <router-link :to="{path:`/hisFriend/${friUid}`,query:{id:friUid,name:value}}">他的朋友圈</router-link>
      <router-link :to="{path:`/chatMsg/${friUid}`,query:{id:friUid,name:value}} ">发送信息</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "singleFri",
  data() {
    return {
      friUid: "",
      value:"",
      alt:true,
    };
  },
  methods: {
    HandleReturn() {
      console.log(this.$route)
      
    },
    HandleName(){
      this.alt = !this.alt;
      console.log(1)
    },
    RestName(){
      if(this.value){
        this.$axios.post("/api/resetName",{fid:this.friUid,uid:this.$store.state.user.uid,newName:this.value}).then(res=>{
          console.log(res);
        })
      }
    }
  },
  created() {
    this.friUid = this.$route.params.id;
    this.value = this.$route.query.ps;
    console.log(this.$route);
  },
 
});
</script>

<style scoped>
.sigleFri{
  height: 100%;
  overflow: scroll;
}
.sigleFri span.title{
  display: inline-block;
  color: #c1c1c1;
  font-size: 25px;
  margin-left: 10px;
}
.userBox,
.hisRes {
  width: 100%;
  height: 150px;
  
  /* border: 1px solid pink; */
}
.userBox img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0px auto;
  background-color: #fff;
}
.userBox .user-msg {
  margin-top: 14px;
  text-align: center;
}
.org_Name{
  text-align: center;
  background-color: #1a1a1a;
  color: white;
  border: none;
}
.userBox .user-msg span {
  color: #c1c1c1;
  display: block;
  margin-top: 4px;
  font-size: 8px;
}
.hisRes{
  margin-top: 110px;
}
.hisRes a {
  display: block;
  margin: 20px auto;
  width: 200px;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: black;
  text-align: center;
  text-decoration: none;
  padding:14px;
  background-color: #fff;
}
</style>