<template>
  <div class="live-page-container my-card">
    <a class="pic-container" href="javascript:;" v-if="type===1">
      <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
    </a>
    <a class="pic-container" href="javascript:;" v-if="type===0">
      <img :src="picPath | picPathFormat" alt class="live-cover">
    </a>
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
    <!-- <video id="my-player" class="video-js"></video> -->
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import 'videojs-flash'
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
      playerOptions: {
        controls: true,
        autoplay: true,
        techOrder:['flash', 'html5'],
        sourceOrder:true,
        flash:{hls:{withCredentials:false}},
        html5:{hls:{withCredentials:false}},
        sources:[{
            withCredentials:false,
            type:'',
            src:''
        }]
      },
      player: null
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
    playOnLive(){
      this.player = videojs('my-player', this.playerOptions);
      this.player.volume(100)
      this.player.src({
        type:"video/mp4",
        src:this.liveInfo.streamPath
      });
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
  .pic-container {
    text-align: center;
    display: block;
    .live-cover {
      max-width: 800px;
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