<template>
  <div class="alt_bg">
    <img class="alt-img" src="images/loading1.gif" alt>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.alt_bg {
  .flex-all-center();
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  .alt-img {
    height: 100%;
  }
}
</style>
