<template>
  <div class="topItem">
    <div class="title">{{ musicInfo.name }}</div>
    <div class="detail">
      <div class="album">
        专辑:
        <span>{{ musicInfo.album.name }}</span>
      </div>
      <div class="singer">
        歌手：
        <span>{{ musicInfo.artists[0].name }}</span>
      </div>
    </div>
    <div class="wordsWrapper">
      <ul class="words">
        <li v-for="item in musicLyrics" :key="item.time">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLyrics } from "../../../api/Music/index";
export default {
  name: "RightPart",
  data() {
    return {
      musicInfo: {
        name: "未知歌曲",
        album: {
          name: "未知专辑",
        },
        artists: [
          {
            name: "未知歌手",
          },
        ],
      },
      musicLyrics: null,
    };
  },
  methods: {
    getMusicInfo(musicInfo) {
      this.musicInfo = musicInfo;
      console.log(musicInfo);
      this.getLyrics();
    },
    async getLyrics() {
      if (!this.musicInfo) return;
      const { data } = await getLyrics(this.musicInfo.id);
      console.log(data);
      this.musicLyrics = data.lrc.lyric;
      console.log(this.musicLyrics);
      this.musicLyrics = this.formatLyric(this.musicLyrics);
      console.log(this.musicLyrics);
    },
    //传入初始歌词文本text
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      var lyric = [];
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          //秒单位
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
      //   this.$store.commit("setLyric", this.lyric); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
      return lyric;
    },
    sortRule(a, b) {
      //设置一下排序规则
      return a.time - b.time;
    },
  },
  mounted() {
    this.$bus.$on("getMusicInfo", this.getMusicInfo);
  },
};
</script>

<style scoped lang="scss">
.topItem {
  display: flex;
  flex-direction: column;
  padding: 0px 25px;
  align-items: center;
  .title {
    width: 100%;
    font-size: 23px;
    // margin-top: 20px;
  }
  .detail {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-size: 14px;
    color: #8a8a8a;
    .album span,
    .singer span {
      vertical-align: middle;
      display: inline-block;
      width: 90px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .singer span {
      margin-left: 10px;
    }
  }
  .wordsWrapper {
    margin-top: 10px;
    height: 350px;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    .words {
      height: 800px;
      width: 100%;
      li {
        margin-top: 14px;
        color: #aaaaaa;
      }
    }
  }
}
</style>
