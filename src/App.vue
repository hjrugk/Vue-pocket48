<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './views/Navbar'
import worker from './workers/worker'
export default {
  name: "app",
  watch: {
    $route: function () { // 当路由地址变化后，停止播放音频
      // if(this.TITLE.innerHTML !== 'VUE48'){this.TITLE.innerText = 'VUE48'}
      this.activeIndex = '/'+this.$router.history.current.fullPath.split('/')[1]
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.init()
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.stop()
    }
  },
  async mounted() {
    this.$store.dispatch('checkIsLogin')
    this.$store.dispatch('getAllLive')
    this.$store.dispatch('getOpenLive')
    // this.$store.dispatch('getSwipeAds')
    if(!localStorage.getItem('database')){
      let isComplete = await worker()
      if(isComplete){
        this.$store.dispatch('getComplete')
      }
    }else{
      let timeStamp = JSON.parse(localStorage.getItem('database')).timeStamp
      let now = Date.now()
      if(now>=(parseInt(timeStamp)+2592000000)){
        await worker()
      }
      this.$store.dispatch('getComplete')
    }
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang="less">

</style>
