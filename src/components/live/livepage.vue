<template>
  <div class="live-page-container my-card">
    <a class="flex-all-center" href="javascript:;" v-if="type===1">
      <div class="pic-container flex-all-center" @click="playReview" ismember>
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <a class="flex-all-center" href="javascript:;" v-if="type===0">
      <div class="pic-container flex-all-center">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <div class="video-container flex-justify-center" v-if="type===1" v-show="isReview">
      <video src="" controls ref="video"></video>
    </div>
    <div class="live-info">
      <p v-html="liveInfo.title" class="main-title"></p>
      <p v-html="liveInfo.subTitle" class="sub-title"></p>
    </div>
    <p v-html="new Date(liveInfo.startTime).toLocaleDateString()" class="live-time"></p>
    <div class="comment-info" v-if="type===0">
      <i class="el-icon-view"></i>
      <span class="praise-count" v-html="count.praise"></span>
      <i class="el-icon-edit-outline"></i>
      <span class="comment-count" v-html="count.comment"></span>
      <i class="el-icon-share"></i>
      <span class="share-count" v-html="count.share"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "livepage",
  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      liveInfo: {},
      picPath: "",
      count: {
        praise: 0,
        comment: 0,
        share: 0
      },
      isReview: false
    };
  },
  methods: {
    getLive() {
      this.axios
        .get("/api/getLivePage?type=" + this.type + "&id=" + this.id)
        .then(res => {
          this.liveInfo = res.data.content;
          if(this.type===0){
            this.count.praise = res.data.content.count.praiseCount
            this.count.comment = res.data.content.count.commentCount
            this.count.share = res.data.content.count.shareCount
          }
          this.picPath = res.data.content.picPath;
        });
    },
    altImg() {
      this.liveInfo.picPath = "";
    },
    playReview(){
      this.$refs.video.src = this.liveInfo.streamPath
      this.$refs.video.onloadeddata = () => {
        this.isReview = true
      }
      this.$refs.video.onerror = () => {
        this.$message.error('无法播放')
      }
    }
  },
  created() {
    this.getLive();
  }
};
</script>

<style lang="less" scoped>
.live-page-container {
  padding: 10px;
  border: 1px solid #efefef;
  margin: 5px;
  border-radius: 3px;
  position: relative;
  text-align: center;
  .pic-container[ismember] {
    text-align: center;
    background-color: #000;
    width: 450px;
    height: 800px;
    cursor: pointer;
    .live-cover {
      width: 100%;
    }
  }
  .video-container{
    padding: 10px 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 800px;
    video{ 
      height: 100%;
    }
  }
  .live-info {
    border-top: 1px solid #ccc;
    margin-top: 5px;
    .main-title {
      font-size: 18px;
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
    }
  }
  .comment-info {
    .praise-count,.comment-count,.share-count {
      margin-right: 10px;
      margin-left: 2px;
    }
  }
}
</style>