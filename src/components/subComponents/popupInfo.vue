<template>
  <div class="user-info">
    <div class="popup-info" v-if="info.userAvatar || info.senderAvatar">
      <p style="color: white">·</p>
      <img class="juju-avatar" @click="goToUserInfo" :src="info.userAvatar || info.senderAvatar | picPathFormat" alt="">
      <p class="name">
        {{info.userName || info.senderName}}
        <el-tag size="mini">{{'lv.' + (info.userLevel || info.senderLevel[2])}}</el-tag>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id','info'],
  methods: {
    goToUserInfo(){ // 点击跳转到聚聚详细信息页面
      this.$router.push({
        name: 'userinfo',
        params: {
          id: this.info.userId || this.info.senderId
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/global';
.user-info{
  .flex-all-center();
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
    overflow: hidden;
    .juju-avatar{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      cursor: pointer;
    }
    .name{
      color: #000;
    }
    .alt-img{
      height: 100%;
    }
  }
}
</style>
