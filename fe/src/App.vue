<template>
  <div id="app">
    <div class="Login-wrapper" v-if="token">
      <router-view />
      <Bottom class="main-bottom" />
    </div>
    <div class="show-main" v-else>
      <Status />
    </div>
  </div>
</template> 
<script>
import Bottom from "./views/bottom.vue";
import Status from "./views/status.vue";
import jwt_decode from "jwt-decode";
const log = console.log.bind(console);
export default {
  name: "app",
  data() {
    return {
      token: false
    };
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  components: {
    Status,
    Bottom
  },
  beforeMount() {
 
    this.token = localStorage.eleToken ? true : false;
    if (this.token != "") {
      const token = localStorage.getItem("eleToken");
      const decoded = jwt_decode(token);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
      
    }
  }
};
</script>

<style scoped>
#app {
  position: relative;
  width: 100%;
  min-width: 300px;
  color: white;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.9);
}
.show-main {
  height: inherit;
  color: black;
  background-color: #fff;
}
.main-bottom {
  position: absolute;
  bottom: 0;
}
</style>
