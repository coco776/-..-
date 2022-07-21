<template>
  <!-- 推荐歌单 -->
  <div class="recomWrapper">
    <!-- > -->
    <span></span>
    <template>
    <el-skeleton style=" width: 100%;" :loading="loading" animated :count="list.length">
      <template slot="template">
          <div class="recomItem" >
              <div class="imgWrapper" style="position: relative;">
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height:100%;position:absolute;"
                />
              </div>
              <el-skeleton-item variant="text" />
          </div>
      </template>

      <template>
        <div class="recomInner">
          <div class="recomItem" v-for="item in list" :key="item.id">
            <RecommendItem
              :src="item.picUrl || item.coverImgUrl || defaultSrc"
              :key="item.id"
              :playCount="item.playCount"
              :describe="item.name"
              @click.native="changeRoute(item.id)"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
    </template>
  </div>
</template>

<script>
import RecommendItem from "./RecommenItem";
export default {
  props: ["list"],
  components: {
    RecommendItem,
  },
  data() {
    return {
      defaultSrc: "../../assets/img/动态图.gif",
      loading:true
    };
  },
  watch:{
    list(val){
      if(val){
        this.loading = false;
      }else{
        this.loading = true;
      }
    }
  },
  methods: {
    changeRoute(id) {
      console.log("我被触发了哦");
      console.log(id);
      this.$emit("RankingDetail", id);
    },
  },
  beforeDestroy() {
    this.$off("RankingDetail");
  },
};
</script>

<style lang='scss'>
/* 推荐歌单 */
.recomWrapper {
  width: 100%;
  margin-top: 50px;
}
.recomInner {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.recomItem {
  margin-top: 20px;
  flex-basis: 18%;
  margin-right: 22px;
  .imgWrapper{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
}
.el-skeleton{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap
}
</style>
