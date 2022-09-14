<template>
  <div class="login">
    <el-row class="wrapper" type="flex" justify="center">
      <el-col class="inner-wrapper" :xs="16" :sm="16" :md="14" :lg="14" :xl="16">
        <!-- pc端显示 -->
        <el-col :span="12" v-if="isDesktop">
          <div class="left content"></div>
        </el-col>
        <!-- 右侧登录注册区域 -->
        <el-col :span="12">
          <div class="right content">
            <router-view />
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import mapstate from 'vuex'
export default {
  name: "LoginIndex",
  computed: {
    isDesktop() {
      return this.$store.state.app.device === "desktop";
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url(../../assets/img/大鱼海棠.webp);
  /* background-position: center; */
  background-size: cover;
}
.wrapper {
  width: 100%;
  height: 400px;
  margin-top: 100px;
}
.inner-wrapper {
  opacity: 0.9;
  background-color: rgba(1, 0, 0, 0.5);
}
.content {
  border: 1px solid pink;
  height: 100%;
}
.el-col-12 {
  height: 100%;
}
</style>
