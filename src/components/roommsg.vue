<template>
  <div class="msg-container">
    <div v-for="item in msgList" :key="item.msgTime" class="msg-item">
      <p class="msg-time" v-html="item.msgTimeStr"></p>
      <p class="msg-sender">
        <span>
          <img :src="item.extInfo.senderAvatar | picPathFormat" alt="" class="sender-avatar">
        </span>
        <span v-html="item.extInfo.senderName" class="sender-name"></span>
      </p>
      <p class="msg-content" v-if="item.bodys">
        <img :src="JSON.parse(item.bodys).url" alt="" class="msg-img">
      </p>
      <p class="msg-content"
         v-else
         v-html="item.extInfo.text
         || item.extInfo.messageText || item.extInfo.idolFlipTitle
         || '其他类型留言，请打开口袋48查看'"
      ></p>
    </div>
    <div class="button-container">
      <el-button @click="getMore" type="info" v-show="$store.state.logFlag">加载更多</el-button>
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
        bodys: {}
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
      }
    },
    mounted() {
      this.getMsgList()
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
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 5px;
    max-width: 400px;
    .msg-time{
      font-size: 12px;
    }
    .msg-content{
      .msg-img{
        width: 100%;
      }
    }
    .msg-sender{
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
  }
  .button-container{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>