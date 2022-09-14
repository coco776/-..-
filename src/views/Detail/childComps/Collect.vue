<template>
  <div class="wrapper">
    <div class="flexWrapper">
      <div class="collectItem" v-for="item in collectList" :key="item.userId">
        <img @click="learnMore(item.userId)" v-lazy="item.avatarUrl" alt="" />
        <div class="nickname">{{ item.nickname }}</div>
        <i
          class="iconfont icon-xingbienv"
          v-if="item.gender == 2"
          :style="{ color: 'pink', fontSize: '17px' }"
        ></i>
        <i
          class="iconfont icon-xingbienan"
          v-if="item.gender == 1"
          :style="{ color: '#C0F3FF', fontSize: '17px' }"
        ></i>
      </div>
    </div>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSubscribers } from "../../../api/Detail/album";
export default {
  data() {
    return {
      collectList: null,
    };
  },
  methods: {
    async getSubscribers(id, offset = 0, limit = 24) {
      const { data } = await getSubscribers(id, offset, limit);
      if (data.code != 200) {
        return this.$message("error", "获取收藏者信息有误");
      }
      console.log(data);
      this.collectList = data.subscribers;
    },
    handleCurrentChange(p) {
      let offset = (p - 1) * 21;
      this.getSubscribers(this.$route.params.id, offset);
    },
    // 点击头像跳转主页
    learnMore(id) {
      this.$router.push({
        name: "PersonalPage",
        params: {
          id,
        },
      });
    },
  },
  mounted() {
    this.getSubscribers(this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  color: #d0d0d0;
  width: 100%;
  .flexWrapper {
    display: flex;
    flex-wrap: wrap;
    .collectItem {
      flex-basis: 33%;
      padding: 50px 0px;
      // justify-content: space-around;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        cursor: pointer;
        margin-left: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .nickname {
        margin-left: 20px;
        font-size: 15px;
        margin-right: 5px;
      }
    }
  }
  .pagination {
    width: 400px;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>
