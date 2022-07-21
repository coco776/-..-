<template>
  <div class="wrapper">
    <!-- 第一部分 -->
    <template>
      <el-skeleton class="part1" style="display: flex; flex: 1" :loading="loading" animated>
        <template slot="template">
          <div class="part1">
            <div class="img">
              <el-skeleton-item
                variant="image"
                style="max-width: 100%; height: 100%; border-radius: 10px"
              />
            </div>
            <div class="song">
              <!-- <div class="songName">{{ musicInfo.name }}</div>
            <div class="singer">{{ musicInfo.singer }}</div>
            -->
              <el-skeleton-item variant="text" style="" />
              <el-skeleton-item
                variant="text"
                style="
                  font-size: 14px;
                  width: 100px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              />
            </div>
          </div>
        </template>

        <template>
          <div class="part1" style="display: flex">
            <div class="img">
              <img :src="musicInfo.picUrl && musicInfo.picUrl" alt="" />
            </div>

            <div class="song">
              <div class="songName">{{ musicInfo.name }}</div>
              <div class="singer">{{ musicInfo.singer }}</div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </template>
    <!--第二部分 -->
    <div class="part2">
      <div class="line1">
        <i :class="playType" @click="changePlayType"></i>
        <i class="iconfont icon-shangyishou" @click="lastSong"></i>
        <i class="iconfont icon-bofang" v-if="!isPlay" @click="startPlay"></i>
        <i class="iconfont icon-24gf-pause2" v-else @click="stopPlay"></i>
        <i class="iconfont icon-xiayishou" @click="nextSong"></i>
        <i>词</i>
      </div>
      <!-- 进度条 -->
      <div class="line2">
        <!-- 当前进度 -->
        <div class="currentTime timeRemind">{{ singTime | timeFormat }}</div>
        <div class="block">
          <el-slider
            :show-tooltip="false"
            v-model="sliderValue"
            @change="updatePlay"
          ></el-slider>
        </div>
        <!--总时长 -->
        <span class="duration timeRemind">{{
          (musicInfo.duration / 1000) | timeFormat
        }}</span>
      </div>
    </div>

    <!-- 第三部分 -->
    <div class="part3">
      <div class="volume-wrapper">
        <div class="volume" @click="handleClick">
          <i class="iconfont icon-caozuo-jingyin" v-if="isMute"></i>
          <i class="iconfont icon-yinliang" v-else></i>
        </div>
        <div class="block" input-size="mini">
          <el-slider
            v-model="volume"
            vertical
            height="200px"
            input-size="mini"
            change="updateVolume"
          >
          </el-slider>
        </div>
      </div>
    </div>

    <!-- audio -->
    <audio
      ref="audio"
      :src="musicUrl"
      autoplay
      @timeupdate="timeupdate"
      @ended="nextSong"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getMusicUrl } from "../../api/Music/index";
export default {
  data() {
    return {
      singTime: "",
      playType: "iconfont icon-24gl-playlistHeart3",
      percentage: 0,
      songLength: 100,
      sliderValue: 0,
      musicUrl: "",
      percent: "",
      isMute: false,
      saveVolume: 0,
      volume: 50,
      loading: true,
    };
  },
  // 引入store的state数据（简化形式）
  computed: {
    ...mapState("music", ["musicInfo", "isPlay", "musicIndex", "musicList"]),
  }, //监听该属性 控制歌曲播放与暂停
  watch: {
    isPlay(val) {
      if (this.musicUrl == "") return;
      if (val) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    volume(val) {
      this.$refs.audio.volume = val / 100;
    },
    musicInfo(val) {
      if (val) {
        this.loading = false;
      }
      this.getMusicUrl(this.musicInfo.id);
    },
    // isMute(val) {
    //   if(val)
    // },
  },
  methods: {
    //引入store中的方法
    ...mapMutations("music", {
      setIsplay: "SET_PLAYSTATE",
      setMusicInfo: "SET_MUSICINFO",
      setMusicIndex: "SET_MUSICINDEX",
    }),
    //静音和非静音模式切换
    handleClick() {
      this.isMute = !this.isMute;
      if (this.isMute) {
        this.saveVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.saveVolume;
      }
    },
    // 切换播放模式i
    changePlayType() {
      console.log(this.musicInfo);
      const playClass = [
        "iconfont icon-24gl-playlistHeart3",
        "iconfont icon-24gl-repeat2",
        "iconfont icon-24gl-repeatOnce2",
        "iconfont icon-suijibofang",
      ];
      for (let i = 0; i < playClass.length; i++) {
        if (this.playType === playClass[i]) {
          console.log("come");
          if (i + 1 == playClass.length) {
            this.playType = playClass[0];
            return;
          }
          this.playType = playClass[i + 1];
          return;
        }
      }
    },
    //格式化？
    formatTooltip(val) {
      console.log(val);
      return val / 100;
    },
    //时刻更新当前播放时间
    timeupdate() {
      if (!this.$refs.audio) return;
      let currentTime = this.$refs.audio.currentTime;
      currentTime = Math.floor(currentTime);
      this.singTime = currentTime;
      // 当前歌长换算为进度条百分比
      this.sliderValue = Math.floor(
        ((this.singTime * 1000) / this.musicInfo.duration) * 100
      );
    },
    // 拖动滚动条更新播放
    updatePlay(val) {
      console.log(val);
      let time = ((val / 100) * this.music.duration) / 1000;
      this.$refs.currentTime = time;
    },
    // 获取歌曲URL
    async getMusicUrl(id) {
      const { data } = await getMusicUrl(id);
      console.log(data);
      if (data.code != 200) {
        return this.$message("播放音乐有误");
      }
      this.musicUrl = data.data[0].url;
      console.log(this.musicUrl);
    },
    //播放音乐
    startPlay() {
      this.setIsplay(true);
    },
    // 停止播放(通过控制isPlay状态监听 开始播放同样)
    stopPlay() {
      this.setIsplay(false);
    },
    // 上一首歌曲
    lastSong() {
      //已经是第一个歌曲了
      if (this.musicIndex == 0) {
        this.setIsplay(false);
        return this.$message.error("已经是第一首啦");
      } else {
        this.setMusicIndex(this.musicIndex - 1);
        this.setMusicInfo(this.musicList[this.musicIndex]);
        let id = this.musicInfo.id;
        this.getMusicUrl(id);
        this.setIsplay(true);
      }
    },
    // 跳转下一首歌
    nextSong() {
      if (this.musicIndex == this.musicList.length - 1) {
        this.setIsplay(false);
        return this.$message.error("已经是最后一首啦");
      } else {
        this.setMusicIndex(this.musicIndex + 1);
        this.setMusicInfo(this.musicList[this.musicIndex]);
        let id = this.musicInfo.id;
        this.getMusicUrl(id);
        this.setIsplay(true);
      }
    },
    updateVolume(val) {
      console.log(val);
    },
  },
  mounted() {
    // document.documentElement.style.setProperty("--theme--font-color", "green");
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  // 设置字体颜色
  color: var(--theme--font-color);
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0px;
  border: 1px solid #e1e1e1;
  // 设置背景色
  background-color: var(--theme--bg-color);
  z-index: 99;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.part1 {
  display: flex !important;
  flex: 1;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }
  .song {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 16px;
    .singer {
      font-size: 14px;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.part2 {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  .line1 {
    i {
      cursor: pointer;
      margin-left: 35px;
      color: #9f9f9f;
    }
    .icon-bofang,
    .icon-24gf-pause2 {
      padding: 10px 8px 10px 8px;
      display: inline-block;
      border-radius: 20px;
      background-color: var(--theme--bg-color2);
      text-align: center;
    }
  }
  .line2 {
    display: flex;
    align-items: center;
    .block {
      width: 400px;
      margin-left: 10px;
    }
    .timeRemind {
      margin-left: 10px;
      font-size: 13px;
      color: #9f9f9f;
    }
  }
}
.el-slider__bar {
  background-color: red;
}
.el-slider__button {
  border: 2px solid red;
  width: 10px;
  height: 10px;
}
.part3 {
  flex: 1;
  display: flex;
  width: 290px;
  height: 100%;
  align-items: center;
  position: relative;
  .volume-wrapper:hover .block {
    display: block;
  }
  .volume {
    i {
      font-size: 25px;
      cursor: pointer;
      color: #9f9f9f;
    }
  }
  .block {
    padding: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: absolute;
    bottom: 64%;
    left: -13px;
    display: none;
  }
  //不生效是为什么为什么为什么
  .el-slider__runway {
    width: 3px !important;
    margin: 0px 13px !important;
    .el-slider__bar {
      width: 2px !important;
      background-color: red !important;
    }
  }
}
</style>
