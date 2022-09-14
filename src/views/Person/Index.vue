<template>
  <div class="wrapper">
    <MainShow :personInfo="personInfo" :level="level" />
    <!-- 导航条部分 -->
    <Nav />
    <!-- 路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import MainShow from "./childComps/MainShow.vue";
import Nav from "./childComps/Nav";
import { getUserDetail } from "../../api/Person/index";

export default {
  components: {
    MainShow,
    Nav,
  },
  data() {
    return {
      personInfo: null,
      level: 0,
    };
  },
  methods: {
    async getUserDetail(id) {
      const { data } = await getUserDetail(id);
      console.log(data);
      if (data.code != 200) {
        this.$message("error", "获取用户信息有误");
      }
      this.personInfo = data.profile;
      this.level = data.level;
    },
  },
  mounted() {
    this.getUserDetail(this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.Wrapper {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 滚动条怎么在这里呀？ */
  /* overflow: hidden; */
}
.mainBody {
  flex: 1;
  display: flex;
}
.right {
  flex: 1;
  padding-right: 50px;
  padding-left: 50px;
  padding-bottom: 200px;
}
</style>
>
