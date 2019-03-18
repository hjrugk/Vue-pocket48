<template>
  <div class="user-info flex-all-center">
    <div class="popup-info" v-if="jujuInfo.info.avatar">
      <p style="color: white">·</p>
      <img class="juju-avatar" @click="goToUserInfo" :src="jujuInfo.info.avatar | picPathFormat" alt="">
      <p class="name">
        {{jujuInfo.info.nickName}}
        <el-tag size="mini">{{'lv.' + jujuInfo.info.level}}</el-tag>
      </p>
    </div>
    <div class="popup-info flex-all-center" v-else>
      <img class="alt-img" src="../../assets/images/loading.gif" alt="">
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  props: ['id'],
  methods: {
    goToUserInfo(){ // 点击跳转到聚聚详细信息页面
      this.$router.push({
        name: 'userinfo',
        params: {
          id: this.jujuInfo.info.userId,
          info: this.jujuInfo.info,
          recommend: this.jujuInfo.recommend,
          friendsNum: this.jujuInfo.friendsNum
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('getJuJuInfo',{id:this.id})
  },
  computed: {
    ...mapState(['jujuInfo'])
  },
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
