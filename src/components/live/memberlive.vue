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
      limit: 8,
      id: this.$route.params.id || 0,
      isSuccess: false,
      memberLiveList: [],
      memberReviewList: []
    };
  },
  methods: {
    async getMoreLive() { // 获取更多直播
      this.limit += 8;
      const res = await this.ajax('/getAllLive',{limit:this.limit,id:this.id})
      this.memberReviewList = res.content.reviewList
    },
    async getAllLive(){
      const res = await this.ajax('/getAllLive',{limit:this.limit,id:this.id})
      this.memberLiveList = res.content.liveList
      this.memberReviewList = res.content.reviewList
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