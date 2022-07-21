<template>
  <div class="personalFM">
    <div class="topPart">
      <LeftPart />
      <RightPart />
    </div>
    <div class="commentPart"><Comment /></div>
  </div>
</template>

<script>
import LeftPart from "./childComps/LeftPart.vue";
import RightPart from "./childComps/RightPart.vue";
import Comment from "../../components/Detail/Comment.vue";
import { getMusicFM } from "../../api/Music/index";
export default {
  components: {
    LeftPart,
    RightPart,
    Comment,
  },
  data() {
    return {
      musicInfo: null,
    };
  },
  methods: {
    async getMusicFM() {
      const { data } = await getMusicFM();
      console.log(data);
      if (data.code != 200) {
        this.$message.error("获取歌曲信息有误");
      }
      this.musicInfo = data.data[0];
      this.$bus.$emit("getMusicInfo", data.data[0]);
    },
  },
  mounted() {
    this.getMusicFM();
  },
};
</script>

<style scoped lang="scss">
.personalFM {
  width: 700px;
  margin: 0 auto;
}
.topPart {
  display: flex;
}
::v-deep .topItem {
  width: 50%;
  height: 500px;
  box-sizing: border-box;
}
.commentPart {
  margin-top: 50px;
}
</style>
