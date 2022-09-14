<template>
  <div class="wrapper">
    <!-- 官方榜 -->
    <h2>官方榜</h2>
    <div class="hot clarifyList" v-for="item in listBefore" :key="item.id">
      <!-- 左边图片显示 -->
      <div class="left" @click="handlerClick(item.id)">
        <img v-lazy="item.coverImgUrl" alt="" />
        <div class="update">{{item.updateTime | formulateTime}}</div>
      </div>
      <!-- 右边的歌单详情 -->
        <RankingListItem :rankingDataID="item.id"/>
    </div>
    <!-- 全球榜 -->
    <div class="global">
      <h2>全球榜</h2>
      <RecommendList :list="listAfter" @RankingDetail='handlerClick'/>
    </div>
    <!-- 推荐歌单组件？ -->
  </div>
</template>

<script>
import { getRankingList } from "../../../api/Found/recommend.js";
import RankingListItem from "./RankingListItem"
import {handlerTime} from "../../../mixin/time"
import RecommendList from "../../../components/found/RecommendSongs"
export default {
  name: "RankingList",
  data() {
    return {
      classList: ["cnt", "percent", "title", "other", "singer"],
      listBefore: [],
      listAfter: [],
      imgStyle: "",
      mixins:[handlerTime]
    };
  },
  components:{
      RankingListItem,
      RecommendList
  }
  ,
  methods: {
    async getRankingList() {
      const { data } = await getRankingList();
      if (data.code != 200) {
        this.$message("error", "获取排行榜信息有误");
      }
      this.listBefore = data.list.slice(0, 4);
      this.listAfter = data.list.slice(4);
    },
    handlerClick(id){
      this.$router.push({
        name:'detail',
        params:{
          id
        }
      })
    }
    },
  mounted() {
    this.getRankingList();
  },
  filters:{
      formulateTime(time){
        const date = new Date(time);
        const month = date.getMonth()+1;
        const day = date.getDate();
        return `${month}月${day}日更新`;
      }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.wrapper{
    padding: 20px;
}
h2{
  color: var(--theme--font-color);
}
ul,
li {
  list-style: none;
}

.clarifyList {
  display: flex;
  margin-top: 40px;
  .left {
    width: 200px;
    height: 200px;
    aspect-ratio: 1;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
    }
    .update{
        bottom: 27%;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        color: white;
        font-size: 13px;
    }
  }
  .songList {
    flex: 1;
    margin-left: 50px;
    margin-top: 50px;
  }
}

//右边歌单样式

// 全球榜
.global{
  margin-top: 50px;
}
</style>
<style scoped>
/deep/ul:nth-of-type(odd) {
  background-color: #2E2E2E;
}
/deep/ul:hover {
  background-color: #333333;
}
/deep/ul{
  cursor: pointer;
}
</style>
