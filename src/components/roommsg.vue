<template>
  <div class="msg-container" ref="bgPic">
    <div class="backToTop" @click="toTop" v-show="msgList.length>=20">
      <i class="el-icon-arrow-up"></i>
    </div>
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
        bgPath: this.$route.params.bgPath,
        top: document.body.scrollTop
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
            this.msgList = res.data.content.data
          })
      },
      toTop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      logTop(){
        console.log(document.body.scrollTop)
      }
    },
    mounted() {
      this.getMsgList()
      if(this.bgPath){
        this.bgPath = 'http://source.48.cn' + this.bgPath
        this.$refs.bgPic.style.background = 'url(' + this.bgPath + ')'
        this.$refs.bgPic.style.backgroundPosition = 'center center'
        this.$refs.bgPic.style.backgroundAttachment = 'fixed'
      }else{
        this.$refs.bgPic.style.background = "url('../assets/room_bg.png')"
      }
    },
    watch: {
      'msgList': function () {
        this.msgList.forEach(item => {
          item.extInfo = JSON.parse(item.extInfo)
        })
      },
      'top': function () {
        this.top = document.body.scrollTop
      }
    }
  }
</script>

<style lang="less" scoped>
.msg-container{
  padding: 10px;
  margin-bottom: 10px;
  .backToTop{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 30px;
    right: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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