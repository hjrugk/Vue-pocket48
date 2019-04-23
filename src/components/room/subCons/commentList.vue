<template>
  <div class="board-list" ref="board">
    <!-- <div class="board-item my-card" v-if="topData.senderName">
      <div class="sender-info">
        <img :src="topData.senderAvatar | picPathFormat" alt class="sender-img">
        <p class="board-name" 
          @click="getUserInfo(topData)"
          style="display: flex;justify-content:space-between;width:100%;"
        >
          <span>{{topData.senderName}}</span>
          <el-tag size="mini" type="danger" color="#eee">本周TOP1</el-tag>
        </p>
      </div>
      <p class="board-content" v-html="topData.text || topData.content + ' ' + topData.giftName"></p>
    </div>-->
    <transition-group tag="div">
      <div
        class="board-item my-card"
        :class="{isSpec:JSON.parse(item.extInfo).user.userId===655632}"
        v-for="item in commentList"
        :key="item.msgTime"
      >
        <div class="sender-info">
          <img :src="JSON.parse(item.extInfo).user.avatar | picPathFormat" alt class="sender-img">
          <p
            class="board-name"
            v-html="JSON.parse(item.extInfo).user.nickName"
            @click="getUserInfo(JSON.parse(item.extInfo))"
          ></p>
        </div>
        <p class="board-content" v-html="JSON.parse(item.extInfo).text"></p>
      </div>
    </transition-group>
    <div v-if="showInfo" @click="showInfo = !showInfo">
      <popup-info :info="userInfo"></popup-info>
    </div>
    <div class="button" @click="getMore">
      <i class="el-icon-arrow-down" v-show="commentList[0]"></i>
    </div>
  </div>
</template>
<script>
import popupInfo from "@/components/common/popupInfo";
export default {
  name: "commentList",
  data() {
    return {
      nextTime: 0,
      commentList: [],
      showInfo: false,
      userInfo: 0,
      topData: {}
    };
  },
  props: ["roomId"],
  methods: {
    async getComments() {
      // 获取成员房间留言列表
      const res = await this.ajax(
        "/getComments",
        { id: this.roomId, token: this.$store.getters.getToken },
        "POST"
      );
      // if(res.content.top1Data){
      //   this.topData = JSON.parse(res.content.top1Data.extInfo)
      // }
      this.commentList = res.content.message;
      this.nextTime = res.content.nextTime;
    },
    async getMore() {
      const res = await this.ajax(
        "/getComments",
        {
          id: this.id,
          token: this.$store.getters.getToken,
          nextTime: this.nextTime
        },
        "POST"
      );
      this.commentList = this.commentList.concat(res.content.message);
    },
    getUserInfo(info) {
      // 获取聚聚信息
      this.userInfo = info;
      this.showInfo = true;
    }
  },
  created() {
    this.getComments();
  },
  components: {
    popupInfo
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/global";
.board-list {
  .user-info {
    width: calc(100vw);
    height: calc(100vh);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .popup-info {
      width: 240px;
      height: 200px;
      background-color: #fff;
      border-radius: 5px;
      text-align: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  }
  .board-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #777;
    background-color: #666;
    max-width: 360px;
    min-width: 300px;
    &:hover {
      background-color: #555;
    }
    &.isSpec {
      background-color: #999;
      border: 1px solid #999;
    }
    .sender-info {
      .flex-align-center();
      justify-content: flex-start;
      border-bottom: 1px solid #ccc;
      .sender-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .board-name {
        color: #eee;
        cursor: pointer;
      }
    }
    .board-content {
      color: #fff;
    }
  }
  .button {
    .button-container();
    .flex-all-center();
  }
}
</style>

