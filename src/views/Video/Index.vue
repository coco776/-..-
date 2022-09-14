<template>
  <div class="wrapper">
    <!-- 导航条 -->
    <div class="nav">
      <ul>
        <li
          v-for="item in navInfo"
          :key="item.id"
          :class="(['navItem'], activeText == item.text ? 'active' : '')"
          @click="handlerClick(item.text)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <!-- 视频 -->
    <VideoPart :videoList="videoList" />
  </div>
</template>

<script>
import VideoPart from "./childComps/VideoPart.vue";
import { getVideoAllList } from "../../api/Video/index";
export default {
  data() {
    return {
      navInfo: [
        { text: "现场", id: 0 },
        { text: "翻唱", id: 1 },
        { text: "舞蹈", id: 2 },
        { text: "听BGM", id: 3 },
        { text: "MV", id: 4 },
        { text: "生活", id: 5 },
        { text: "游戏", id: 6 },
        { text: "ACG音乐", id: 7 },
        { text: "最佳饭制", id: 8 },
      ],
      activeText: "",
      videoList: {},
    };
  },
  components: {
    VideoPart,
  },
  methods: {
    handlerClick(text) {
      this.activeText = text;
    },
    async getVideoAllList() {
      const { data } = await getVideoAllList();
      if (data.code != 200) {
        return this.$message.error("获取视频信息有误");
      }
      let list = [];
      data.datas.forEach((element) => {
        list.push(element.data);
      });
      this.videoList = list;
      console.log(this.videoList);
    },
  },
  mounted() {
    this.getVideoAllList();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1100px;
  position: relative;
  padding: 30px;
  .nav {
    position: absolute;
    right: 0;
    ul {
      display: flex;
      align-items: center;
      li {
        margin-left: 20px;
        font-size: 13px;
        color: #aaaaaa;
        cursor: pointer;
        padding: 4px 5px;
      }
      .active {
        color: #ec4141;
        padding: 4px 10px;
        border-radius: 10px;
        background-color: #fcebeb;
      }
    }
  }
}
</style>
