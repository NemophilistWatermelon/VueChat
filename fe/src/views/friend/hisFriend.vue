<template>
  <div class="friendsSaid">
    <div class="head">
      <div class="top_tit">{{$route.query.name}}的朋友圈</div>
    </div>
    <div class="tip_posi" v-if="show">{{tip}}</div>
    <div class="friend" v-for="(item,index) in friend" :key="item.value">
      <div class="friend_left">11561</div>
      <div class="friend_right">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ducimus, possimus provident nisi unde quod quidem praesentium, mollitia quae eos quia nam quo incidunt laborum officia optio. Consequuntur, quam dolorum.</p>
        <div>
          <button @click="HandleToggle">...</button>
        </div>
        <div class="sta">
          <button @click="HanleVote(index)">
            <i>👍</i>
          </button>
          <input type="text" v-model="content" />
          <button @click="HandlePl(item.id)">评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "friendsSaid",
  data() {
    return {
      fid: "",
      friend: ["asd"],
      content: "",
      tip: "",
      show: ""
    };
  },
  created() {
    this.fid = this.$route.params.id;
    if (this.fid != undefined) {
      this.$axios.get("/api//myfriend/" + this.fid).then(res => {
        this.friend = res.data.data;
        this.friend.forEach(element => {
          element.show = false;
        });
      });
    }
  },
  methods: {
    //赞论 toggle
    HandleToggle() {}
  },
  watch: {
    friend(newValue, oldValue) {
      if (newValue.length == 0) {
        this.tip = "木得朋友圈吖~(●'◡'●)";
        this.show = true;
      } else {
        this.show = !this.show;
      }
    }
  }
});
</script>

<style scoped>
.friendsSaid {
  height: 100%;
  overflow: scroll;
}
.top_tit {
  padding: 14px;
  background-color: rgba(0, 0, 0, 0.404);
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  text-shadow: 0 0 2px #fff;
}
.friend {
  display: flex;
  padding: 4px;
}
.friend_left {
  flex: 1;
  height: 130px;
  line-height: 130px;
  color: #444;

  margin-right: 14px;
  border-radius: 4px;
  text-align: center;
  background-color: #fff;
}
.friend_right {
  flex: 4;
}

.tip_posi {
  position: absolute;
  width: 250px;
  height: 250px;
  left: 50%;
  top: 50%;
  margin-left: -25%;
  margin-top: -25%;
  background-color: #fff;
  color: #444;
  line-height: 250px;
  text-align: center;
  border-radius: 50%;
  animation: move 5s infinite linear;
  transform-origin: bottom;
}

@keyframes move {
  0% {
    transform: rotate(0deg);
    opacity: 0.1;
  }
  10% {
    transform: rotate(-30deg);
    opacity: 0.2;
  }
  20% {
    transform: rotate(-60deg);
    opacity: 0.3;
  }
  30% {
    transform: rotate(-30deg);
    opacity: 0.5;
  }
  40% {
    transform: rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: rotate(30deg);
    opacity: 0.7;
  }
  60% {
    transform: rotate(60deg);
    opacity: 0.8;
  }
  70% {
    opacity: 0.9;

    transform: rotate(30deg);
  }
  80% {
    opacity: 0.1;

    transform: rotate(0deg);
  }
}
</style>