<template>
  <div class="topItem">
    <div class="img">
      <img src="musicInfo.artists[0].picUrl" alt="" />
      <div class="play" @click="playChange">
        <i :style="{ right: right + 'px', bottom: bottom + 'px' }" :class="playClass"></i>
      </div>
    </div>
    <div class="operator">
      <i class=""></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftPart",
  data() {
    return {
      right: 80,
      bottom: 85,
      isPlay: false,
      playClass: "iconfont icon-bofang",
    };
  },
  props: ["musicInfo"],
  methods: {
    playChange() {
      if (this.isPlay) {
        this.right = 80;
        this.bottom = 85;
        this.isPlay = false;
        this.playClass = "iconfont icon-bofang";
      } else {
        this.right = 5;
        this.bottom = 5;
        this.isPlay = true;
        this.playClass = "iconfont icon-24gf-pause2";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.topItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    margin-top: 100px;
    width: 60%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    background-color: pink;
    position: relative;
    .play {
      cursor: pointer;
      i {
        display: inline-block;
        width: 45px;
        height: 45px;
        font-size: 18px;
        background-color: rgba($color: white, $alpha: 0.7);
        border-radius: 50%;
        position: absolute;
        text-align: center;
        line-height: 40px;
        color: red;
        transition: 1s all;
        // right: 5px;
        // bottom: 5px;
      }
    }
  }
  .operator {
    margin-top: 50px;
    display: flex;
    width: 60%;
    justify-content: space-around;
    i {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 1px solid #e7e7e7;
      border-radius: 50%;
    }
  }
}
</style>
