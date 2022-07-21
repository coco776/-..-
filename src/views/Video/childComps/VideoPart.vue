<template>
  <div class="wrapper">
    <div
      class="videoItem"
      v-for="item in videoList"
      :key="item.vid"
      @click="handlerClick(item.vid)"
    >
      <img v-if="item.coverUrl" v-lazy="item.coverUrl" />
      <img v-else src="../../../assets/img/error_img.png" />
      <div class="playNum">
        <i class="iconfont icon-bofang"></i>
        {{ item.playTime }}
      </div>
      <div class="duration">{{ (item.durationms / 1000) | timeFormat }}</div>
      <div class="des">
        <div class="title">{{ item.title }}</div>
        <div class="publisher">by {{ item.creator.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videoList"],
  mounted() {
    console.log(this.videoList);
  },
  methods: {
    handlerClick(id) {
      this.$router.push({
        name: "videoDetail",
        params: { id },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 1250px;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .videoItem {
    cursor: pointer;
    width: 23%;
    height: 250px;
    margin-bottom: 50px;
    position: relative;
    .playNum {
      position: absolute;
      top: 5px;
      right: 5px;
      color: white;
      font-size: 13px;
    }
    .duration {
      position: absolute;
      top: 155px;
      right: 5px;
      color: white;
      font-size: 13px;
    }
    img {
      max-width: 100%;
      height: 180px;
    }

    .des {
      width: 100%;
      .title {
        margin-top: 10px;
        width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }
      .publisher {
        color: #cfcfcf;
      }
    }
  }
}
</style>
