<template>
  <div class="RankingWrapper">
    <ul v-for="(item, index) in songListDetail" :key="item.id"
     @dblclick="playMusic(item)"
    >
      <li class="cnt">{{ index + 1 }}</li>
      <li class="title">{{ item.name }}</li>
      <li class="singer">{{ item.singer }}</li>
    </ul>
    <div class="more" @click="handlerClick">
      查看更多
      <i class="iconfont icon-jiantou" style="font-size: 12px"></i>
    </div>
  </div>
</template>

<script>
import {
  getRankingListByID,
  getSongDetail,
  songDetails,
} from "../../../api/Found/recommend.js";
export default {
  props: ["rankingDataID"],
  methods: {
    // 获取ID 从而获取音乐列表
    async getRankingListByID(id) {
      const { data } = await getRankingListByID(id);
      this.songList = data.playlist.trackIds.slice(0, 5);

      this.songList.forEach(async (element) => {
        // 通过id获取详情信息
        const songInfo = await getSongDetail(element.id);
        const obj = new songDetails(songInfo.data.songs[0]);
        this.songListDetail.push(obj);
      });
      // console.log(this.songListDetail);
    },
    // 点击跳转更多
    handlerClick() {
      console.log("我被点击触发啦");
      this.$router.push({
        name: "detail",
        params: {
          id: this.rankingDataID,
        },
      });
    },
    //双击播放音乐
     playMusic(item) {
      this.$store.dispatch("music/playMusic", {
        list: this.songListDetail,
        musicInfo: item,
      });
    },
  },
  async mounted() {
    this.getRankingListByID(this.rankingDataID);
  },
  data() {
    return {
      songList: [],
      songListDetail: [],
    };
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.RankingWrapper {
  width: 100%;
}
ul,
li {
  list-style: none;
}
// [data-v-2208d198] ul:nth-of-type(odd) {
//   background-color: var(--theme--bg-color2);
// }
ul {
  display: flex;
  width: 90%;
  margin-left: 20px;
  position: relative;

  li {
    color: #676767;
    margin-left: 10px;
    font-size: 14px;
    line-height: 30px;
    padding: 6px;
  }
  .cnt {
    color: red;
  }
  .percent {
    color: darkgrey;
  }
  .other {
    color: darkgrey;
  }
  .singer {
    color: darkgrey;
    position: absolute;
    right: 10px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: end;
  }
}
.more {
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  transform: translateX(40px);
  color: #676767;
}
</style>
