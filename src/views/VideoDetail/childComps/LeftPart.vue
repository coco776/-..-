<template>
  <div class="leftWrapper">
    <!-- 跳转 -->
    <div class="back" @click="goHistory">
      <i class="iconfont icon-zuosanjiao"></i>
      视频详情
    </div>
    <!-- 视频部分 -->
    <div class="video">
      <video :src="videoSrc" ref="videoRef" width="" height="" controls></video>
    </div>
    <!--user -->
    <div class="user">
      <img v-if="videoInfo.avatarUrl" :src="videoInfo.avatarUrl" alt="" />
      <img v-else src="../../../assets/img/un_user.png" alt="" />
      <span>{{ videoInfo.creator.nickname }}</span>
    </div>
    <!-- detail -->
    <div class="detail">
      <div class="title">
        <h2>{{ videoInfo.title }}</h2>
        <i class="iconfont icon-sanjiao1" v-if="isFold" @click="isFold = !isFold"></i>
        <i v-else class="iconfont icon-youjiantou" @click="isFold = !isFold"></i>
      </div>
      <div class="line1">
        <span class="publish">发布：2018-12-27</span>
        <div class="playCnt">播放：20万次</div>
      </div>
      <div class="tips">
        <div class="item" v-for="(item, index) in videoGroup" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="des" v-if="!isFold">
        {{ videoInfo.description }}
      </div>
    </div>
    <!-- 操作 -->
    <div class="operators">
      <div class="item">赞({{ videoInfo.praisedCount }})</div>
      <div class="item">收藏({{ videoInfo.subscribeCount }})</div>
      <div class="item">分享({{ videoInfo.shareCount }})</div>
    </div>
  </div>
</template>

<script>
import { getVideoUrl } from "../../../api/Video/index";
export default {
  data() {
    return {
      music: {},
      isFold: true,
      videoSrc: "",
    };
  },
  props: ["videoInfo"],
  computed: {
    videoGroup() {
      if (!this.videoInfo.videoGroup) return;
      let arr = [];
      this.videoInfo.videoGroup.forEach((element) => {
        arr.push(element.name);
      });
      return arr;
    },
  },
  methods: {
    goHistory() {
      this.$router.push("/video");
    },
    //获取视频src
    async getVideoUrl(id) {
      const { data } = await getVideoUrl(id);
      console.log(data);
      this.videoSrc = data.urls[0].url;
    },
  },
  mounted() {
    this.getVideoUrl(this.$route.params.id);
  },
  watch: {
    $route: {
      handler(to, from) {
        this.getVideoUrl(from.params.id);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.leftWrapper {
  width: 600px;
  height: 600px;
  margin-bottom: 100px;
  .back {
    margin-top: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .video {
    margin-top: 20px;
    width: 100%;
    height: 350px;
    video {
      width: 100%;
      height: 100%;
    }
  }
  //用户设置
  .user {
    padding: 10px 0px;
    line-height: 50px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      margin-left: 10px;
    }
  }

  //   detail部分
  .detail {
    .title {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      i {
        cursor: pointer;
      }
    }
    .line1 {
      display: flex;
      margin-top: 10px;
      font-size: 13px;
      color: #cfcfcf;
      .playCnt {
        margin-left: 20px;
      }
    }
    .tips {
      display: flex;
      margin-top: 10px;
      .item {
        font-size: 13px;
        margin-right: 10px;
        padding: 2px 5px;
        background-color: #f7f7f7;
      }
    }
    .des {
      color: #373737;
      font-size: 14px;
      margin-top: 20px;
    }
  }
  //   operators
  .operators {
    display: flex;
    font-size: 14px;
    margin-top: 20px;
    .item {
      padding: 5px 20px;
      border: 1px solid #d8d8d8;
      border-radius: 20px;
      margin-right: 10px;
      color: #373737;
    }
  }
}
</style>
