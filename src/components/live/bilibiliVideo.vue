<template>
  <div class="live-page-container my-card">
    <div class="video-container">
      <iframe
        :src="'https://player.bilibili.com/player.html?aid='+$route.params.id"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        style="width:900px;height:540px;"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "bilibili"
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global.less";
.video-container {
  border-radius: 3px;
  position: relative;
  width: 100%;
  .flex-justify-center();
  .video-container {
    padding: 10px;
  }
}
</style>

