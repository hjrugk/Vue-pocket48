<template>
  <div class="msg-list">
    <transition-group tag="div">
      <div v-for="item in msgList" :key="item.msgTime" class="msg-item my-card">
        <p class="msg-time" v-html="item.msgTimeStr"></p>
        <p class="msg-sender flex-align-center">
          <img :src="item.extInfo.senderAvatar | picPathFormat" alt class="sender-avatar">
          <span v-html="item.extInfo.senderName" @click="getMemberDetail(item.extInfo.senderName)" class="sender-name"></span>
        </p>
        <p v-show="item.extInfo.faipaiContent" v-html="item.extInfo.faipaiContent" class="fanpai"></p>
        <p class="msg-content" v-if="item.bodys.includes('jpg'||'png'||'gif'||'bmp')">
          <img :src="JSON.parse(item.bodys).url" alt class="msg-img">
        </p>
        <p class="msg-content" v-else-if="item.bodys.includes('amr')" @click="stop">
          <el-button @click="getAudio(JSON.parse(item.bodys).url)">
            语音消息 {{ JSON.parse(item.bodys).dur/1000 }}s
          </el-button>
        </p>
        <p class="msg-content" v-else-if="item.bodys.includes('mp4')">
          <video controls :src="JSON.parse(item.bodys).url" alt class="msg-video"></video>
        </p>
        <p class="msg-content" v-else-if="item.extInfo.referenceTitle">
          <span class="live-push" v-html="item.extInfo.referenceTitle"
            @click="getLivePage(item.extInfo.referenceObjectId)"
          ></span>
        </p>
        <p class="msg-content" v-else-if="item.extInfo.idolFlipTitle">
          <span
            v-html="item.extInfo.idolFlipTitle"
            class="msg-flip"
            @click="getAnswer(item.extInfo.idolFlipQuestionId,item.extInfo.idolFlipAnswerId,item.extInfo.idolFlipTitle)"
          ></span>
        </p>
        <p
          class="msg-content"
          v-else
          v-html="item.extInfo.text || item.extInfo.messageText"
        ></p>
      </div>
    </transition-group>
    <div class="button-container flex-all-center" @click="getMore">
      <i class="el-icon-arrow-down" v-show="msgList[0]"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msgList',
  data() {
    return {
      limit: 10,
      base64Str: '',
      answerContent: {},
      msgList: []
    }
  },
  props: ['id'],
  methods: {
    getMsgList() { // 获取成员房间所有消息
      this.axios
        .post("/api/getRoomBoard", {
          token: this.$store.getters.getToken,
          id: this.id
        })
        .then(res => {
          this.msgList = res.data.content.data;
        });
    },
    getMore() { // 获取更多消息
      this.limit += 10;
      this.axios
        .post("/api/getRoomBoard", {
          token: this.$store.getters.getToken,
          id: this.id,
          limit: this.limit
        })
        .then(res => {
          this.msgList = res.data.content.data;
        });
      this.$store.commit('saveScrollTop')
    },
    getAnswer(questionId, answerId, title) { // 获取翻牌消息，以弹出框形式呈现
      const h = this.$createElement;
      this.axios
        .post("/api/getAnswer", {
          questionId,
          answerId,
          token: this.$store.getters.getToken
        })
        .then(res => {
          this.answerContent = res.data.content;
          this.$msgbox({
            title,
            message: h("div", null, [
              h("p", null, this.answerContent.answer),
              h("p", { style: "color: #ccc" }, this.answerContent.question)
            ]),
            confirmButtonText: "确定"
          });
        });
    },
    getAudio(url){ // 获取语音消息
      this.axios.post('/api/getAudio',{url})
        .then(res => {
          if(res.data.status === 200){
            // eslint-disable-next-line
            RongIMLib.RongIMVoice.init()
            this.base64Str = res.data.message
            // eslint-disable-next-line
            RongIMLib.RongIMVoice.stop()
            // eslint-disable-next-line
            RongIMLib.RongIMVoice.play(this.base64Str)
          }
        })
    },
    stop(){ // 暂停语音播放
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.init()
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.stop()
    },
    getLivePage(id) { // 跳转到该成员的直播列表页面
      this.$router.push({name:'livepage',params:{id,type: 1}})
    },
    getMemberDetail(memberName){ // 跳转到成员列表页面
      let n = []
      if(memberName.includes('-')){
        n = memberName.split('-')
      }else{
        n = [memberName]
      }
      this.$router.push({name:'memberlist',params: {group: '1', memberName: n[n.length-1]}})
    }
  },
  created() {
    this.getMsgList()
  },
  watch: {
    msgList: function() { // 将得到的消息列表的 extInfo 转换为对象
      this.msgList.forEach(item => {
        item.extInfo = JSON.parse(item.extInfo);
        if (item.bodys.includes("amr")) {
          this.amr = JSON.parse(item.bodys);
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.msg-list {
  div{
    .msg-item {
      max-width: 560px;
      min-width: 480px;
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
        .live-push{
          cursor: pointer;
        }
      }
      .msg-sender {
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
      .fanpai {
        font-size: 14px;
        color: #999;
      }
    }
  }
}  
</style>