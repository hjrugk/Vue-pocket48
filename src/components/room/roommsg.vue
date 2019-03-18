<template>
  <div class="msg-container" ref="bgPic">
    <div
      class="backToTop flex-all-center"
      @click="toTop"
      v-show="$store.state.scrollTop"
    >
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="list">
      <msg-list :id="id"></msg-list>
      <comment-list :id="id"></comment-list>
    </div>
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
      bgPath: this.$route.params.bgPath || JSON.parse(localStorage.getItem('bgPath')),
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
    localStorage.setItem('bgPath',JSON.stringify(this.bgPath))
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
.msg-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .list{
    width: 85%;
    display: flex;
    justify-content: space-around;
  }
  .show-comment{
    position: absolute;
    top: 0;
    right: 0;
    width: calc(20vw);
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: #545c64;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      background-color: rgb(84, 92, 100);
    }
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