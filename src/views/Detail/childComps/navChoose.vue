<template>
  <!-- 下面歌单列表展示 -->
  <div class="listShow">
    <!--导航条 -->
    <div class="nav">
      <!-- 开启router属性 则index相当于跳转路由的to属性(dddd) -->
      <router-link
        :to="{
          name: 'listshow',
          params: {
            id: $route.params.id,
          },
        }"
      >
        歌曲列表
      </router-link>

      <router-link
        :to="{
          name: 'comment',
          params: {
            id: $route.params.id,
          },
        }"
        >评论({{ mainInfo.commentCount }})
      </router-link>

      <router-link
        :to="{
          name: 'collect',
          params: {
            id: $route.params.id,
          },
        }"
        >收藏者
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "navChoose",
  props: ["mainInfo"],
};
</script>

<style scoped lang="scss">
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  font-size: large;
  border-bottom: 4px solid red;
}

.el-menu-item:hover {
  border-bottom: 4px solid red;
}
.el-menu-item {
  margin-left: 20px;
}
.firstItem {
  margin-left: 0;
  padding-left: 0;
}
.nav {
  margin-top: 40px;
  margin-bottom: 40px;
  a {
    color: #d0d0d0;
    text-decoration: none;
    padding-bottom: 5px;
    margin-left: 20px;
  }
  // 选中的a标签
  .router-link-exact-active {
    font-size: large;
    border-bottom: 4px solid red;
    font-weight: bold;
  }
}
</style>
