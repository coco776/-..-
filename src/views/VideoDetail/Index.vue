<template>
  <div class="wrapper">
    <!--  头部布局 -->
    <Header />
    <div class="mainBody">
      <!-- 上部分-->
      <div class="top">
        <!-- 左部分 -->
        <LeftPart :videoInfo="videoInfo" />
        <!-- 右部分 -->
        <RightPart />
      </div>
      <!-- 评论 -->
    </div>
  </div>
</template>

<script>
import Header from "../../components/Layout/Header.vue";
import LeftPart from "./childComps/LeftPart.vue";
import RightPart from "./childComps/RightPart.vue";
import { getVideoDetail } from "../../api/Video/index";
export default {
  components: {
    LeftPart,
    RightPart,
    Header,
  },
  data() {
    return {
      videoInfo: {},
    };
  },
  methods: {
    async getVideoDetail(id) {
      const { data } = await getVideoDetail(id);
      console.log(data);
      this.videoInfo = data.data;
    },
  },
  mounted() {
    this.getVideoDetail(this.$route.params.id);
  },
  watch: {
    $route: {
      handler(to, from) {
        this.getVideoDetail(from.params.id);
      },
    },
    deep: true,
  },
};
</script>

<style scoped lang="scss">
.mainBody {
  width: 1100px;
  margin: 0 auto;
}
::v-deep .top {
  display: flex;
}
</style>
