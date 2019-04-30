<template>
  <div class="couple-container">
    <div class="couple-header">CP列表</div>
    <div class="couple-list">
      <div class="couple-item" v-for="item in coupleList" :key="item.coupleId" @click="goToCoupleDetail(item)">
        <span v-html="item.coupleName"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "couple",
  data() {
    return {
      coupleList: [
        {coupleId: 6788834, coupleName: "册白", memberOne: 614727, memberTwo: 614528, containerId:"100808c233ff6ebf66239d807ac077dbeae1ce"}
      ]
    }
  },
  methods: {
    goToCoupleDetail(couple){
      this.$router.push({name: 'topic',params: {coupleId: couple.coupleId,couple}})
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.couple-container{
  width: 100%;
  .couple-header{
    width: 85%;
    padding: 20px;
    margin: 0 auto;
  }
  .couple-list{
    padding: 20px;
    width: 85%;
    margin: 0 auto;
    .couple-item{
      background-color: #fff;
      border: 1px solid #654ea3;
      border-radius: 20px;
      text-align: center;
      width: 120px;
      padding: 10px;
      cursor: pointer;
      transition: background 0.2s ease-out;
      &:hover{
        background: linear-gradient(to right, #e53935, #e35d5b);
        border: none;
        color: #fff;
      }
    }
  }
}
</style>


