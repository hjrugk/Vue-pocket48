<template>
  <div class="msg-container" ref="bgPic">
    <div v-for="item in msgList" :key="item.msgTime" class="msg-item">
      <p class="msg-time" v-html="item.msgTimeStr"></p>
      <router-link class="msg-sender" to="">
        <img :src="item.extInfo.senderAvatar | picPathFormat" alt="" class="sender-avatar">
        <span v-html="item.extInfo.senderName" class="sender-name"></span>
      </router-link>
      <p
        v-show="item.extInfo.faipaiContent"
        v-html="item.extInfo.faipaiContent"
        class="fanpai"
      ></p>
      <p class="msg-content" v-if="item.bodys.includes('url')">
        <img :src="JSON.parse(item.bodys).url" alt="" class="msg-img">
      </p>
      <p class="msg-content"
         v-else
         v-html="item.extInfo.text
         || item.extInfo.messageText || item.extInfo.idolFlipTitle
         || '其他类型留言，请打开口袋48查看'"
      ></p>
    </div>
    <div class="board-list">
      <div class="board-item">
        <p class="board-msg"></p>
      </div>
    </div>
    <div class="button-container">
      <el-button @click="getMore" type="info" v-show="msgList[0]">加载更多</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "roommsg",
    data() {
      return {
        msgList: [],
        id: this.$route.params.id,
        limit: 10,
        bodys: {},
        bgPath: this.$route.params.bgPath
      }
    },
    methods: {
      getMsgList(){
        this.axios.post('/api/getRoomBoard',{token: this.$store.state.token,roomID: this.id})
          .then(res => {
            this.msgList = res.data.content.data
          })
      },
      getMore(){
        this.limit += 10
        this.axios.post('/api/getRoomBoard',{token: this.$store.state.token,roomID: this.id,limit: this.limit})
          .then(res => {
            console.log(res.data)
            this.msgList = res.data.content.data
          })
      }
      // getComments(){
      //   this.axios.post('/api/getComments',{token: this.$store.state.token,roomID: this.id})
      //     .then(res => {
      //       console.log(res.data);
      //     })
      // }
    },
    mounted() {
      this.getMsgList()
      this.bgPath = 'http://source.48.cn' + this.bgPath
      this.$refs.bgPic.style.background = 'url(' + this.bgPath + ')'
      this.$refs.bgPic.style.backgroundPosition = 'center center'
      this.$refs.bgPic.style.backgroundAttachment = 'fixed'
    },
    watch: {
      'msgList': function () {
        this.msgList.forEach(item => {
          item.extInfo = JSON.parse(item.extInfo)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.msg-container{
  padding: 10px;
  margin-bottom: 10px;
  .msg-item{
    border: 1px solid #efefef;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 5px;
    max-width: 400px;
    box-shadow: 0 0 1px #ccc;
    background-color: #fff;
    &:hover{
      background-color: #efefef;
    }
    .msg-time{
      font-size: 12px;
    }
    .msg-content{
      .msg-img{
        width: 100%;
      }
    }
    .msg-sender{
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #000;
      line-height: 1.5;
      .sender-avatar{
        width: 20px;
      }
      .sender-name{
        line-height: 20px;
        font-size: 15px;
        display: inline-block;
        margin-left: 5px;
      }
    }
    .fanpai{
      font-size: 14px;
      color: #999;
    }
  }
  .button-container{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>