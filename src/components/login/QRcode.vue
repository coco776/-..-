<template>
  <div class="QRwrapper">
    <div class="imgWrapper">
      <img :src="imgSrc" alt="" class="QRcode" />
      <p>使用 网易云音乐APP 扫码登录</p>
    </div>
    <div class="cover" v-if="QRcodeState == 800">
      <el-button
        type="danger"
        v-if="QRcodeState == 800"
        class="outDate"
        @click="getQRcodeInfo"
        >点击刷新</el-button
      >
    </div>
  </div>
</template>

<script>
// import axios  from 'axios';
import { getQRkey, getQRcode, getQRstate } from "../../api/login/QRcode.js";
export default {
  data() {
    return {
      imgSrc: "",
      QRcodeState: 0,
      id: "",
      QRcodeKey: "",
    };
  },
  mounted() {
    this.getQRcodeInfo();
  },
  beforeDestroy() {
    clearInterval(this.id);
  },
  methods: {
    //重名不影响？ 加this就可以区分了
    async getQRcodeInfo() {
      const data = await getQRkey();
      if (data.code == !200) {
        return this.$message("error", "二维码获取失败");
      }
      this.QRcodeKey = data.data.unikey;
      //   通过key获取对应url
      const QRcodeData = await getQRcode(this.QRcodeKey);
      console.log(QRcodeData);
      if (QRcodeData.data.code != 200) {
        return this.$message("error", "二维码获取失败");
      }
      this.imgSrc = QRcodeData.data.data.qrimg;
      this.QRcodeState = 801;
      this.id = setTimeout(async () => {
        const data = await getQRstate(this.QRcodeKey);
        console.log(data);
        this.QRcodeState = data.data.code;
        console.log("进来了哦");
        console.log(this.QRcodeState);
        if (this.QRcodeState == 800) {
          //需要重新刷新
          clearInterval(this.id);
        } else if (this.QRcodeState == 803) {
          //登录成功
          //设置token
          this.$store.commit("SET_TOKEN", data.token);
          localStorage.setItem("userID", data.account.id);
          //清除定时器
          clearTimeout(this.id);
          //跳转页面
          this.$router.push("/found");
        }
      }, 60000);
    },
  },
};
</script>

<style scoped>
.QRwrapper {
  width: 40%;
  margin-left: 80px;
  margin-top: 30px;
  position: relative;
}
.imgWrapper {
  width: 100%;
  height: 100%;
}
.cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.outDate {
  margin-top: 35%;
}
p {
  font-size: 13px;
  white-space: nowrap;
  color: grey;
}
</style>
