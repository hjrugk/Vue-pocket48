<template>
  <div class="live-container">
    <live-list 
      :type="1" :list="memberLiveList" 
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
      :livetitle="'直播'"
       v-if="memberLiveList[0]"></live-list>
    <div class="review-header" v-if="!isSuccess">
      <p class="instead-info">
        <i class="el-icon-loading"></i>
      </p>
    </div>
    <live-list 
      :type="1" :list="memberReviewList" 
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
      :livetitle="'录播'"
      v-else></live-list>
    <div
      class="button"
      @click="getMoreLive"
      v-show="$route.path !=='/home' && memberReviewList[0]"
    >
      <i class="el-icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
  import liveList from '../subComponents/liveList'
export default {
  name: "memberlive",
  data() {
    return {
      next: 0,
      id: this.$route.params.id || 0,
      isSuccess: false,
      memberLiveList: [],
      memberReviewList: []
    };
  },
  methods: {
    async getMoreLive() { // 获取更多直播
      const res = await this.ajax('/getAllLive',{next:this.next,userId:this.id,record:true})
      this.memberReviewList = this.memberReviewList.concat(res.content.liveList)
      this.next = res.content.next
    },
    async getAllLive(){
      const res1 = await this.ajax('/getAllLive',{record:false,userId:this.id})
      const res2 = await this.ajax('/getAllLive',{record:true,userId:this.id})
      this.memberLiveList = res1.content.liveList
      this.memberReviewList = res2.content.liveList
      this.next = res2.content.next
      if(this.memberReviewList.length===0){
        this.$message('没有更多录播了')
      }
      this.isSuccess = true
    }
  },
  created() {
    this.getAllLive()
  },
  components: {
    liveList
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.live-container {
  margin: 10px;
  .live-header{
    width: 100%;
    display: flex;
    justify-content: center;
    .instead-info{
      width: 85%;
    }
  }
  .review-header{
    width: 100%;
    display: flex;
    justify-content: center;
    .instead-info{
      width: 85%;
    }
  }
  .title,
  .instead-info {
    margin-left: 5px;
  }
  .button{
    .button-container();
    .flex-all-center();
  }
  @media screen and (min-width: 1368px) {
    .instead-info{
      width: 1160px;
    }
  }
}
</style>