<template>
  <div class="menuWrapper">
    <!-- 顶部显示 -->
    <div class="topWrapper">
      <div class="menuTop">
        <div class="background" :style="styleObj"></div>
        <img v-lazy="firstList.coverImgUrl" />
        <div class="topRight">
          <p>
            <i></i>
            精品歌单
          </p>
          <div class="description">
            {{ firstList.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中间分类选择 -->
    <div class="middle" style="color:var(--theme--font-color);">
      <div class="reminder">
        {{ clarify }}
      </div>
      <ul class="clarify">
        <li
          v-for="(item, index) in dataObj"
          @click="handlerClick(index)"
          :class="['clarifyItem', item.isActive ? 'activeli' : '']"
          :key="index"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>

    <!-- 推荐歌单展示 -->
    <RecommendList :list="clarifyList" @RankingDetail="handlerClick2" />

    <!--底部分页 -->
    <el-pagination
    background="var(--theme--bg-color)"
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="200"
      class="pagination"
      @current-change="handlerChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getClarifyList } from "../../../api/Found/recommend";
import RecommendList from "../../../components/found/RecommendSongs";
export default {
  name: "SongMenu",
  data() {
    return {
      clarify: "华语",
      dataObj: [
        { text: "华语", isActive: true },
        { text: "流行", isActive: false },
        { text: "摇滚", isActive: false },
        { text: "民谣", isActive: false },
        { text: "电子", isActive: false },
        { text: "另类/独立", isActive: false },
        { text: "轻音乐", isActive: false },
        { text: "综艺", isActive: false },
      ],
      clarifyList: [],
      firstList: {},
      styleObj: {},
    };
  },
  components: {
    RecommendList,
  },
  methods: {
    //  处理当前页发生改变
    handlerChange(val) {
      console.log(val);
      //重新请求数据
      this.getClarifyList(val * 40, 40);
    },
    //   处理中间分类绑定
    handlerClick(item) {
      this.dataObj.forEach((a, b) => {
        if (b == item) {
          a.isActive = true;
          this.clarify = a.text;
          this.getClarifyList(0, 40);
        } else {
          a.isActive = false;
        }
      });
    },
    // 分类加载歌单
    async getClarifyList(offset, limit) {
      const { data } = await getClarifyList(this.clarify, offset, limit);
      if (data.code != 200) {
        this.$message("error", "获取推荐歌单失败");
      }
      this.clarifyList = data.playlists;
      this.firstList = data.playlists[0];
      this.styleObj = {
        backgroundImage: `url(${this.firstList.coverImgUrl})`,
      };
    },
    // 跳转歌单
    handlerClick2(id) {
      this.$router.push({
        name: "detail",
        params: {
          id,
        },
      });
    },
  },
  mounted() {
    this.getClarifyList(0, 40);
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
li,
ul {
  list-style: none;
}
.menuWrapper {
  flex: 1;
  padding: 30px;
}

/* top设置 */
.topWrapper {
  position: relative;
}
.menuTop {
  width: 100%;
  height: 180px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  padding-left: 0px;
  box-sizing: border-box;
}
.menuTop img {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  margin-left: 10px;
}
.background {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  filter: blur(3px);
  position: absolute;
  z-index: -99;
}
.topRight {
  flex: 1;
  padding: 15px;
  height: 100%;
  margin-left: 10px;
}
.topRight p {
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #c59455;
  display: inline-block;
  text-align: center;
  color: #c59455;
}
.description {
  margin-top: 20px;
  font-size: 15px;
  color: white;
}
/* 中间部分样式 */
.middle {
  margin-top: 20px;
  position: relative;
  display: flex;
}
ul {
  display: flex;
  position: absolute;
  right: 0;
  li {
    cursor: pointer;
    margin-left: 20px;
    padding: 3px 7px;
    font-size: 13px;
  }
}
.reminder {
  font-size: 13px;
}
.activeli {
  border-radius: 14px;
  background-color: #fdf5f5;
  color: #f06841;
}
// 分页
.pagination {
  margin-top: 50px;
  text-align: center;
  color: var(--theme--font-color);
  background-color: var(--theme--bg-color2);
    .el-pager .active{
    background-color: var(--theme--bg-color2) !important;
  }
}

</style>
