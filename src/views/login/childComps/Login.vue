<template>
  <div class="originLogin">
      <el-form
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 公共部分1 -->
        <h1>登录</h1>
        <div class="resgisterLink">
            <span>没有账号？</span>
            <router-link to="/register" class="register">点我注册</router-link>
        </div>

        <!-- 子组件 -->
        <AccountLogin v-if="active ==`account`"/>
        <CaptchaLogin v-else-if="active == `captcha`"/>
        <QRcodeLogin v-else-if="active == `QRcode`"/>
        <ResetPassword v-else-if="active == `resetPW`"/>
        <!-- 公共部分2 -->
        <!-- 账号和忘记密码切换 -->
        <div class="bottom">
            <div>
                <el-link type="primary"  @click="change_active()">
                    {{typetext}}
                </el-link>
            </div>
            <!-- 二维码登录和账号密码切换 -->
            <el-link type="info" @click="change_QRcode()" class="bottomLogin">
                {{active=="QRcode"?'账号密码登录':'二维码登录'}}
            </el-link>
         </div>
        
      </el-form>
  </div>
</template>

<script >
    import AccountLogin from '../childComps/AccountLogin.vue'
    import CaptchaLogin from "../childComps/CaptchaLogin.vue"
    import ResetPassword from "../childComps/ResetPassword.vue"
    import QRcodeLogin from "../childComps/QRcodeLogin.vue"

    export default {
    components: { 
        AccountLogin,
        CaptchaLogin,
        ResetPassword,
        QRcodeLogin
    },
    data(){
        return{
        }
    },
    computed:{
        active(){
            return this.$store.state.login.active;
        },
        typetext(){
            if(this.active == 'resetPW'){
                return `账号登录`;
            }else{
                return `已有账号，忘记密码`;
            }
        }
    },
    methods:{
        change_active(){
            console.log("hello？");
            if(this.active == 'resetPW'){
                this.$store.commit("login/CHANGE_ACTIVE", "account")
            }else{
                this.$store.commit("login/CHANGE_ACTIVE", "resetPW")
            }
        },
        change_QRcode(){
            if(this.active == 'QRcode'){
                this.$store.commit("login/CHANGE_ACTIVE", "account")
            }else{
                this.$store.commit("login/CHANGE_ACTIVE", "QRcode")
            }
        }
    }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    h1{
        color: white;
    }
    a{
        text-decoration: none;
        color: #409EFF;
    }
    .originLogin{
        padding: 30px;
        position: relative;
    }
    /* 公共部分1 */
    .resgisterLink{
        position: absolute;
        right: 30px;
        top: 40px;
    }
    .register:hover{
        text-decoration: underline;
    }
    .register:active{
        color: #409EFF;
    }
    .bottom{
        margin-top: 10px;
        text-align: center;
        line-height: 15px;
    }
    .bottomLogin{
        margin-top: 10px;
    }
</style>