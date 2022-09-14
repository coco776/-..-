<template>
  <div class="Wrapper">
    <Header />
    <div class="mainBody">
      <LeftSide />
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Header from "../../components/Layout/Header";
import Bottom from "../../components/Layout/Bottom";
import LeftSide from "../../components/Layout/LeftSide";
export default {
  data() {
    return {
      activeIndex: "/found/personal",
    };
  },
  components: {
    LeftSide,
    Header,
    Bottom,
  },
};
</script>

<style scoped>
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
  /* display: ; */
  flex: 1;
  display: flex;
  max-height: calc(100vh - 165px);
  background-color: var(--theme--bg-color2);
  /* -moz-context-; */
}
.right {
  flex: 1;
  padding: 30px;
  padding-right: 50px;
  padding-left: 50px;
  padding-bottom: 102px;
  overflow: auto;
}
/* 这里需要设置定宽 因为上面的right盒子需要flex为1 */
/deep/ .tac {
  width: 200px;
}
</style>
