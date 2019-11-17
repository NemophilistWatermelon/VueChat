<template>
  <div class="said">
    <div class="return_go">
      <button @click="HandleReturn">🚪</button>
    </div>
    <div class="write_area">
      <textarea v-model="text" cols="30" rows="9"></textarea>
      <button @click="HandleWriteText">
        <i class="icon">✔</i>
        <span>发布</span>
      </button>
      <div class="show" v-if="show">
        <span>{{errTip}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "said",
  data() {
    return {
      text: "",
      show: false,
      errTip: ""
    };
  },
  methods: {
    HandleReturn() {
      this.$router.push("friendRound/" + this.$route.query.id);
    },
    HandleWriteText() {
      if (this.text != "") {
        this.$axios
          .post("api/said_words", {
            uid: this.$route.query.id,
            text: this.text
          })
          .then(res => {
            if (res.status == 200) {
              setTimeout(() => {
                this.errTip = "发布成功";
                this.show = !this.show;
                setTimeout(() => {
                  this.show = !this.show;
                  this.errTip = "";
                }, 2000);
              }, 1000);
            }
          });
        this.text = "";
      } else {
        setTimeout(() => {
          this.errTip = "您输入信息为空";
          this.show = true;
          setTimeout(() => {
            this.show = false;
            this.errTip = "";
          }, 2000);
        }, 1000);
      }
    }
  }
});
</script>

<style scoped>
.return_go button {
  flex: 1;
  padding: 5px;
  background-color: transparent;
  border: none;
  color: red;
  font-size: 20px;
}
.write_area textarea {
  width: 100%;

  border-radius: 2px;
  box-shadow: inset 0 0 0 2px #fff;
  transition: all 0.4s;
  text-indent: 4px;
  padding: 4px;
  font-size: 14px;
  font-family: "Courier New", Courier, monospace;
  text-shadow: 0 0 2px #444;
  outline: none;
}
.write_area textarea:focus {
  box-shadow: inset 0 0 0 2px #444;
  background-color: whitesmoke;
}
.write_area button {
  padding: 14px;
  background-color: #fff;

  border: none;
  outline: none;
}
.write_area button span {
  color: #444;
  text-shadow: 0 0 2px #444;
}
.icon {
  color: green;
  font-size: 14px;
}
.show {
  display: inline-block;
  animation: sliderUp 0.5s forwards;
}

@keyframes sliderUp {
  from {
    transform: translateX(0);
    opacity: 0.1;
  }
  to {
    opacity: 0.7;
    color: white;
    transform: translateX(2px);
  }
}
</style>
