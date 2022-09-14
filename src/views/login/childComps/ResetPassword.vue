<template>
  <div class="resetPassword">
   <el-form :model="dataObj" ref="accountForm" status-icon :rules="mainRules">
      <el-form-item prop="password">
          <el-input
            type="text"
            v-model="account"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            type="password"
            v-model="pass"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            type="password"
            v-model="pass"
            autocomplete="off"
            placeholder="请输入验证码"
            class="captchaInput"
          ></el-input>
           <el-button   type="danger" plain  class='getcaptcha' @click="sendCaptcha()">{{captchaMsg}}</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" class="submit" @click="submit('accountForm')">密码重置</el-button>
        </el-form-item>
    </el-form>   
  </div>
  
</template>

<script>
import { validateRules } from "../../../mixin/validateRule.js";
import { sendCaptcha} from "../../../api/login/login";
    export default {
        name:"ResetPassword",
        data(){
          return{
            captchaMsg:'获取验证码'
          }
        },
      mixins:[validateRules],
      methods: {
        async sendCaptcha() {
        this.$refs.phoneForm.validateField('phone',async (msg) => {
          if (msg != '') {
            return this.$message("error", "请输入合法内容");
          }
            const { data } = await sendCaptcha(this.dataObj.phone);
            console.log(data);
            if (data == undefined || !data.data) {
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
        async submit(formName){
          this.$refs[formName].validate(valid => {
            if(!valid){
              this.$message("error", "请输入合法内容");
            }
            //接口用哪个呀?  没有昵称？
          })
            
        }
      }
        
    }
    
</script>

<style scoped>
    .captchaInput{
        width: 50%;
    }
    .getcaptcha{
        width: 50%;
    }
    .resetPassword{
      margin-top: 30px;
    }
    .submit{
      width: 100%;
    }
</style>