<template>
  <div class="msg-container" ref="bgPic">
    <div
      class="backToTop flex-all-center"
      @click="toTop"
      v-show="$store.state.scrollTop"
    >
      <i class="el-icon-arrow-up"></i>
    </div>
    <msg-list :id="id"></msg-list>
    <comment-list :id="id"></comment-list>
  </div>
</template>

<script>
import msgList from '../subComponents/msgList'
import commentList from '../subComponents/commentList'
export default {
  name: "roommsg",
  data() {
    return {
      id: this.$route.params.id,
      bgPath: this.$route.params.bgPath,
      top: document.body.scrollTop
    };
  },
  methods: {
    toTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    if (this.bgPath) {
      this.bgPath = "http://source.48.cn" + this.bgPath;
      this.$refs.bgPic.style.background = "url(" + this.bgPath + ")";
      this.$refs.bgPic.style.backgroundPosition = "center center";
      this.$refs.bgPic.style.backgroundAttachment = "fixed";
    } else {
      this.$refs.bgPic.style.background = "url('../assets/room_bg.png')";
    }
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
.msg-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .comment-layer {
    width: 100%;
    height: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    justify-content: flex-end;
    align-items: center;
    display: none;
  }
  @media screen and (max-width: 768px) {
    .board-list {
      display: none;
    }
    .comment-layer {
      display: flex;
    }
  }
}
</style>