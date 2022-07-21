<template>
  <el-row class="tac">
    <el-col :span="24" class="innerWrapper">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="var(--theme--bg-color2)"
        text-color=" var(--theme--font-color)"
        active-text-color="#ffd04b"
        router
      >
        <el-submenu index="/found">
          <template slot="title">
            <span>发现音乐</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/found">个性推荐</el-menu-item>
            <el-menu-item index="/found/songmenu">歌单</el-menu-item>
            <el-menu-item index="/found/ranking">排行榜</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/video">
          <span slot="title">视频</span>
        </el-menu-item>
        <el-menu-item index="/personalFM">
          <span slot="title">私人FM</span>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <span slot="title">我的音乐</span>
        </el-menu-item>
        <el-menu-item index="9">
          <span slot="title">最近播放</span>
        </el-menu-item>
        <el-menu-item index="7">
          <span slot="title">我的收藏</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LeftSide",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.tac {
  height: 100%;
  width: 200px;
}
/* 设置背景颜色 */

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
  /* padding-bottom: 100px; */
}
.wrapper {
  width: 18%;
  flex: 1;
}

.innerWrapper {
  height: 100%;
}
.el-menu-item {
  padding-left: 30px;
}
.el-menu-item:hover {
  background-color: #333333 !important;
}
.el-submenu:hover {
  background-color: #333333 !important;
}
</style>
