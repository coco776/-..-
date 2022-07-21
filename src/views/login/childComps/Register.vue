<template>
  <div class="registerWrapper">
    <!-- top部分 -->
    <h1>注册</h1>
    <div class="loginLink">
      <span>已有账号？</span>
      <router-link to="/login" class="login">点我登录</router-link>
    </div>

    <el-form :model="dataObj" ref="registerForm" status-icon :rules="mainRules">
      <el-form-item prop="name">
        <el-input
          v-model.trim="dataObj.name"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model.trim="dataObj.phone"
          placeholder="请输入手机号码"
          @keydown.native.enter="submitForm('registerForm')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.trim="dataObj.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model.trim="dataObj.captcha"
          placeholder="请输入验证码"
          class="captchaInput"
          @keydown.native.enter="submitForm('registerForm')"
        ></el-input>
        <el-button type="danger" plain @click="sendCaptcha" class="getcaptcha"
          >{{captchaMsg}}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          class="submit"
          @click="submitForm('registerForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
import { validateRules } from "../../../mixin/validateRule.js";
import {register, isRegister} from '../../../api/login/register.js'
import {sendCaptcha, verifyCaptcha} from '../../../api/login/login.js'

export default {
  name: "Login",
  data(){
    return {
      dataObj: {
        name:"",
        phone: "",
        password: "",
        captcha:""
      },
      captchaMsg:"获取验证码"
    };
  },
  mixins: [validateRules],
  methods: {
    // 获取验证码
    async sendCaptcha() {
      this.$refs.registerForm.validateField('phone',async (msg) => {
        if (msg != '') {
          return this.$message("error", "请输入合法内容");
        }
        // 验证手机号码是否已经注册
          const verifyData = await isRegister(this.dataObj.phone);
          if(verifyData.data.exist == 1){
            return this.$message('error','手机号已经注册,请登录');
          }
        //获取手机号验证码
          const { data } = await sendCaptcha(this.dataObj.phone);
          if (!data.code) {
            return this.$message("error", "验证码获取失败");
          }
          let countDown = 60;
          const timer = setInterval(()=>{
            if(countDown <= 0){
              this.captchaMsg = '获取验证码';
              clearInterval(timer);
            }
            this.captchaMsg = `已发送(${countDown})`;
            countDown--;
          },1000)

      
      })
    },
    submitForm(formName) {
      console.log(this.dataObj);
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return this.$message("error", "请输入合法内容");
        }
        // 验证验证码是否正确
        const data1 = await verifyCaptcha(this.dataObj);
        if(data1 == undefined || data1.code !=200 ){
          return this.$message('error', "验证码有误");
        }
        
        //注册
        const data2 = await register(this.dataObj);
        console.log(data2);
        if(data2?.code !=200 ){
          return this.$message('error', '注册失败');
        }
        //注册成功
        this.$message('success', "注册成功");
        //设置
        //跳转页面
        this.$router.push('/found');
      });
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin-top: 0;
  color: white;
}
.registerWrapper {
  padding: 30px;
  position: relative;
}
.loginLink {
  position: absolute;
  right: 30px;
  top: 40px;
}
.login:hover {
  text-decoration: underline;
  color: #409eff;
}
.login:link {
  color: #409eff;
}
.captchaInput {
  width: 50%;
}
.getcaptcha {
  width: 50%;
}
.submit{
    width: 100%;
  }
</style>
