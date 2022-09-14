<template>
  <div class="wrapper">
    <!--input输入框 -->
    <div class="inputWrapper">
      <textarea
        name=""
        id="textInput"
        cols="30"
        rows="10"
        v-model="textValue"
      ></textarea>
      <div class="cnt" :style="{ color: cnt < 0 ? 'red' : '' }">{{ cnt }}</div>
      <div class="inputBottom">
        <i></i>
        <i></i>
        <i></i>
        <el-button class="commentSubmit" round @click="handleComment"
          >评论</el-button
        >
      </div>
    </div>
    <!-- 精彩评价 -->
    <div class="comment1" v-if="isShow">
      <h3>精彩评价</h3>
      <ul class="wonderful">
        <!-- 评论 -->
        <li v-for="item in commentList1" :key="item.commentId">
          <div class="portrait">
            <img v-lazy="item.user.avatarUrl" alt="" />
          </div>
          <div class="commentRight">
            <div class="firstLine">
              <span class="nickname"> {{ item.user.nickname }}: </span>
              <span class="content">
                {{ item.content }}
              </span>
            </div>
            <div class="secondLine">
              <div class="time">{{ item.timeStr }}</div>
              <div class="operators">
                <!-- liked?点赞状态？ -->
                <i class="iconfont icon-dianzan">{{ item.likedCount }}</i>
                <i class="iconfont icon-fenxiang1"></i>
                <i class="iconfont icon-xiaoxi"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 最新评价 -->
    <h3>最新评价</h3>
    <ul>
      <li v-for="item in commentList" :key="item.commentId">
        <div class="portrait">
          <img v-lazy="item.user.avatarUrl" alt="" />
        </div>
        <div class="commentRight">
          <div class="firstLine">
            <span class="nickname"> {{ item.user.nickname }}: </span>
            <span class="content">
              {{ item.content }}
            </span>
          </div>
          <div class="secondLine">
            <div class="time">{{ item.timeStr }}</div>
            <div class="operators">
              <i class="iconfont icon-dianzan">{{
                item.likedCount > 0 ? item.likedCount : ""
              }}</i>
              <i class="iconfont icon-fenxiang1"></i>
              <i class="iconfont icon-xiaoxi"></i>
            </div>
          </div>
        </div>
      </li>
    </ul>

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
import { getComments } from "../../../api/Detail/album";
import { getHotComment } from "../../../api/Detail/album";
export default {
  data() {
    return {
      cnt: 140,
      commentList: [],
      commentList1: [],
      isShow: false,
      textValue: "",
    };
  },
  watch: {
    textValue(m) {
      this.cnt = 140 - m.length;
    },
  },
  methods: {
    // 获取最新评论
    async getComments(offset = 0) {
      const { data } = await getComments(this.$route.params.id, offset);
      console.log(data);
      if (data.code != 200) {
        this.$message("error", "获取用户评论错误");
      }
      this.commentList = data.comments;
    },
    // 获取最热评论
    async getHotComment(offset = 0, type = 2) {
      const { data } = await getHotComment(this.$route.params.id, offset, type);
      console.log(data);
      if (data.code != 200) {
        this.$message("error", "获取用户评论错误");
      }
      if (data.hotComments.length > 0) {
        this.commentList1 = data.hotComments;
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //处理换页
    handleCurrentChange(p) {
      let offset = (p - 1) * 20;
      this.getComments(offset);
      this.getHotComment((p - 1) * 3);
    },
    // 处理评论提交功能
    handleComment() {
      if (this.cnt < 130) {
        return this.$message("error", "字数超过限制");
      }
      if (this.cnt == 140) {
        return this.$message("写点东西吧");
      } 
    },
  },
  mounted() {
    this.getComments();
    this.getHotComment();
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  width: 100%;
  .inputWrapper {
    position: relative;
    #textInput {
      height: 80px;
      width: 100%;
      border-color: #e5e5e5;
      resize: none;
      font-size: 17px;
      background: var(--theme--bg-color3) !important;
    }
    textarea:focus {
      outline: none;
    }
    .cnt {
      position: absolute;
      right: 5px;
      bottom: 40px;
      color: #e5e5e5;
    }
    .inputBottom {
      height: 30px;
      margin-bottom: 30px;
      .commentSubmit {
        float: right;
        margin-top: 5px;
        padding: 8px 15px;
        text-align: center;
      }
    }
  }

  li {
    border-bottom: 1px solid #f2f2f2;
    width: 100%;
    display: flex;
    padding: 20px;
    .portrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .commentRight {
      margin-left: 30px;
      width: 100%;
      .nickname {
        color: #507daf;
        font-size: 13px;
      }
      .content {
        font-size: 13px;
      }
      .secondLine {
        margin-top: 10px;
        display: flex;
        position: relative;
        width: 100%;
        .operators {
          position: absolute;
          right: 10px;
          i {
            padding: 0 10px;
            color: #666666;
            border-right: 1px solid #f2f2f2;
            cursor: pointer;
            font-size: 14px;
          }
          i:hover {
            color: black;
          }
        }
      }
      .time {
        font-size: 15px;
        color: #9f9f9f;
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
