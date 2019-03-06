<template>
  <div class="board-list" ref="board">
    <transition-group>
      <div class="board-item my-card"
            :class="{isSpec:item.extInfo.senderId===655632}"
            v-for="item in commentList" :key="item.msgidClient"
      >
        <div class="sender-info flex-align-center">
          <img :src="item.extInfo.senderAvatar | picPathFormat" alt class="sender-img">
          <p class="board-name" v-html="item.extInfo.senderName"></p>
        </div>
        <p class="board-content" v-html="item.extInfo.text || item.extInfo.content + ' ' + item.extInfo.giftName"></p>
      </div>
    </transition-group>
    <div class="button-container flex-all-center" @click="getMore">
      <i class="el-icon-arrow-down" v-show="commentList[0]"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'commentList',
  data(){
    return {
      limit: 10,
      commentList: []
    }
  },
  props: ['id'],
  methods: {
    getComments() {
      this.axios
        .post("/api/getComments", {
          id: this.id,
          token: this.$store.getters.getToken
        })
        .then(res => {
          this.commentList = res.data.content.data;
        });
    },
    getMore() {
      this.limit += 10;
      this.axios
        .post("/api/getComments", {
          id: this.id,
          token: this.$store.getters.getToken,
          limit: this.limit
        })
        .then(res => {
          this.commentList = res.data.content.data;
        });
    }
  },
  created() {
    this.getComments()
  },
  watch: {
    commentList: function() {
      this.commentList.forEach(item => {
        item.extInfo = JSON.parse(item.extInfo);
      });
    }
  }
}
</script>
<style lang="less" scoped>
.board-list {
  .board-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #777;
    background-color: #666;
    max-width: 300px;
    min-width: 250px;
    &:hover {
      background-color: #555;
    }
    &.isSpec{
      background-color: #999;
      border: 1px solid #999;
    }
    .sender-info {
      justify-content: flex-start;
      border-bottom: 1px solid #ccc;
      .sender-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .board-name {
        color: #eee;
      }
    }
    .board-content {
      color: #fff;
    }
  }
}
</style>

