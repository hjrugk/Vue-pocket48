<template>
  <div class="collapse-container">
    <div class="member-list">
      <div class="member-item" @click="changelivelist({userId:0})">全团</div>
    </div>
    <collapseItem
      @changelivelist="changelivelist"
     :groupId="group.id" v-for="group in groupList" :key="group.id" />
  </div>
</template>
<script>
import collapseItem from './collapseItem'
export default {
  data() {
    return {
      groupList: [
        // 团队列表
        { id: "1000", name: "snh48", color: "#8ed2f5" },
        { id: "1100", name: "bej48", color: "#ff2472" },
        { id: "1200", name: "gnz48", color: "#9fbf40" },
        { id: "1300", name: "shy48", color: "#e200cc" },
        { id: "1400", name: "ckg48", color: "#946200" },
        { id: "1500", name: "idft", color: "#b4006e" },
        { id: "1600", name: "海外练习生", color: "#8ed2f5" }
      ]
    }
  },
  components: {
    collapseItem
  },
  methods: {
    changelivelist({userId}){
      this.$emit('changelivelist',{userId})
    }
  }
}
</script>
<style lang="less" scoped>
.member-list{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  grid-gap: 10px;
  height: 10px;
  background-color: #fff;
  overflow: hidden;
  transition: all 0.2s ease-out;
  .member-item{
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    background-color: #eee;
    width: 80px;
    cursor: pointer;
    height: 25px;
  }
}
</style>
