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
        @keyup.enter="handleComment"
      ></textarea>
      <div class="cnt" :style="{ color: cnt < 0 ? 'red' : '' }">{{ cnt }}</div>
      <div class="inputBottom">
        <i></i>
        <i></i>
        <i></i>
        <el-button class="commentSubmit" round @click="handleComment">评论</el-button>
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
            <div class="replyPart" v-if="item.beReplied.length != 0">
              <span>@{{ item.beReplied[0].user.nickname }}</span>
              <span>{{ item.beReplied[0].content }}</span>
            </div>
            <div class="secondLine">
              <div class="time">{{ item.timeStr }}</div>
              <div class="operators">
                <!-- liked?点赞状态？ -->
                <i
                  :class="['iconfont', 'icon-dianzan', item.liked ? 'red' : '']"
                  @click="handleLike(item.liked, item.commentId, 'hot')"
                ></i>
                <span class="likeNum">{{
                  item.likedCount > 0 ? item.likedCount : ""
                }}</span>
                <i class="iconfont icon-fenxiang1"></i>
                <i class="iconfont icon-xiaoxi" @click="reply(item.user.nickname)"></i>
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
          <div class="replyPart" v-if="item.beReplied.length != 0">
            <span style="color: #507daf">@{{ item.beReplied[0].user.nickname }}:</span>
            <span>{{ item.beReplied[0].content }}</span>
          </div>
          <div class="secondLine">
            <div class="time">{{ item.timeStr }}</div>
            <div class="operators">
              <i
                :class="['iconfont', 'icon-dianzan', item.liked ? 'red' : '']"
                @click="handleLike(item.liked, item.commentId, 'new')"
              ></i>
              <span class="likeNum">{{
                item.likedCount > 0 ? item.likedCount : ""
              }}</span>
              <i class="iconfont icon-fenxiang1"></i>
              <i
                class="iconfont icon-xiaoxi"
                @click="reply(item.user.nickname, item.commentId)"
              ></i>
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
      v-if="commentList.length != 0"
      :current-page="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getComments } from "../../api/Detail/album";
import { getHotComment } from "../../api/Detail/album";
import { postComment, likeComment } from "../../api/Person/index";

export default {
  data() {
    return {
      cnt: 140,
      commentList: [],
      commentList1: [],
      isShow: false,
      textValue: "",
      currentPage: 0,
      newComment: {
        t: 1,
        type: 2,
        id: "",
        content: "",
        commentId: "",
      },
      userName: "",
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
      console.log(offset);
      if (!this.$route.params.id) return;
      const { data } = await getComments(this.$route.params.id, offset);
      console.log(data);
      if (data.code != 200) {
        this.$message("error", "获取用户评论错误");
      }
      this.commentList = data.comments;
    },
    // 获取最热评论
    async getHotComment(offset = 0, type = 2) {
      if (!this.$route.params.id) return;
      const { data } = await getHotComment(this.$route.params.id, offset, type);
      console.log(offset, type);
      console.log(data);
      if (data.code != 200) {
        return this.$message("error", "获取用户评论错误");
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
      console.log("我被调用了");
      let offset = (p - 1) * 20;
      this.getComments(offset);
      this.getHotComment((p - 1) * 3);
    },
    // 处理评论提交功能
    handleComment() {
      if (this.cnt < 0) {
        return this.$message.error("字数超过限制");
      }
      if (this.cnt == 140) {
        return this.$message.error("写点东西吧");
      }
      if (localStorage.getItem("isLogin") == false) {
        console.log(localStorage.getItem("isLogin"));
        return this.$message.error("请先登录");
      }
      this.newComment.content = this.textValue;
      if (this.newComment.commentId) {
        this.newComment.content = this.textValue.replace(
          "回复" + this.userName + ":",
          ""
        );
      }
      this.postComment();
    },
    reply(userName, commentId) {
      console.log("reply");
      console.log(commentId);
      this.textValue = "回复" + userName + ":";
      this.userName = userName;
      this.newComment.commentId = commentId;
      this.newComment.t = 2;
    },
    // 发送评论
    async postComment() {
      console.log(this.newComment);
      const { data } = await postComment(this.newComment);
      console.log(data);
      if (data.code != 200) {
        return this.$message.error("评论有误");
      }
      if (this.currentPage == 0) {
        window.setTimeout(() => {
          // 需要重新更新当前评论数据
          this.getComments(0);
        }, 5000);
      }
      this.$message.success("评论成功");
      this.textValue = "";
      this.newComment.t = 1;
      this.newComment.commentId = "";
    },
    //处理评论

    async handleLike(liked, cid, type) {
      const id = this.$route.params.id;
      let t = 1;
      if (liked) {
        t = 0;
      }
      const { data } = await likeComment(id, cid, t, this.$route.meta.type);
      console.log(data);
      if (data.code != 200) {
        this.$message.error("点赞失败");
      }
      if (!liked) {
        this.$message.success("成功点赞");
      } else {
        this.$message.success("已取消点赞");
      }
      if (type == "new") {
        this.rehandle(this.commentList, liked, cid);
      } else {
        this.rehandle(this.commentList1, liked, cid);
      }
    },

    // 复用函数
    async rehandle(commentList, liked, cid) {
      const index = commentList.findIndex((ele) => ele.commentId == cid);
      commentList[index].liked = !commentList[index].liked;
      if (liked) {
        commentList[index].likedCount--;
      } else {
        commentList[index].likedCount++;
      }
    },
  },
  mounted() {
    this.getComments();
    this.getHotComment();
    this.newComment.id = this.$route.params.id;
    this.newComment.type = this.$route.meta.type;
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
      .replyPart {
        width: 100%;
        padding: 7px;
        margin-top: 10px;
        background-color: #f4f4f4;
        border-radius: 5px;
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
          .icon-dianzan {
            padding-right: 0px;
            border-right: none;
          }
          .red {
            color: red;
          }
          .likeNum {
            font-size: 13px;
            padding-right: 6px;
            border-right: 1px solid #f2f2f2;
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
