<template>
  <div class="msg-list">
    <transition-group tag="div">
      <div v-for="item in msgList" :key="item.msgTime" class="msg-item my-card">
        <p class="msg-time" v-html="new Date(parseInt(item.msgTime)).toLocaleString()"></p>
        <p class="msg-sender">
          <img
            :src="JSON.parse(item.extInfo).user.avatar | picPathFormat"
            alt
            class="sender-avatar"
          >
          <span
            v-html="JSON.parse(item.extInfo).user.nickName"
            @click="getMemberDetail(JSON.parse(item.extInfo).user.nickName)"
            class="sender-name"
          ></span>
        </p>
        <p class="msg-content" v-if="item.msgType==='IMAGE'">
          <img :src="JSON.parse(item.bodys).url" alt class="msg-img">
        </p>
        <p class="msg-content" v-else-if="item.msgType==='EXPRESS'">
          <span v-html="JSON.parse(item.extInfo).emotionName"></span>
        </p>
        <p class="msg-content" v-else-if="item.bodys==='偶像翻牌'">
          <span v-html="JSON.parse(item.extInfo).answer"></span>
          <br>
          <span v-html="JSON.parse(item.extInfo).question" class="fanpai"></span>
        </p>
        <p class="msg-content" v-else-if="JSON.parse(item.extInfo).replyName">
          <span v-html="JSON.parse(item.extInfo).text"></span>
          <br>
          <span v-html="JSON.parse(item.extInfo).replyText" class="fanpai"></span>
        </p>
        <p class="msg-content" v-else-if="JSON.parse(item.extInfo).liveCover">
          <span
            v-html="'直播：'+JSON.parse(item.extInfo).liveTitle"
            @click="getLivePage(JSON.parse(item.extInfo).liveId)"
            style="cursor: pointer; color: blue;"
          ></span>
          <br>
        </p>
        <p class="msg-content" v-else-if="item.msgType==='AUDIO'" @click="stop">
          <el-button
            @click="getAudio(JSON.parse(item.bodys).url)"
          >语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s</el-button>
        </p>
        <p class="msg-content" v-else-if="item.msgType==='VIDEO'">
          <video controls :src="JSON.parse(item.bodys).url" alt class="msg-video"></video>
        </p>
        <p
          class="msg-content"
          v-else-if="item.msgType==='TEXT'"
          v-html="JSON.parse(item.extInfo).text"
        ></p>
      </div>
    </transition-group>
    <div class="button" @click="getMore">
      <i class="el-icon-arrow-down" v-show="msgList[0]"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "msgList",
  data() {
    return {
      nextTime: 0,
      base64Str: "",
      answerContent: {},
      msgList: []
    };
  },
  props: ["ownerId", "roomId"],
  methods: {
    async getMsgList() {
      // 获取成员房间所有消息
      const res = await this.ajax(
        "/getRoomBoard",
        {
          token: this.$store.getters.getToken,
          ownerId: this.ownerId,
          roomId: this.roomId
        },
        "POST"
      );
      this.msgList = res.content.message;
      this.nextTime = res.content.nextTime;
    },
    async getMore() {
      // 获取更多消息
      const res = await this.ajax(
        "getRoomBoard",
        {
          token: this.$store.getters.getToken,
          ownerId: this.ownerId,
          roomId: this.roomId,
          nextTime: this.nextTime
        },
        "POST"
      );
      this.msgList = this.msgList.concat(res.content.message);
      this.nextTime = res.content.nextTime;
      this.$store.commit("saveScrollTop");
    },
    async getAnswer(questionId, answerId, title) {
      // 获取翻牌消息，以弹出框形式呈现
      const h = this.$createElement;
      const res = await this.ajax(
        "/getAnswer",
        {
          questionId,
          answerId,
          token: this.$store.getters.getToken
        },
        "POST"
      );
      this.answerContent = res.content;
      this.$msgbox({
        title,
        message: h("div", null, [
          h("p", null, this.answerContent.answer),
          h("p", { style: "color: #ccc" }, this.answerContent.question)
        ]),
        confirmButtonText: "确定"
      });
    },
    async getAudio(url) {
      // 获取语音消息
      const res = await this.ajax("getAudio", { url }, "POST");
      if (res.status === 200) {
        // eslint-disable-next-line
        RongIMLib.RongIMVoice.init();
        this.base64Str = res.message;
        // eslint-disable-next-line
        RongIMLib.RongIMVoice.stop();
        // eslint-disable-next-line
        RongIMLib.RongIMVoice.play(this.base64Str);
      }
    },
    stop() {
      // 暂停语音播放
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.init();
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.stop();
    },
    getLivePage(id) {
      // 跳转到该成员的直播列表页面
      this.$router.push({ name: "livepage", params: { id, type: 1 } });
    },
    getMemberDetail(memberName) {
      // 跳转到成员列表页面
      let n = [];
      if (memberName.includes("-")) {
        n = memberName.split("-");
      } else {
        n = [memberName];
      }
      this.$router.push({
        name: "memberlist",
        params: { group: "1", memberName: n[n.length - 1] }
      });
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.msg-list {
  div {
    .msg-item {
      max-width: 520px;
      min-width: 400px;
      flex: 1;
      &:hover {
        background-color: #efefef;
      }
      .msg-time {
        font-size: 12px;
      }
      .msg-content {
        .msg-flip {
          cursor: pointer;
        }
        .msg-img {
          width: 100%;
        }
        .live-push {
          cursor: pointer;
        }
        .fanpai {
          font-size: 14px;
          color: #999;
        }
      }
      .msg-sender {
        .flex-align-center();
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        text-decoration: none;
        color: #000;
        line-height: 1.5;
        .sender-avatar {
          width: 20px;
        }
        .sender-name {
          line-height: 20px;
          font-size: 15px;
          display: inline-block;
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .button {
    .flex-all-center();
    .button-container();
  }
}
</style>