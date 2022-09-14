<template>
  <div class="wrapper">
    <ul class="listWrapper">
      <!-- 标题 -->
      <li class="mainTop">
        <div class="cnt"></div>
        <div class="operator">操作</div>
        <div class="title">标题</div>
        <div class="singer">歌手</div>
        <div class="album">专辑</div>
        <div class="time">时间</div>
      </li>
      <!-- 列表项 -->
        <!-- item项 -->
      <li
        v-for="(item, index) in songListDetail"
        :key="item.id"
        @dblclick="playMusic(item)"
        class="item"
      >
        <div class="cnt">{{ index + 1 }}</div>
        <div class="operator">
          <i class="iconfont icon-xihuan"></i>
          <i class="iconfont icon-xiazai1"></i>
        </div>
        <div class="title">{{ item.name }}</div>
        <div class="singer">{{ item.singer }}</div>
        <div class="album">{{ item.album }}</div>
        <!-- 时间格式化？ -->
        <div class="time">{{ (item.duration / 1000) | timeFormat }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
//songDetails
import {
  getRankingListByID,
  getSongDetail,
  songDetails,
} from "../../../api/Found/recommend.js";
export default {
  name: "listInfo",
  data() {
    return {
      songList: [],
      songListDetail: [],
    };
  },
  methods: {
    async getSongList() {
      const { data } = await getRankingListByID(this.$route.params.id);
      if (data.code != 200) {
        this.$message("error", "获取歌单信息错误");
      }
      this.songList = data.playlist.trackIds;
      let ids = [];
      this.songList.forEach(async (element) => {
        // 通过id获取详情信息
        ids.push(element.id);
      });
      ids = ids.join(",");
      const songInfo = await getSongDetail(ids);
      songInfo.data.songs.forEach((ele) => {
        //格式化
        const obj = new songDetails(ele);
        this.songListDetail.push(obj);
      });
    },
    //双击播放歌曲
    playMusic(item) {
      this.$store.dispatch("music/playMusic", {
        list: this.songListDetail,
        musicInfo: item,
      });
    },
    playFirst() {
      this.$store.dispatch("music/playMusic", {
        list: this.songListDetail,
        musicInfo: this.songListDetail[1],
      });
    },
  },
  mounted() {
    this.getSongList();
    this.$bus.$on("playFirst", this.playFirst);
  },
  beforeDestroy() {
    this.$bus.$off("playFirst");
  },
  filters: {
    formulateDt(val) {
      let min = parseInt((val / 3600) % 60);
      let s = parseInt(val % 60);
      return `${min}:${s}`;
    },
  },
};
</script>

<style scoped lang="scss">
.listWrapper {
  li {
    display: flex;
    line-height: 40px;
    font-size: 14px;
    color: #d0d0d0;
    .cnt {
      flex: 1;
      padding-left: 10px;
    }
    .operator {
      flex: 1;
      .icon-xiazai1 {
        margin-left: 10px;
      }
      i {
        cursor: pointer;
        font-size: 20px;
      }
      i:hover {
        color: red;
      }
    }
    .title {
      flex: 6;
      flex-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .singer {
      flex: 4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 20px;
    }
    .album {
      flex: 4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 20px;
    }
    .time {
      flex: 1;
    }
  }

  li:hover {
    background-color: #f4f4f4;
  }
  li:first-child {
    font-size: 13px;
  }
}
.listWrapper li:hover {
  background-color: #373737;
}
.mainTop:hover{
  background-color: var(--theme--bg-color2);
}
.item {
  cursor: pointer;
  background-color: var(--theme--bg-color2);
}
item:nth-of-type(odd){
  background-color:#2E2E2E;
}
</style>
