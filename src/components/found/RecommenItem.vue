<template>
  <!-- 推荐歌单 -->
  <div class="wrapper" @mouseover="iconShow = true" @mouseout="iconShow = false">
    <div class="imgWrapper">
      <img v-if="src" v-lazy="src" alt="" @error="handlerError(item)" />
      <img v-else src="../../assets/img/动态图.gif" />
      <div class="number">
        <div class="playCount">
          <i class="iconfont icon-yousanjiao"></i>
          {{ playCount | formatter }}
        </div>
      </div>
      <transition name="icon">
        <div class="icon" v-if="iconShow">
          <i class="el-icon-caret-right"></i>
        </div>
      </transition>
    </div>
    <p class="des">{{ describe }}</p>
  </div>
</template>

<script>
export default {
  name: "RecommendItem",
  props: ["src", "playCount", "describe"],
  data() {
    return {
      iconShow: false,
    };
  },
  methods: {
    handlerError(item) {
      item.picUrl = require("@/assets/img/动态图.gif");
    },
  },
  filters: {
    formatter(value) {
      if (value > 100000000) {
        return ` ${Math.round(value / 100000000)} 亿`;
      }
      if (value > 10000) {
        return `${Math.round(value / 10000)}  万`;
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  position: relative;
  cursor: pointer;
}
.imgWrapper {
  position: relative;
}
img {
  width: 100%;
  aspect-ratio: 1;
}
/* 播放总数 */
.playCount {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  font-size: 13px;
}

/* 播放图标 */
.icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 3px;
  border-radius: 50%;
  background-color: white;
  transition: all 2s;
}
.icon i {
  font-size: 30px;
  color: red;
}
/* 设置动画过度效果 */
/* 进入和离开过程中 */
.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.5s;
}
/* 进入的第一帧 */
.icon-enter {
  opacity: 0.9;
}
/* 离开后 */
.icon-leave-to {
  opacity: 0;
}
.des {
  color: #d0d0d0;
}
</style>
