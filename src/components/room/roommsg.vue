<template>
  <div class="msg-container" ref="bgPic">
    <div class="top" @click="toTop">
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="show-all-msg">
      <i class="el-icon-arrow-left" @click="shouldShowAllMsg = !shouldShowAllMsg"></i>
    </div>
    <div class="list">
      <transition-group>
        <msg-list :key="1" :ownerId="ownerId" :roomId="roomId" v-show="!shouldShowAllMsg"></msg-list>
        <comment-list :key="2" :roomId="roomId" v-show="shouldShowAllMsg"></comment-list>
      </transition-group>
    </div>
  </div>
</template>

<script>
import msgList from "../subComponents/msgList";
import commentList from "../subComponents/commentList";
export default {
  name: "roommsg",
  data() {
    return {
      ownerId: this.$route.params.ownerId,
      roomId: this.$route.params.roomId,
      bgPath:
        this.$route.params.bgPath || JSON.parse(localStorage.getItem("bgPath")),
      top: document.body.scrollTop,
      shouldShowAllMsg: false
    };
  },
  methods: {
    toTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    localStorage.setItem("bgPath", JSON.stringify(this.bgPath));
    this.bgPath = "http://source.48.cn" + this.bgPath;
    this.$refs.bgPic.style.background = "url(" + this.bgPath + ")";
    this.$refs.bgPic.style.backgroundPosition = "center center";
    this.$refs.bgPic.style.backgroundAttachment = "fixed";
  },
  watch: {
    top: function() {
      this.top = document.body.scrollTop;
    }
  },
  components: {
    msgList,
    commentList
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
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
    width: 30px;
    height: 30px;
    .flex-all-center();
    cursor: pointer;
    border: 1px solid #eee;
  }
  @media screen and (max-width: 768px) {
    .board-list {
      display: none;
    }
    .comment-layer {
      display: flex;
    }
  }
  @media screen and (min-width: 1368px) {
    .list {
      width: 1160px;
    }
  }
}
</style>