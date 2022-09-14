<template>
  <div class="headerwrapper">
    <!-- logo -->
    <h2>网易云音乐</h2>

    <!-- 前后跳转 -->
    <div class="back history">
      <i class="iconfont icon-zuosanjiao" @click="routeBack"></i>
    </div>

    <div class="go history">
      <i class="iconfont icon-jiantou" @click="routeForward"></i>
    </div>

    <!-- 搜素部分 -->
    <div class="search">
      <el-input v-model="inputValue" placeholder="请输入内容" size="small"></el-input>
      <div class="micro">
        <i></i>
      </div>
    </div>

    <!--个人信息 -->
    <div class="person">
      <div class="img">
        <img src="../../assets/img/un_user.png" alt="" v-if="isLogin == 'false'" />
        <img v-else v-lazy="userInfo.avatarUrl" />
      </div>
      <span v-if="isLogin == 'false'" class="loginReminder" @click="login">未登录</span>
      <el-dropdown
        v-if="isLogin == 'true' || !isLogin"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link loginReminder">
          {{ userInfo.nickname }}
          <el-dropdown-menu x-placement="top" class="dropdown" v-if="isLogin == 'true'">
            <div class="top">
              <div class="top_item">
                <span>25</span>
                <div>动态</div>
              </div>
              <div class="top_item">
                <span>{{ userInfo.follows }}</span>
                <div>关注</div>
              </div>
              <div class="top_item">
                <span>{{ userInfo.followeds }}</span>
                <div>粉丝</div>
              </div>
            </div>

            <div class="signIn">
              <i></i>
              <span>签到</span>
            </div>
            <el-dropdown-item>
              <i class="iconfont icon-gerenxinxi"></i>
              <span>会员中心</span>
              <i class="iconfont icon-yousanjiao1"></i>
              <span class="vip" v-if="!userInfo.vipType">未订购</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont icon-dengji"></i>
              等级
              <i class="iconfont icon-yousanjiao1"></i>
            </el-dropdown-item>
            <el-dropdown-item class="underline">
              <i class="iconfont icon-shouye"></i>
              商城
              <i class="iconfont icon-yousanjiao1"></i>
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="iconfont icon-gerenxinxi"></i>
              个人信息设置
              <i class="iconfont icon-yousanjiao1"></i>
            </el-dropdown-item>
            <el-dropdown-item class="underline">
              <i class="iconfont icon-bangdingguanli"></i>
              绑定社交账号</el-dropdown-item
            >
            <el-dropdown-item class="underline">
              <i class="iconfont icon-kefu"></i>
              我的客服</el-dropdown-item
            >
            <el-dropdown-item command="logout">
              <span @click="logout">
                <i class="iconfont icon-tuichu"></i>
                退出登录
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </span>
      </el-dropdown>

      <!-- 下拉表单 -->

      <!-- 皮肤等设置 -->
      <div class="skin">
        <i class="iconfont icon-pifu"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from "../../api/Person/index";
export default {
  data() {
    return {
      inputValue: "",
      userInfo: "",
      isLogin: localStorage.getItem("isLogin"),
    };
  },
  methods: {
    async getUserInfo() {
      const id = localStorage.getItem("userID") ? localStorage.getItem("userID") : "";
      if (id) {
        const { data } = await getUserDetail(id);
        if (data.code != 200) {
          return this.$message.error("获取用户信息错误");
        }
        console.log(data);
        this.userInfo = data.profile;
      }
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.setItem("isLogin", false);
      window.localStorage.removeItem("cookie");
      window.localStorage.removeItem("profile");
      window.localStorage.removeItem("userID");
      window.localStorage.removeItem("userInfo");
      this.isLogin = false;
    },
    handleCommand(command) {
      if (command == "logout") {
        this.logout();
      }
    },
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    routeBack() {
      this.$router.back();
    },
    routeForward() {
      this.$router.forward();
    },
  },

  mounted() {
    if (this.isLogin) {
      this.getUserInfo();
    }
    console.log(typeof this.isLogin);
    console.log(this.isLogin);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.headerwrapper {
  /* height: 100px; */
  width: 100%;
  color: var(--theme-font-color);
  /* background-color: #ec4141; */
  background-color: var(--theme--bg-color);
  display: flex;
  align-items: center;
  padding: 15px;
}
h2 {
  width: 15%;
  color: white;
}

.history,
.micro {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #d93b3b;
  margin-left: 10px;
  text-align: center;
}
.history i {
  font-size: 13px;
  color: white;
  cursor: pointer;
}
/* 搜索部分 */
.search {
  margin-left: 20px;
  border-radius: 80px;
  display: flex;
  align-items: center;
  flex-basis: 15%;
}
/deep/.el-input__inner {
  border-radius: 28px;
  background-color: #e13e3e;
  border: none;
  color: #f09c9c;
}

/deep/.el-input__inner::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ed8b8b;
}

/* 个人信息 */
.person {
  margin-left: 50px;
  /* 自适应宽度 */
  flex: 1;
  position: relative;
}
.img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 500px;
}
.img img {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
.el-dropdown {
  display: block;
}
.el-dropdown-menu {
  position: absolute;
  right: 430px;
}
.loginReminder {
  cursor: pointer;
  position: absolute;
  right: 430px;
  top: 50%;
  transform: translateY(-50%);
  color: #fed9c2;
  font-size: 12px;
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.loginReminder:hover {
  color: white;
}
/* 皮肤设置 */
.skin i {
  color: white;
  font-size: 20px;
  color: #f8bcbc;
}
/* 开启定位移动 */
.skin {
  position: absolute;
  right: 250px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}

.dropdown {
  position: absolute;
  left: auto !important;
  right: 330px !important;
  top: 50px !important;
  width: 200px;
  .top {
    display: flex;
    height: 40px;
    padding: 20px;
    .top_item {
      flex-basis: 33%;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      cursor: pointer;
      span {
        font-weight: bold;
      }
      div {
        color: #676767;
        font-size: 13px;
      }
    }
  }
  .signIn {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
    span {
      display: inline-block;
      height: 25px;
      line-height: 25px;
      padding: 2px 15px;
      border: 1px solid #d8d8d8;
      border-radius: 10px;
      color: #676767;
    }
  }
  .underline {
    border-bottom: 1px solid #f0f1f2;
  }
  .el-dropdown-menu__item {
    padding-left: 20px;
    .vip {
      float: right;
      font-size: 13px;
      color: #c3c3c4;
    }
    .icon-yousanjiao1 {
      float: right;
    }
  }
  .el-dropdown-menu__item:hover {
    background-color: #f0f1f2;
    color: #676767;
  }
}
</style>
