<template>
  <div class="bottom">
    <ul>
      <li>
        <router-link to="/chat">聊天</router-link>
      </li>

      <li>
        <router-link to="/friend">联系人</router-link>
      </li>

      <li>
        <router-link to="/friendShip">发现</router-link>
      </li>

      <li>
        <router-link to="/me">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data() {
    return {
      click: true
    };
  },
  methods: {
    HandleClick(e) {
      this.click = !this.click;
    }
  }
};
</script>

<style scoped>
.bottom {
  width: 100%;
}

.bottom ul {
  display: block;
  height: 40px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: rgba(123, 123, 123, 0.1);
}

.bottom ul li {
  float: left;
  width: 25%;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  text-shadow: 0px 0px 1px #000;
}
.bottom ul li a {
  display: block;
  text-decoration: none;
}
.bottom ul::after {
  display: block;
  content: "";
  clear: both;
}
a {
  text-decoration: none;
  transition: all 1s;
  color: #fff;
}
.router-link-active {
  color: #393939;
  border-radius: 3px;
  background-color: crimson;
}
</style>


