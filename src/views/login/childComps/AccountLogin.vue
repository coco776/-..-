<template>
  <div class="accountLogin">
    <el-form :model="dataObj" ref="accountForm" status-icon :rules="mainRules">
      <el-form-item prop="account">
        <el-input v-model.trim="dataObj.account" placeholder="手机 / 邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.trim="dataObj.password"
          show-password
          placeholder="请输入密码"
          @keydown.native.enter="submitForm('accountForm')"
        ></el-input>
      </el-form-item>
      <el-link type="primary" @click="toVisitor">游客访问</el-link>
      <el-link type="primary" class="captcha" @click="change_active('captcha')"
        >验证码登录</el-link
      >
      <el-form-item>
        <el-button type="danger" class="submit" @click="submitForm('accountForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginAccount } from "../../../api/login/login";
import { mapMutations } from "vuex";
import { validateRules } from "../../../mixin/validateRule.js";
export default {
  name: "Login",
  data() {
    return {
      dataObj: {
        account: "",
        password: "",
      },
    };
  },
  mixins: [validateRules],
  methods: {
    ...mapMutations("login", { change_active: "CHANGE_ACTIVE" }),
    submitForm(formName) {
      console.log(this.dataObj);
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return this.$message.error("请输入合法内容");
        }
        const { data } = await loginAccount(this.dataObj);
        console.log(data);
        if (data.code !== 200) {
          return this.$message.error("密码错误");
        }
        this.$message.success("登录成功");
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("isLogin", true);
        // window.localStorage.setItem("profile", JSON.stringify(data.profile));
        window.localStorage.setItem("cookie", data.cookie);
        window.localStorage.setItem("userID", data.account.id);
        //跳转路由
        this.$router.push("/found");
        this.dataObj = {};
      });
    },
    toVisitor() {
      this.$router.push("/found");
    },
  },
};
</script>

<style scoped>
.el-form {
  margin-top: 10px;
}
.el-input {
  margin-top: 20px;
}
.submit {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
}
.captcha {
  float: right;
}
.el-link {
  margin-top: 30px;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
