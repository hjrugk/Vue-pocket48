<template>
  <div class="topic-header-container">
    <div class="topic-portrait">
      <img :src="mblogData.pageInfo.portrait" v-if="mblogData.pageInfo" alt="">
      <span class="topic-name">
        {{coupleName}}
      </span>
    </div>
    <div>超话数据</div>
  </div>  
</template>
<script>
export default {
  props: {
    memberOne: Object,
    memberTwo: Object,
    mblogData: Object,
    coupleName: String
  }
}
</script>
<style lang="less" scoped>
.topic-header-container{
  width: 85%;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .topic-portrait{
    display: flex;
    .topic-name{
      padding: 0 20px;
      display: inline-block;
      font-size: 30px;
    }
  }
}
</style>


