<template>
  <div class="barrage-container">
    <div class="barrage-list" ref="bs" :style="{width: topWidth}">
      <div class="barrage-item" v-for="(item, index) in barrages" :key="index">
        <div :class="{'sender-name': item.name}" v-html="item.name"></div>
        <div :class="{'sender-content': item.name}" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['topWidth',"barrages"],
  updated(){
    this.$refs.bs.scrollTop = this.$refs.bs.scrollHeight
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/global';
 .barrage-container{
   .flex-justify-center();
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 150px;
  left: 0;
  .barrage-list{
    padding-left: 10px;
    z-index: 95;
    height: 180px;
    overflow: scroll;
    .barrage-item{
      width: 150px;
      background-color: rgba(255,255,255,0.7);
      padding: 5px;
      font-size: 12px;
      margin: 2px 0 0 0;
      border-radius: 3px;
    }
    .sender-name{ 
      color: blue;
      padding-bottom: 3px;
    }
    .sender-content{
      color: #000;
    }
  }
}
</style>

