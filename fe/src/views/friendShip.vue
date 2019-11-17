<template>
  <div class="friendShip">
    <Header text="发现" />
    <div class="mainbody">
      <ul>
        <li>
          <router-link :to='getUserId'>朋友圈</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/header.vue";
export default Vue.extend({
  name: "friendShip",
  data() {
    return {
      id: ""
    };
  },
  components: {
    Header
  },
  computed: {
    getUserId() {
      console.log(this.$route)
      return this.$store.state.user.uid !==undefined ? '/friendRound/' + this.$store.state.user.uid : "";
      
    }
  }
});
</script>

<style scoped>
div.mainbody {
  width: 100%;
}
div.mainbody ul {
  display: block;
  width: 90%;
  margin: 0px auto;
}
div.mainbody ul li {
  display: block;

  line-height: 44px;
  margin-top: 14px;
  border-radius: 0.125rem;
  background-color: white;
}
div.mainbody ul li a {
  display: block;
  color: #444;
  font-size: 0.875rem;
  text-decoration: none;
}
</style>