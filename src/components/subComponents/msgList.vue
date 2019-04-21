<template>
  <div class="msg-list" :class="{'max-height':!msgList[0]}">
    <transition-group tag="div" v-if="msgList[0]">
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
            @click="getLivePage(JSON.parse(item.extInfo),item.msgTime)"
            style="cursor: pointer; color: blue;"
          ></span>
          <br>
        </p>
        <p class="msg-content" v-else-if="item.msgType==='AUDIO'" @click="stop">
          <el-button
            @click="getAudio(JSON.parse(item.bodys))"
          >
            <span :id="JSON.parse(item.bodys).url"
              style="position: absolute;
                    display: block;
                    left: 0;
                    top: 0;
                    width: 148px;
                    height: 100%;
                    transition: all 0.3s ease;
                    overflow: hidden;
                    line-height: 40px;
                    z-index: 9999;
                    background-color: #409EFF;" 
            >
            <span style="width: 148px;color: #fff;display: inline-block;">语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s</span>
            </span>
            <span class="voice-des">语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s</span>
          </el-button>
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
    <alt-loading v-else></alt-loading>
    <audio src ref="voice"></audio>
    <div class="button" @click="getMore">
      <i class="el-icon-arrow-down" v-show="msgList[0]"></i>
    </div>
  </div>
</template>
<script>
import altLoading from './altLoading'
export default {
  name: "msgList",
  data() {
    return {
      nextTime: 0,
      base64Str: "",
      answerContent: {},
      msgList: [],
      progress: null
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
    async getAudio({ext,url}) {
      // 获取语音消息
      if(ext === 'amr'){
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
      }else{
        this.$refs.voice.src = url
        this.$refs.voice.addEventListener('loadeddata', () => {
          this.$refs.voice.play()
          this.progressHandler(url)
        })
      }
    },
    stop() {
      // 暂停语音播放
      if(this.$refs.voice.played){
        this.$refs.voice.pause()
        if(this.progress){
          this.progress.style.width = '148px'
        }
      }
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.init();
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.stop();
    },
    async getLivePage(liveInfo, time) {
      const res = await this.ajax("/getLivePage", { id: liveInfo.liveId });
      let info = res.content;
      // 跳转到该成员的直播列表页面
      localStorage.setItem(
        "type",
        JSON.stringify({ type: info.liveType, cover: liveInfo.liveCover, title: liveInfo.liveTitle, ctime: time })
      );
      let url = this.$router.resolve({
        name: "livepage",
        params: { id: liveInfo.liveId, type: liveInfo.liveType, title: liveInfo.liveTitle, ctime: time }
      });
      window.open(url.href, "_blank");
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
    },
    progressHandler(url){
      this.progress = document.getElementById(url)
      this.$refs.voice.addEventListener('timeupdate', () => {
        let ratio = this.$refs.voice.currentTime / this.$refs.voice.duration
        this.progress.style.width = ratio * 148 + 'px'
      })
    }
  },
  created() {
    this.getMsgList();
  },
  components: {
    altLoading
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.max-height{
  height: calc(100vh);
}
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
        .el-button{
          position: relative;
          width: 150px;
          height: 40px;
          .voice-des{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            line-height: 40px;
          }
        }
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