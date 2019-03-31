<template>
  <div class="live-page-container my-card">
    <div class="video-container">
      <iframe :src="'//player.bilibili.com/player.html?aid='+$route.params.id" 
        scrolling="no" border="0" frameborder="no" framespacing="0" 
        allowfullscreen="true" width="900" height="540"> </iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bilibili'
}
</script>
<style lang="less" scoped>
@import '../../assets/less/global.less';
.video-container{
  border: 1px solid #efefef;
  border-radius: 3px;
  position: relative;
  width: 100%;
  .flex-justify-center();
  .video-container{
    padding: 10px;
  }
}
</style>

