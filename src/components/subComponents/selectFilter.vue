<template>
  <div class="filter-container" @click.self="closeFilter">
    <div class="filter-inner">
      <collapse @changelivelist="changelivelist" />
    </div>
  </div>
</template>
<script>
import collapse from './collapse'
export default {
  data() {
    return {
      // memberList: [],
      // team: []
    }
  },
  methods: {
    closeFilter(){
      this.$emit('close')
    },
    changelivelist({userId}){
      this.$emit('changelivelist',{userId})
    }
  },
  components: {
    collapse
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.filter-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,0.5);
  .flex-all-center();
  .filter-inner{
    // width: 50%;
    max-height: 50%;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #999;
    overflow: scroll;
  }
}
</style>

