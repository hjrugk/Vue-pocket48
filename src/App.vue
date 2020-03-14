<template>
  <div id="app">
    <Navbar />
    <router-view class="router-container"></router-view>
    <About />
  </div>
</template>

<script>
import Navbar from './views/Navbar'
import About from './views/About'
import worker from './workers/worker'
export default {
  name: "app",
  watch: {
    $route: function () { // 当路由地址变化后，停止播放音频
      // if(this.TITLE.innerHTML !== 'VUE48'){this.TITLE.innerText = 'VUE48'}
      this.activeIndex = '/'+this.$router.history.current.fullPath.split('/')[1]
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
    Navbar,
    About
  }
};
</script>

<style scoped lang="less">
#app{
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  .router-container{
    flex: 1;
  }
}
</style>
