<template>
  <div class="msg-container" ref="bgPic">
    <div class="backToTop" @click="toTop" v-show="msgList.length>=20 || commentList.length>=20">
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="msg-list">
      <div v-for="item in msgList" :key="item.msgTime" class="msg-item">
        <p class="msg-time" v-html="item.msgTimeStr"></p>
        <p class="msg-sender">
          <img :src="item.extInfo.senderAvatar | picPathFormat" alt="" class="sender-avatar">
          <span v-html="item.extInfo.senderName" class="sender-name"></span>
        </p>
        <p
          v-show="item.extInfo.faipaiContent"
          v-html="item.extInfo.faipaiContent"
          class="fanpai"
        ></p>
        <p class="msg-content" v-if="item.bodys.includes('jpg'||'png'||'gif'||'bmp')">
          <img :src="JSON.parse(item.bodys).url" alt="" class="msg-img">
        </p>
        <p class="msg-content"
           v-else
           v-html="item.extInfo.text || item.extInfo.referenceTitle
         || item.extInfo.messageText || item.extInfo.idolFlipTitle
         || '其他类型留言，请打开口袋48查看'"
        ></p>
      </div>
      <div class="button-container" @click="getMore(1)">
        <i class="el-icon-arrow-down" v-show="msgList[0]"></i>
        <!--<el-button @click="getMore(1)" type="info" v-show="msgList[0]">加载更多</el-button>-->
      </div>
    </div>
    <div class="board-list" ref="board">
      <div class="board-item" v-for="item in commentList" :key="item.msgTimeStr">
        <div class="sender-info">
          <img :src="item.extInfo.senderAvatar | picPathFormat" alt="" class="sender-img">
          <p class="board-name" v-html="item.extInfo.senderName"></p>
        </div>
        <p class="board-content" v-html="item.extInfo.text"></p>
      </div>
      <div class="button-container" @click="getMore(0)">
        <i class="el-icon-arrow-down" v-show="commentList[0]"></i>
        <!--<el-button @click="getMore(0)" type="info" v-show="commentList[0]">加载更多</el-button>-->
      </div>
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
        top: document.body.scrollTop,
        commentList: []
      }
    },
    methods: {
      getMsgList(){
        this.axios.post('/api/getRoomBoard',{token: this.$store.state.token,id: this.id})
          .then(res => {
            this.msgList = res.data.content.data
          })
      },
      getMore(type){
        this.limit += 10
        if (type===1){
          this.axios.post('/api/getRoomBoard',{token: this.$store.state.token,id: this.id,limit: this.limit})
            .then(res => {
              this.msgList = res.data.content.data
            })
        } else{
          this.axios.post('/api/getComments',{id:this.id,token:this.$store.state.token,limit: this.limit})
            .then(res => {
              this.commentList = res.data.content.data
            })
        }
      },
      toTop(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      getComments(){
        this.axios.post('/api/getComments',{id:this.id,token:this.$store.state.token})
          .then(res => {
            this.commentList = res.data.content.data
          })
      }
    },
    mounted() {
      this.getMsgList()
      this.getComments()
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
      },
      'commentList': function () {
        this.commentList.forEach(item => {
          item.extInfo = JSON.parse(item.extInfo)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.msg-container{
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .comment-layer{
    width: 100%;
    height: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    justify-content: flex-end;
    align-items: center;
    display: none;
  }
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
    cursor: pointer;
    z-index: 999;
  }
  .msg-list{
    .button-container{
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .el-icon-arrow-down{
        font-size: 25px;
      }
      &:hover{
        cursor: pointer;
        background-color: #eee;
      }
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
  }
  .board-list{
    .button-container{
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .el-icon-arrow-down{
        font-size: 25px;
      }
      &:hover{
        cursor: pointer;
        background-color: #ccc;
      }
    }
    .board-item{
      display: flex;
      flex-direction: column;
      border: 1px solid #777;
      border-radius: 3px;
      background-color: #666;
      padding: 10px;
      max-width: 300px;
      box-shadow: 0 0 1px #ccc;
      margin-bottom: 5px;
      &:hover{
      background-color: #555;
      }
      .sender-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .sender-img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .board-name{
          color: #eee;
        }
      }
      .board-content{
        color: #fff;
      }
    }
  }
@media screen and (max-width: 768px) {
  .board-list{
    display: none;
  }
  .comment-layer{
    display: flex;
  }
}
}
</style>