<template>
  <div class="user-info flex-all-center">
    <div class="popup-info" v-if="info.avatar">
      <p style="color: white">·</p>
      <img @click="goToUserInfo" :src="info.avatar | picPathFormat" alt="">
      <p class="name">
        {{info.nickName}}
        <el-tag size="mini">{{'lv.' + info.level}}</el-tag>
      </p>
    </div>
    <div class="popup-info flex-all-center" v-else>
      <p>加载信息中</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recommand: {},
      friendsNum: 0,
      info: {}
    }
  },
  props: ['id'],
  methods: {
    getUserInfo(){ // 获取聚聚信息
      this.axios.get('/api/getUserInfo?id=' + this.id)
        .then(res => {
          this.info = res.data.content.userInfo
          this.recommand = res.data.content.userRecommend
          this.friendsNum = res.data.content.friendsNum
        })
    },
    goToUserInfo(){ // 点击跳转到聚聚详细信息页面
      this.$router.push({
        name: 'userinfo',
        params: {
          id: this.info.userId,
          info: this.info,
          recommand: this.recommand,
          friendsNum: this.friendsNum
        }
      })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>
.user-info{
  z-index: 101;
  width: calc(100vw);
  height: calc(100vh);
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3);
  .popup-info{
    width: 240px;
    height: 200px;
    background-color: #fff;
    border-radius: 5px;
    text-align: center;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      cursor: pointer;
    }
    .name{
      color: #000;
    }
  }
}
</style>
