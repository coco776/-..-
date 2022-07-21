<template>
  <div class="wrapper">
    <!--上方主要信息展示 -->
    <DetailHeader :mainInfo="mainInfo" />
    <navChoose :mainInfo="mainInfo" />
    <router-view> </router-view>
  </div>
</template>

<script>
import DetailHeader from "./childComps/detailHeader.vue";
import navChoose from "./childComps/navChoose.vue";
import { getRankingListByID } from "../../api/Found/recommend";
export default {
  data() {
    return {
      mainInfo: [],
      id: "",
    };
  },
  components: {
    DetailHeader,
    navChoose,
  },
  methods: {
    async getRankingListByID(id) {
      const { data } = await getRankingListByID(id);
      this.mainInfo = data.playlist;
      console.log(data.playlist);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getRankingListByID(this.id);
  },
};
</script>

<style scoped lang="scss"></style>
