<template>
  <div class="wrapper">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerInfo" :key="index">
        <img v-lazy="item.imageUrl" :alt="item.typeTitle" />
      </el-carousel-item>
    </el-carousel>

    <!-- 热门歌单 -->
    <h2 style="color: var(--theme--font-color)">推荐歌单</h2>
    <RecommendList :list="personalizedInfo" @RankingDetail="handlerClick" />

    <!-- 热门播客 -->
    <!-- <div class="popular"> -->
    <!-- <h2>热门博客</h2> -->
    <!-- 每个小部分 -->
    <!-- <div class="popularItem"> -->
    <!-- 左边图片部分 -->
    <!-- <div class="itemLeft"></div> -->
    <!-- 右边描述详情 -->
    <!-- <div class="itemRight"> -->
    <!-- <h3></h3> -->
    <!-- <div class="clarify"></div> -->
    <!-- <div class="detail"></div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { getBanner, getPersonalized } from "../../../api/Found/recommend.js";
import RecommendList from "../../../components/found/RecommendSongs";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      bannerInfo: [],
      personalizedInfo: [],
    };
  },
  components: {
    RecommendList,
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async getBanner() {
      const { data } = await getBanner();
      if (data.code != 200) {
        this.$message("error", "获取轮播图信息有误");
      }
      this.bannerInfo = data.banners;
    },
    async getPersonalized() {
      const { data } = await getPersonalized(10);
      if (data.code != 200) {
        this.$message("error", "获取热门歌单信息有误");
      }
      console.log(data.result);
      this.personalizedInfo = data.result;
    },
    handlerClick(id) {
      this.$router.push({
        name: "detail",
        params: {
          id,
        },
      });
    },
  },
  async mounted() {
    this.getBanner();
    this.getPersonalized();
  },
  updated() {},
};
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
}
.el-menu-demo {
  margin-left: 0px;
}
/* 轮播图 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item img {
  width: 100%;
}
.el-carousel {
  width: 100%;
}
</style>
