<template>
  <div class="topic-nav-container">
    <div class="nav-item">视频</div>
    <div class="nav-item">超话</div>
  </div>  
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.topic-nav-container{
  width: 85%;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .nav-item{
    padding: 10px;
    width: 120px;
    cursor: pointer;
    text-align: center;
    &:hover{
      background-color: #eee;
    }
  }
}
</style>