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
      <div class="barrage-container flex-justify-center">
        <div>
          <p :class="{'sender-name': barrage.name}" v-html="barrage.name"></p>
          <p :class="{'sender-content': barrage.name}" v-html="barrage.content"></p>
        </div>
      </div>
      <video src="" controls ref="video" id="review-video"></video>
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
import flvjs from 'flv.js'
import typeCheck from '../../plugins/typeCheck'
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
      isReview: false,
      barrageList: {},
      barrage: {}
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
      this.picPath = "";
    },
    playReview(){
      let type = typeCheck(this.liveInfo.streamPath)
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById('review-video');
        const player = flvjs.createPlayer({
            type,
            url: this.liveInfo.streamPath
        });
        player.attachMediaElement(videoElement);
        player.load();
        this.$refs.video.onloadeddata = () => {
          this.isReview = true
          player.play()
          this.loadBarrages()
        }
        this.$refs.video.onerror = () => {
          this.$message.error('无法播放')
        }
        this.$refs.video.ontimeupdate = () => {
          if(this.isReview){
            if(player.currentTime >= this.barrageList.times[0]){
              this.barrage = this.barrageList.barrages[0]
              this.barrageList.times.shift()
              this.barrageList.barrages.shift()
            }
          }
        }
      }
    },
    loadBarrages(){
      this.axios.post('/api/getBarrages',{url:this.liveInfo.lrcPath})
        .then(res => {
          this.barrageList = res.data
        })
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
    .barrage-container{
      width: 100%;
      height: 100px;
      position: absolute;
      bottom: 30px;
      left: 0;
      div{
        width: 450px;
        .sender-name,.sender-content{
          width: 150px;
          background-color: rgba(255,255,255,0.7);
          padding: 5px;
          margin: 2px 0 0 0;
          border-radius: 3px;
        }
        .sender-name{ 
          font-size: 14px;
          color: blue
        }
      }
    }
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