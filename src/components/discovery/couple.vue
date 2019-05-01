<template>
  <div class="couple-container">
    <h2 class="couple-header">我的关注</h2>
    <div class="couple-list" v-if="followingCoupleList[0]">
      <div class="couple-item" v-for="item in followingCoupleList" :key="item.coupleId" @click="goToCoupleDetail(item)">
        <span v-html="item.coupleName"></span>
      </div>
    </div>
    <div class="couple-list" v-else>这里空荡荡的~</div>
    <h2 class="couple-header">CP列表</h2>
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
        {coupleId: 6788834, coupleName: "册白", memberOne: 614727, memberTwo: 614528, containerId: ""}
      ],
      followingCoupleList: []
    }
  },
  methods: {
    async goToCoupleDetail(couple){
      const res = await this.ajax('/getmBlogContainer',{containerName: couple.coupleName})
      couple.containerId = res.data.cards[0].card_group[1].scheme.split('containerid=')[1].split('&luicode')[0]
      localStorage.setItem('CACHE_OF_COUPLE',JSON.stringify(couple))
      this.$router.push({name: 'topic',params: {coupleId: couple.coupleId,couple}})
    },
    getFollowingCoupleList(){
      if(localStorage.getItem('couples')){
        this.followingCoupleList = JSON.parse(localStorage.getItem('couples'))
      }else{
        localStorage.setItem('couples',JSON.stringify(this.followingCoupleList))
      }
    }
  },
  mounted() {
    this.getFollowingCoupleList()
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
      box-sizing: border-box;
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


