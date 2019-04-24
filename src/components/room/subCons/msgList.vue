<template>
  <div class="msg-list" :class="{'max-height':!msgList[0]}">
    <transition-group tag="div" v-if="msgList[0]">
      <div v-for="item in msgList" :key="item.msgTime" class="msg-item">
        <div class="msg-sender">
          <img
            :src="JSON.parse(item.extInfo).user.avatar | picPathFormat"
            :title="JSON.parse(item.extInfo).user.nickName"
            @click="getMemberDetail(JSON.parse(item.extInfo).user.nickName)"
            class="sender-avatar"
          >
        </div>
        <div class="msg-content msg-img" v-if="item.msgType==='IMAGE'" 
          @click.self="showImage(JSON.parse(item.bodys).url)"
          :style="'background-image:url('+JSON.parse(item.bodys).url+');'">
          <div class="msg-time" 
            v-html="new Date(parseInt(item.msgTime)).toLocaleTimeString()"
          ></div>
        </div>
        <div class="msg-content" v-else-if="item.msgType==='EXPRESS'">
          <span v-html="JSON.parse(item.extInfo).emotionName"></span>
        </div>
        <div class="msg-content" v-else-if="item.bodys==='偶像翻牌'">
          <span v-html="JSON.parse(item.extInfo).answer"></span>
          <br>
          <span v-html="JSON.parse(item.extInfo).question" class="fanpai"></span>
        </div>
        <div class="msg-content idol-reply" v-else-if="JSON.parse(item.extInfo).replyName">
          <span class="reply" v-html="JSON.parse(item.extInfo).text"></span>
          <span v-html="JSON.parse(item.extInfo).replyText" class="fanpai"></span>
        </div>
        <div class="msg-content msg-img" 
          :style="'background-image:url('+'http://source.48.cn'+JSON.parse(item.extInfo).liveCover+');'"
          :title="JSON.parse(item.extInfo).user.nickName+'的直播间'"
          v-else-if="JSON.parse(item.extInfo).liveCover">
          <div class="msg-time" 
            v-html="new Date(parseInt(item.msgTime)).toLocaleTimeString()"
          ></div>
          <div class="mask" @click="getLivePage(JSON.parse(item.extInfo),item.msgTime)">
            <playBtn />
          </div>
        </div>
        <div class="msg-content" v-else-if="item.msgType==='AUDIO'" @click="stop">
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
            <span style="width: 148px;color: #fff;display: inline-block;">
              语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s</span>
            </span>
            <span class="voice-des">语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s</span>
          </el-button>
        </div>
        <div class="msg-content" v-else-if="item.msgType==='VIDEO'">
          <video controls :src="JSON.parse(item.bodys).url" alt class="msg-video"></video>
        </div>
        <div
          class="msg-content"
          v-else-if="item.msgType==='TEXT'"
        >
          {{JSON.parse(item.extInfo).text}}
          <div class="msg-time" 
            v-html="new Date(parseInt(item.msgTime)).toLocaleTimeString()"
          ></div>
        </div>
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
import altLoading from '@/components/common/altLoading'
import playBtn from '@/components/common/playBtn'
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
    },
    showImage(url){
      window.open(url,'_blank')
    }
  },
  created() {
    this.getMsgList();
  },
  components: {
    altLoading,
    playBtn
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/global";
.max-height{
  height: calc(100vh);
}
.msg-list {
  div {
    .msg-item {
      max-width: 520px;
      // min-width: 400px;
      padding-bottom: 0;
      // flex: 1;
      margin-bottom: 20px;
      position: relative;
      // &:hover {
      //   background-color: #efefef;
      // }
      .msg-time {
        font-size: 12px;
        z-index: 99;
        color: #fff;
        position: absolute;
        right: 10px;
        bottom: 10px;
        // background-color: #fff;
        padding: 5px 10px;
        // border-radius: 8px;
      }
      .msg-content {
        background-color: #9bc3f2;
        padding: 30px 30px 40px 30px;
        border-radius: 10px 10px 10px 0;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-left: 40px;
        &.idol-reply{
          background-color: #fff;
        }
        .mask{
          position: absolute;
          transition: all 0.1s ease-out;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          .flex-all-center();
        }
        &:hover{
          .mask{
            background-color: rgba(0,0,0,.2);
            .play-btn{
              opacity: 1;
              transform: scale(1.05);
            }
          }
        }
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
        &.msg-img {
          padding: 0;
          width: 200px;
          height: 200px;
          background-size: cover;
          cursor: pointer;
          position: relative;
        }
        .live-push {
          cursor: pointer;
        }
        .fanpai {
          font-size: 14px;
          margin-top: 10px;
          padding-top: 10px;
          display: block;
          border-top: 1px solid #ccc;
          color: #999;
        }
      }
      .msg-sender {
        text-decoration: none;
        position: absolute;
        padding: 0;
        margin: 0;
        left: 0;
        bottom: 0;
        color: #000;
        .sender-avatar {
          width: 30px;
          border: 1px solid #ccc;
          border-radius: 50%;
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