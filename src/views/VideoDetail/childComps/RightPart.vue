<template>
  <div class="rightWrapper">
    <h4>相关推荐</h4>
    <div
      class="part"
      v-for="item in relatedInfo"
      :key="item.vid"
      @click="handlerClick(item.vid)"
    >
      <div class="img">
        <img :src="item.coverUrl" alt="" />
      </div>
      <div class="detail">
        <div class="title">{{ item.title }}</div>
        <div class="creator">by {{ item.creator[0].userName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRelatedVideo } from "../../../api/Video/index";
export default {
  data() {
    return {
      relatedInfo: [],
    };
  },
  methods: {
    async getRelatedVideo(id) {
      const { data } = await getRelatedVideo(id);
      if (data.code != 200) {
        return this.$message.error("获取相关视频出错");
      }
      console.log(data);
      this.relatedInfo = data.data;
    },
    handlerClick(id) {
      this.$router.push({
        name: "videoDetail",
        params: { id },
      });
    },
  },
  mounted() {
    console.log("我进来啦");
    this.getRelatedVideo(this.$route.params.id);
  },
  //   深度监听$route 从而根据id改变重新调用api获取新数据
  watch: {
    $route: {
      handler(to, from) {
        this.getRelatedVideo(from.params.id);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.rightWrapper {
  height: 600px;
  width: 400px;
  margin-left: 40px;
  h4 {
    padding: 20px 0px;
  }
  .part {
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;
    .img {
      width: 170px;
      height: 100px;
      img {
        max-width: 100%;
        height: auto;
      }
    }
    .detail {
      width: 130px;
      padding: 10px;
      .title {
        width: 100%;
        height: 40px;
        overflow: hidden;
        white-space: nowrap;
        // 设置还有点问题？
        text-overflow: ellipsis;
        font-size: 14px;
      }
      .creator {
        margin-top: 15px;
        font-size: 13px;
        color: #9f9f9f;
      }
    }
  }
}
</style>
