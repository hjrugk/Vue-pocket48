<template>
  <div class="open-live-container">
    <div v-if="!openLiveList[0]" class="live-header">
      <p class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
    </div>
    <live-list 
      :type="0" :list="openLiveList" 
      :rect="{width:'400px',height:'230px',maxWidth: '600px'}" 
      :livetitle="'直播'"
      v-else></live-list>
    <div v-if="!openReviewList[0]" class="live-header">
      <p class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
    </div>
    <live-list 
      :type="0" :list="openReviewList" 
      :rect="{width:'400px',height:'230px',maxWidth: '600px'}" 
      :livetitle="'录播'"
      v-else></live-list>
    <div class="button" @click="getMoreLive">
      <i class="el-icon-arrow-down" v-if="openReviewList[0]"></i>
    </div>
  </div>
</template>

<script>
  import liveList from '../subComponents/liveList'
export default {
  name: "openlive",
  data() {
    return {
      limit: 8,
      openReviewList: [],
      openLiveList: []
    };
  },
  methods: {
    async getOpenLive() { // 获取公演列表
      const res = await this.ajax('getOpenLive')
      this.openLiveList = res.content.liveList
    },
    async getMoreLive() { 
      this.limit += 8;
      const res = await this.ajax('/getOpenLive',{isReview:1,limit: this.limit})
      this.openReviewList = res.content.liveList
    },
    async getReviewLive() {
      const res = await this.ajax('getOpenLive',{isReview:1})
      this.openReviewList = res.content.liveList
    }
  },
  created() {
    this.getOpenLive();
    this.getReviewLive();
  },
  components: {
    liveList
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.open-live-container {
  padding: 10px;
  .live-header{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 320px;
    .alt_icon{
      width: 85%;
    }
  }
  .button{
    .button-container();
    .flex-all-center();
  }
}
</style>