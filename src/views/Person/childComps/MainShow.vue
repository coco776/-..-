<template>
  <div>
    <!-- 个人信息展示 -->
    <div class="mainShow">
      <!-- 头像 -->
      <div class="profile">
        <img v-lazy="personInfo.avatarUrl" />
      </div>
      <!-- 右侧简介 -->
      <div class="rightDetail">
        <h1>{{ personInfo.nickname }}</h1>
        <div class="firstLine">
          <div class="age">Lv{{ level }}</div>
          <i class="gender" v-if="personInfo.gender == 2"></i>
          <div class="edit">编辑个人信息</div>
        </div>
        <div class="secondLine">
          <div class="pub">
            n <br />
            <span>动态 </span>
          </div>
          <div class="concern">
            {{ personInfo.follows }} <br />
            <span> 关注</span>
          </div>
          <div class="fan">
            {{ personInfo.newFollows }} <br />
            <span>粉丝</span>
          </div>
        </div>
        <div class="address third">
          所在地区：{{ personInfo.province }} {{ personInfo.city }}
        </div>
        <div class="social third">社交网络：xx</div>
        <div class="introduce third">个人介绍：{{ personInfo.signature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainShow",
  props: ["personInfo", "level"],
  mounted() {
    console.log(this.level);
  },
};
</script>

<style scoped lang="scss">
.mainShow {
  color: #d0d0d0;
  display: flex;
  height: 250px;
  align-items: center;
  .profile {
    width: 180px;
    height: 180px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: pink;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .rightDetail {
    flex: 1;
    margin-left: 50px;
    .firstLine {
      display: flex;
      padding: 10px 0px;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 10px;
      .age {
        padding: 1px 5px;
        background-color: #f0f0f0;
        font-size: 13px;
        border-radius: 10px;
        height: 20px;
        font-size: 13px;
      }
      .edit {
        position: absolute;
        padding: 8px 13px;
        border: 1px solid #e7e7e7;
        border-radius: 20px;
        font-size: 16px;
        right: 10px;
        bottom: 10px;
      }
    }

    .secondLine {
      display: flex;
      div {
        width: 80px;
        span {
          font-size: 13px;
        }
      }
      .pub {
        width: 60px;
        border-right: 1px solid #e5e5e5;
      }
      .concern {
        text-align: center;
        border-right: 1px solid #e5e5e5;
      }
      .fan {
        text-align: center;
      }
    }

    .third {
      font-size: 13px;
      line-height: 25px;
      font-size: #373737;
    }
  }
}
</style>
