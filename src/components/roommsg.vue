<template>
  <div class="msg-container">
    <div v-for="item in msgList" :key="item.msgTime" class="msg-item">
      <p class="msg-time" v-html="item.msgTimeStr"></p>
      <p class="msg-content" v-html="item.extInfo.text || item.extInfo.messageText || item.extInfo.idolFlipTitle || '其他类型留言，请打开口袋48查看'"></p>
    </div>
    <el-button @click="getMore" type="info" v-show="$store.state.logFlag">加载更多</el-button>
  </div>
</template>

<script>
  export default {
    name: "roommsg",
    data() {
      return {
        msgList: [],
        id: this.$route.params.id,
        limit: 10
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
}
</style>