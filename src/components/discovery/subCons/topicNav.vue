<template>
  <div class="topic-nav-container">
    <div :style="channelFlag?'border-bottom: 3px solid #fa7d3c':''" class="nav-item" @click="toggleChannel(true)">相关视频</div>
    <div :style="!channelFlag?'border-bottom: 3px solid #fa7d3c':''" class="nav-item" @click="toggleChannel(false)">详细信息</div>
  </div>  
</template>
<script>
export default {
  methods: {
    toggleChannel(channel){
      this.$emit('toggleChannel',channel)
      this.$emit('receiveTwice')
    }
  },
  props: {
    channelFlag: Boolean
  }
}
</script>
<style lang="less" scoped>
.topic-nav-container{
  width: 85%;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  border: 1px solid #eee;
  margin-bottom: 30px;
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
@media screen and (max-width: 900px) {
  .topic-nav-container {
    width: 90%;
  }
}
@media screen and (min-width: 1368px) {
  .topic-nav-container{
    width: 1160px;
  }
}
</style>