<template>
  <!-- 顶部主要信息展示 -->
  <div class="top">
    <div class="imgWrapper">
      <img :src="mainInfo.coverImgUrl" alt="" />
    </div>
    <div class="rightRetail">
      <span class="redList">歌单</span>
      <h2>{{ mainInfo.name }}</h2>
      <!-- 创建者信息 -->
      <div class="creator">
        <!-- <img :src="mainInfo.creator.backgroundUrl?mainInfo.creator.backgroundUrl:'' "/> -->
        <div class="creatorName">云音乐VIP</div>
        <div class="updateTime">最近更新：{{ mainInfo.createTime | dateFormat }}</div>
      </div>
      <!-- 三个按钮 -->
      <div class="buttons">
        <el-button type="danger" round @click="playFirst" class="playAll"> 
          <i class="iconfont icon-youjiantou" style="color: white"></i>
          播放全部</el-button
        >

        <el-button class="last" round v-if="!mainInfo.subscribed" @click="subscribe">
          <i class="iconfont icon-shoucang1"></i>
          收藏（{{ mainInfo.subscribedCount }}）</el-button
        >
        <el-button class="last" round v-else>
          <i class="iconfont icon-shoucang1"></i>
          已收藏（{{ mainInfo.subscribedCount }}）</el-button
        >
        <!--弹出框 -->
        <div class="confirm" v-if="false">
          <div class="reminder">确定不再收藏该歌单?</div>
          <el-button type="danger" @click="subscribe">确定</el-button>
        </div>
        <el-button class="last" round>
          <i class="iconfont icon-fenxiang"></i>
          分享({{ mainInfo.shareCount }})</el-button
        >
        <el-button class="last" round>
          <i class="iconfont icon-xiazai"></i>
          VIP下载</el-button
        >
      </div>
      <!-- 歌单信息 -->
      <div class="listInfo">
        <p>
          <span>歌曲：{{ mainInfo.trackCount }}</span>
          <span class="play">播放：{{ mainInfo.playCount | formulateCnt }}</span>
        </p>
        <p class="des">简介：{{ mainInfo.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { collectSongList } from "@/api/Music/index.js";
export default {
  name: "DetailHeader",
  props: ["mainInfo"],
  data() {
    return {
      confirmShow: true,
    };
  },
  filters: {
    formulateCnt(val) {
      if (val > 100000000) {
        return `${Math.round(val / 100000000)}亿`;
      }
      if (val > 10000) {
        return `${val / 10000}万`;
      }
    },
  },
  methods: {
    //播放第一首歌
    playFirst() {
      this.$bus.$emit("playFirst");
    },
    async subscribe() {
      let t = 1;
      if (this.mainInfo.subscribed) {
        t = 0;
      }
      const { data } = await collectSongList(this.$route.params.id, t);
      console.log(data);
      if (data.code !== 200) {
        this.$message.error("收藏错误");
      }
      if (t == 0) {
        this.$message.success("收藏成功");
      }

      this.mainInfo.subscribed = !this.mainInfo.subscribed;
    },
  },
  updated() {
    console.log(this.mainInfo);
  },
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  .imgWrapper {
    width: 200px;
    height: 200px;
    aspect-ratio: 1;
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 10px;
    }
  }
  .rightRetail {
    padding-left: 30px;
    h2 {
      display: inline-block;
      margin-left: 10px;
      color: #d0d0d0;
    }
    .redList {
      padding: 2px 5px;
      color: red;
      border: 1px solid red;
      border-radius: 5px;
      line-height: 14px;
      font-size: 15px;
    }
    h1 {
      display: inline-block;
      margin-left: 10px;
    }
    // 创建者信息
    //avatarUrl
    //userId
    //playCount
    .creator {
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .creatorName {
        margin-left: 10px;
        font-size: 13px;
        color: #507daf;
      }
      .updateTime {
        margin-left: 10px;
        color: grey;
        font-size: 13px;
      }
    }
    // 三个button
    .buttons {
      display: flex;
      .playAll{
        background-color: #EC4141;
      }
      .playAll:hover{
        filter: brightness(90%);
        -webkit-filter: brightness(90%);
      }
      .last{
        color: #d0d0d0;
        background-color: var(--theme--bg-color2);
      }
      .last:hover {
        filter: brightness(110%);
        -webkit-filter: brightness(110%);
      }
      .confirm {
        background-color: #363636;
        text-align: center;
        padding: 60px 140px;
        color: #d0d0d0;
        position: absolute;
        top: 35%;
        left: 40%;
        .el-button {
          margin-top: 20px;
        }
      }
    }

    // 歌单详情描述
    .listInfo {
      margin-top: 15px;
      font-size: 14px;
      color: grey;
      .play {
        margin-left: 20px;
      }
      .des {
        width: 100%;
        height: 20px;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      }
    }
  }
  .el-button {
    background-color: black;
  }
}
</style>
