<template>
  <div class="open-live-container">
    <h2>公演直播</h2>
    <p v-if="!liveList[0]" class="alt_icon">
      <i class="el-icon-loading"></i>
    </p>
    <live-list :type="0" :list="liveList" :rect="{width:'400px',height:'230px',maxWidth: '600px'}" v-else></live-list>
    <h2>公演录播</h2>
    <p v-if="!reviewList[0]" class="alt_icon">
      <i class="el-icon-loading"></i>
    </p>
    <live-list :type="0" :list="reviewList" :rect="{width:'400px',height:'230px',maxWidth: '600px'}" v-else></live-list>
    <div class="button-container flex-all-center" @click="getMoreLive">
      <i class="el-icon-arrow-down" v-if="reviewList[0]"></i>
    </div>
  </div>
</template>

<script>
  import liveList from '../subComponents/liveItem'
export default {
  name: "openlive",
  data() {
    return {
      liveList: [],
      limit: 8,
      reviewList: []
    };
  },
  methods: {
    getOpenLive() {
      this.axios.get("/api/getOpenLive").then(res => {
        this.liveList = res.data.content.liveList;
      });
    },
    getMoreLive() {
      this.limit += 8;
      this.axios
        .get("/api/getOpenLive?isReview=1&limit=" + this.limit)
        .then(res => {
          this.reviewList = res.data.content.liveList;
        });
    },
    getReviewLive() {
      this.axios.get("/api/getOpenLive?isReview=1").then(res => {
        this.reviewList = res.data.content.liveList;
      });
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
.open-live-container {
  padding: 10px;
}
</style>