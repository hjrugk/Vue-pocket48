<template>
  <div class="live-container">
    <select-filter @changelivelist="changelivelist" @close="changeShowFilter" v-show="shouldShowFilter" />
    <div class="live-filter">
      <img src="@/assets/images/shaixuan.webp" @click="shouldShowFilter = !shouldShowFilter" />
    </div>
    <live-list
      :type="1"
      :list="memberLiveList"
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}"
      :livetitle="'直播'"
      v-if="memberLiveList[0]"
    ></live-list>
    <alt-loading v-if="!isSuccess"></alt-loading>
    <live-list
      :type="1"
      :list="memberReviewList"
      :rect="{width:'240px',height:'150px',maxWidth: '360px'}"
      :livetitle="'录播'"
      v-if="memberReviewList[0]"
    ></live-list>
    <div v-if="!memberReviewList[0]" style="width: 100%;text-align:center;height:300px;padding-top:150px;">
      <img src="@/assets/images/no_data.webp" alt="">
    </div>
    <div class="button" @click="getMoreLive" v-show="$route.path !=='/home' && memberReviewList[0]">
      <i class="el-icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
import liveList from "./subCons/liveList";
import altLoading from '@/components/common/altLoading'
import selectFilter from '@/components/common/selectFilter'
export default {
  name: "memberlive",
  data() {
    return {
      next: 0,
      id: this.$route.params.id || 0,
      isSuccess: false,
      memberLiveList: [],
      memberReviewList: [],
      shouldShowFilter: false
    };
  },
  methods: {
    async getMoreLive() {
      // 获取更多直播
      const res = await this.ajax("/getAllLive", {
        next: this.next,
        userId: this.id,
        record: true
      });
      this.memberReviewList = this.memberReviewList.concat(
        res.content.liveList
      );
      this.next = res.content.next;
    },
    async getAllLive() {
      const res1 = await this.ajax("/getAllLive", {
        record: false,
        userId: this.id
      });
      const res2 = await this.ajax("/getAllLive", {
        record: true,
        userId: this.id
      });
      this.memberLiveList = res1.content.liveList;
      this.memberReviewList = res2.content.liveList;
      this.next = res2.content.next;
      if (this.memberReviewList.length === 0) {
        this.$message("没有更多录播了");
      }
      this.isSuccess = res1.success;
    },
    changeShowFilter(){
      this.shouldShowFilter = false
    },
    changelivelist({userId}){
      this.id = userId
      this.shouldShowFilter = false
      this.getAllLive()
    }
  },
  created() {
    this.getAllLive();
  },
  components: {
    liveList,
    altLoading,
    selectFilter
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.live-container {
  margin: 10px;
  .live-filter{
    position: absolute;
    top: 120px;
    right: 11.5%;
    font-size: 20px;
    margin-left: 15px;
    img{
      width: 20px;
      cursor: pointer;
    }
  }
  .live-header {
    width: 100%;
    display: flex;
    justify-content: center;
    .instead-info {
      width: 85%;
    }
  }
  .review-header {
    width: 100%;
    display: flex;
    justify-content: center;
    .instead-info {
      width: 85%;
    }
  }
  .title,
  .instead-info {
    margin-left: 5px;
  }
  .button {
    .button-container();
    .flex-all-center();
  }
  @media screen and (min-width: 1368px) {
    .instead-info {
      width: 1160px;
    }
  }
}
</style>