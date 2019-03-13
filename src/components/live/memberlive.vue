<template>
  <div class="live-container">
    <live-list 
      :type="1" :list="liveList" 
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
      :livetitle="'直播'"
       v-if="liveList[0]"></live-list>
    <div class="review-header" v-if="!isSuccess">
      <p class="instead-info">
        <i class="el-icon-loading"></i>
      </p>
    </div>
    <live-list 
      :type="1" :list="reviewList" 
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
      :livetitle="'录播'"
      v-else></live-list>
    <div
      class="button-container flex-all-center"
      @click="getMoreLive"
      v-show="$route.path !=='/home' && reviewList[0]"
    >
      <i class="el-icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
  import liveList from '../subComponents/liveItem'
export default {
  name: "memberlive",
  data() {
    return {
      liveList: [],
      reviewList: [],
      limit: 8,
      id: this.$route.params.id || 0,
      isSuccess: false
    };
  },
  methods: {
    getAllLive() { // 获取直播列表
      this.axios.get("/api/getAllLive?limit=8&id=" + this.id).then(res => {
        this.isSuccess = true
        if(res.data.content.reviewList.length){
          this.liveList = res.data.content.liveList;
          this.reviewList = res.data.content.reviewList;
        }else{
          this.$message('没有更多直播')
        }
      });
    },
    getMoreLive() { // 获取更多直播
      this.limit += 8;
      this.axios
        .get("/api/getAllLive?limit=" + this.limit + "&id=" + this.id)
        .then(res => {
          this.reviewList = res.data.content.reviewList;
        });
    }
  },
  mounted() {
    this.getAllLive();
  },
  components: {
    liveList
  }
};
</script>

<style lang="less" scoped>
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
}
</style>