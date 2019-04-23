<template>
  <div class="bubble-container">
    <div class="left" style="background-image: url('./images/jingyv_left.9.png')"></div>
    <div class="middle" style="-webkit-border-image: url('./images/jingyv_left.9.png') 0 50 0 30 stretch">
      <div class="text-container">
        123456dsadjaksdhkashdkjashdkajhsdkjhaskjdhkjashdjkadshkdhjashdjkahsdkjh
      </div>
    </div>
    <div class="right" style="background-image: url('./images/jingyv_left.9.png')"></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.bubble-container{
  display: flex;
  .left{
    width: 30px;
    height: 95px;
  }
  .right{
    width: 50px;
    height: 95px;
    background-position-x: 50px;
  }
  .middle{
    height: 95px;
    background-position-x: -30px;
    background-repeat: no-repeat;
    // background-size: auto 100%;
    .text-container{
      min-width: 126px;
      max-width: 300px;
      padding: 25px;
      text-align: left;
      width: 100%;
      word-wrap:break-word;
      word-break: normal;
    }
  }
}
</style>
