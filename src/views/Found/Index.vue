<template>
  <div class="wrapper">
    <!-- 头部导航 -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect()"
      router
      :default-active="activeIndex"
      background-color="var(--theme--bg-color2)"
    >
      <!-- 开启router属性 则index相当于跳转路由的to属性 -->
      <el-menu-item index="/found/personal">个性推荐</el-menu-item>
      <el-menu-item index="/found/songmenu">歌单</el-menu-item>
      <el-menu-item index="/found/ranking">排行榜</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
    };
  },
  methods: {
    handleSelect(index) {
      console.log(index);
    },
  },
  mounted() {
    this.activeIndex = this.$route.path;
    console.log(this.activeIndex);
  },
  beforeRouteUpdate(to, from, next){
    console.log(to, from);
    this.activeIndex = to.path;
    next();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* nav */
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  font-size: large;
  color: white;
  border-bottom: 4px solid red;
  background-color: #333333;
}

.el-menu-item:hover {
  border-bottom: 4px solid red;
  background-color: #333333;
}
.el-menu-demo {
  margin-left: 25px;
}
.el-menu-item {
  font-size: 18px;
  padding: 0px 10px;
  color: #d0d0d0;
}
</style>
