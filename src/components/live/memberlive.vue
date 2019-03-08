<template>
  <div class="live-container">
    <h2 class="title">直播</h2>
    <p v-if="!liveList[0]" class="instead-info">当前没有直播</p>
    <live-list :type="1" :list="liveList" :rect="{width:'160px',height:'160px',maxWidth: '368px'}" v-else></live-list>
    <h2 class="title">录播</h2>
    <p v-if="!isSuccess" class="instead-info">
      <i class="el-icon-loading"></i>
    </p>
    <live-list :type="1" :list="reviewList" :rect="{width:'160px',height:'160px',maxWidth: '368px'}" v-else></live-list>
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
    getAllLive() {
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
    getMoreLive() {
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
  .title,
  .instead-info {
    margin-left: 5px;
  }
}
</style>