<template>
  <div class="live-page-container my-card">
    <a class="flex-all-center" href="javascript:;" v-if="type===1 && picPath">
      <div class="pic-container flex-all-center" @click="triggerMethod('450px','800px')" :style="{width: '450px',height:'800px'}">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <a class="flex-all-center" href="javascript:;" v-if="type===0 && picPath">
      <div class="pic-container flex-all-center" @click="triggerMethod('900px','540px')" :style="{width: '900px',height:'540px'}">
        <img width="100%" :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <video-control 
      :path="liveInfo.streamPath" 
      :type="liveInfo.liveType" 
      :topwidth="topWidth"
      :topHeight="topHeight"
      :radiocover="radioCover"
      ref="vod"
      :toplist="liveInfo.topList"
      :lrcpath="liveInfo.lrcPath"
      v-if="liveInfo.picPath"></video-control>
    <div class="live-info" v-if="liveInfo.picPath">
      <p v-html="liveInfo.title" class="main-title"></p>
      <p v-html="liveInfo.subTitle" class="sub-title"></p>
    </div>
    <!-- <div v-else>请返回上一级</div> -->
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
import videoControl from '../subComponents/videoControl'
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
      radioCover: [],
      topWidth: '',
      topHeight: ''
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
          if(res.data.content.liveType === 2){
            let path = res.data.content.picPath
            if(path.includes(',')){
              this.radioCover = path.split(',')
            }else{
              this.radioCover = path
            }
            this.picPath = res.data.content.picPath;
          }else{
            this.picPath = res.data.content.picPath;
          }
        });
    },
    altImg() {
      this.picPath = "";
    },
    triggerMethod(w,h){
      this.topWidth = w
      this.topHeight = h
      this.$refs.vod.playReview()
    }
  },
  created() {
    this.getLive();
  },
  components: {
    videoControl
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
  .pic-container{
    text-align: center;
    background-color: #000;
    cursor: pointer;
    .live-cover {
      width: 100%;
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