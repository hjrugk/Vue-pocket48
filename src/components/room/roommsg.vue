<template>
  <div class="msg-container" ref="bgPic">
    <div class="top" @click="toTop">
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="show-all-msg" @click="changeToggleBtnText">
      <i class="el-icon-arrow-left"></i>
      <span class="show-msg-button" v-html="innerTextOfToggleButon"></span>
    </div>
    <div class="list">
      <transition-group name="slide-fade">
        <msg-list :key="1" :ownerId="ownerId" :roomId="roomId" v-show="!shouldShowAllMsg"></msg-list>
        <comment-list :key="2" :ownerId="ownerId" :roomId="roomId" v-show="shouldShowAllMsg"></comment-list>
      </transition-group>
    </div>
  </div>
</template>

<script>
import msgList from "./subCons/msgList";
import commentList from "./subCons/commentList";

export default {
  name: "roommsg",
  data() {
    return {
      ownerId: this.$route.params.ownerId,
      roomId: this.$route.params.roomId,
      bgPath:
        this.$route.params.bgPath || JSON.parse(localStorage.getItem("bgPath")),
      shouldShowAllMsg: false,
      innerTextOfToggleButon: '留言板'
    };
  },
  methods: {
    toTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    changeToggleBtnText(){
      this.shouldShowAllMsg = !this.shouldShowAllMsg
      this.shouldShowAllMsg ? this.innerTextOfToggleButon = '返回' : this.innerTextOfToggleButon = '留言板'
    }
  },
  mounted() {
    localStorage.setItem("bgPath", JSON.stringify(this.bgPath));
    this.bgPath = "http://source.48.cn" + this.bgPath;
    this.$refs.bgPic.style.background = "url(" + this.bgPath + ")";
    this.$refs.bgPic.style.backgroundPosition = "center center";
    this.$refs.bgPic.style.backgroundAttachment = "fixed";
  },
  components: {
    msgList,
    commentList
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
.msg-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .list {
    width: 85%;
    display: flex;
    justify-content: space-around;
  }
  .comment-layer {
    width: 100%;
    height: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    justify-content: flex-end;
    align-items: center;
    display: none;
  }
  .top {
    .backToTop();
    .flex-all-center();
  }
  .show-all-msg {
    position: fixed;
    right: 15px;
    top: 80px;
    background-color: #fff;
    // width: 30px;
    padding: 0 10px;
    height: 30px;
    .flex-all-center();
    cursor: pointer;
    border: 1px solid #eee;
    transition: all 0.5s ease;
    overflow: hidden;
    .show-msg-button{
      transition: all 0.5s ease;
      // width: 50px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    // .board-list {
    //   display: none;
    // }
    .comment-layer {
      display: flex;
    }
    .show-all-msg{
      width: 30px;
      padding: 0;
      .show-msg-button{
        width: 0;
        visibility: hidden;
      }
    }
  }
  @media screen and (min-width: 1368px) {
    .list {
      width: 1160px;
    }
  }
}
</style>