<template>
  <div class="open-live-container">
    <live-list
      :type="0"
      :list="openLiveList"
      :rect="{width:'300px',height:'180px',maxWidth: '400px'}"
      :livetitle="'直播'"
      v-if="openLiveList[0]"
    ></live-list>
    <live-list
      :type="0"
      :list="openReviewList"
      :rect="{width:'300px',height:'180px',maxWidth: '400px'}"
      :livetitle="'录播'"
      v-if="openReviewList[0]"
    ></live-list>
    <alt-loading v-else></alt-loading>
    <!-- <akina-list
      :type="0"
      :list="akinaVideos"
      :rect="{width:'300px',height:'180px',maxWidth: '400px'}"
      :livetitle="'录播'"
    ></akina-list> -->
    <div class="button" @click="getMoreOpen">
      <i class="el-icon-arrow-down" v-if="openReviewList[0]"></i>
    </div>
  </div>
</template>

<script>
import liveList from "./subCons/liveList";
import altLoading from '@/components/common/altLoading'
// import akinaList from "../subComponents/akinaList";
// import { mapState } from "vuex";
export default {
  name: "openlive",
  data() {
    return {
      next: 0,
      openLiveList: [],
      openReviewList: [],
      groupId: this.$route.params.id || 0,
      shouldShowFilter: false,
      team: '全团'
    };
  },
  methods: {
    async getOpenLive() {
      // 获取公演列表
      const res1 = await this.ajax("getOpenLive");
      const res2 = await this.ajax("getOpenLive",{isReview: true, groupId: this.groupId});
      this.openLiveList = res1.content.liveList;
      this.openReviewList = res2.content.liveList;
      this.next = res2.content.next
    },
    // async getMoreAkina() {
    //   // 获取B站up寒影AkiNa录播
    //   this.limit += 8;
    //   this.$store.dispatch("getAkinaVideos", { limit: this.limit });
    // },
    async getMoreOpen() {
      const res = await this.ajax("getOpenLive",{isReview: true,next: this.next, groupId: this.groupId});
      this.openReviewList = this.openReviewList.concat(res.content.liveList);
    }
  },
  created() {
    this.getOpenLive();
  },
  components: {
    liveList,
    altLoading
    // akinaList
  }
  // computed: {
  //   ...mapState(["akinaVideos"])
  // }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.open-live-container {
  .live-header {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 320px;
    .alt_icon {
      width: 1160px;
    }
  }
  .button {
    .button-container();
    .flex-all-center();
  }
}
</style>