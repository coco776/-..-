<template>
  <div class="captchaWrapper">
    <el-form :model="dataObj" ref="phoneForm" status-icon :rules="mainRules">
      <el-form-item prop="phone">
        <el-input v-model.trim="dataObj.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model.trim="dataObj.captcha"
          placeholder="请输入验证码"
          class="captchaInput"
          @keydown.native.enter="submit('phoneForm')"
        ></el-input>
        <el-button type="danger" plain @click="sendCaptcha()" class="getcaptcha">{{
          captchaMsg
        }}</el-button>
      </el-form-item>
      <el-link type="primary" @click="toVisitor">游客访问</el-link>
      <el-link type="primary" class="captcha" @click="change_active('account')"
        >账号密码登录</el-link
      >
      <el-form-item>
        <el-button type="danger" class="submit" @click="submit('phoneForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateRules } from "../../../mixin/validateRule.js";
import { mapMutations } from "vuex";
import { sendCaptcha, loginCaptcha } from "../../../api/login/login";
export default {
  methods: {
    ...mapMutations("login", { change_active: "CHANGE_ACTIVE" }),
    async sendCaptcha() {
      if (this.captchaMsg != "获取验证码") {
        return;
      }
      this.$refs.phoneForm.validateField("phone", async (msg) => {
        if (msg != "") {
          return this.$message("error", "请输入合法内容");
        }
        const { data } = await sendCaptcha(this.dataObj.phone);
        console.log(data);
        if (data == undefined || !data.data) {
          return this.$message("error", "验证码获取失败");
        }
        let countDown = 60;
        const timer = setInterval(() => {
          if (countDown <= 0) {
            this.captchaMsg = "获取验证码";
            clearInterval(timer);
          }
          this.captchaMsg = `已发送(${countDown})`;
          countDown--;
        }, 1000);
      });
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return this.$message("error", "请输入合法内容");
        }
        // const { data } = await verifyCaptcha(this.dataObj);
        // console.log(data);
        // if (data == undefined || data.code != 200) {
        //   return this.$message.error("验证码错误");
        // }
        const data2 = await loginCaptcha(this.dataObj);
        if (data2.data.code != 200) {
          this.$message.error("验证码错误");
        }
        console.log(data2.data);
        this.$message.success("登录成功");
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("token", data2.data.token);
        window.localStorage.setItem("isLogin", true);
        // window.localStorage.setItem("profile", JSON.stringify(data2.data.profile));
        window.localStorage.setItem("cookie", data2.data.cookie);
        window.localStorage.setItem("userID", data2.data.account.id);
        //没有返回token和账户id？
        // this.$store.commit("SET_TOKEN", data.token);
        // localStorage.setItem("userID", data.account.id);
        //跳转路由
        this.$router.push("/found");
        this.dataObj = {};
      });
    },
    toVisitor() {
      this.$router.push("/found");
    },
  },
  mixins: [validateRules],
  data() {
    return {
      dataObj: {},
      captchaMsg: "获取验证码",
    };
  },
};
</script>

<style scoped>
.captchaWrapper {
  margin-top: 30px;
}
.captcha {
  float: right;
}
.captchaInput {
  width: 50%;
}
.getcaptcha {
  width: 50%;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
