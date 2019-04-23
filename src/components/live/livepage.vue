<template>
  <div class="live-page-container my-card">
    <div class="info-container" v-show="showInfoHeader">
      <div class="live-info" :style="{width: rect.width}">
        <div class="live-title">
          <span v-html="title" class="sub-title"></span>
          <br>
          <span v-if="type!==0" v-html="liveInfo.user.userName+'的直播间'" class="main-title"></span>
        </div>
        <div v-html="new Date(parseInt(ctime)).toLocaleString()" class="live-time"></div>
        <div class="comment-info" v-if="type===0">
          <i class="el-icon-view"></i>
          <span class="praise-count" v-html="liveInfo.playNum"></span>
          <i class="el-icon-star-off"></i>
          <span class="comment-count" v-html="liveInfo.praiseNum"></span>
        </div>
      </div>
    </div>
    <a href="javascript:;" v-if="type===0" style="cursor: default;">
      <div class="pic-container" :style="rect">
        <img
          width="100%"
          :src="picPath | picPathFormat"
          @error="altImg"
          alt
          class="live-cover"
          v-show="picPath"
        >
        <div class="mask" @click="triggerMethod">
          <div class="play-btn" @click.prevent="triggerMethod"></div>
        </div>
      </div>
    </a>
    <a href="javascript:;" v-else style="cursor: default;">
      <div class="pic-container" :style="rect">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
        <div class="mask" @click="triggerMethod">
          <div class="play-btn" @click.prevent="triggerMethod"></div>
        </div>
      </div>
    </a>
    <video-control
      :path="livePath"
      :type="liveInfo.liveType"
      :topwidth="topWidth"
      :topHeight="topHeight"
      :radiocover="radioCover"
      ref="vod"
      :toplist="liveInfo.topUser"
      :lrcpath="liveInfo.msgFilePath"
      :isLive="isLive"
      v-if="liveInfo"
    ></video-control>
  </div>
</template>

<script>
import videoControl from "./subCons/videoControl";
export default {
  name: "livepage",
  data() {
    return {
      id: this.$route.params.id,
      liveInfo: {},
      picPath: "",
      count: {
        praise: 0,
        comment: 0,
        share: 0
      },
      radioCover: [],
      topWidth: "",
      topHeight: "",
      showInfoHeader: true
    };
  },
  methods: {
    async getLive() {
      // 获取直播信息
      this.picPath = JSON.parse(localStorage.getItem("type")).cover;
      if (this.type === 0) {
        const res = await this.ajax("/getOpenPage", { id: this.id });
        this.liveInfo = res.content;
      } else {
        const res = await this.ajax("/getLivePage", { id: this.id });
        this.liveInfo = res.content;
        if (this.liveInfo.carousels) {
          this.radioCover = this.liveInfo.carousels.carousels;
        }
      }
    },
    altImg() {
      this.picPath = "/";
    },
    triggerMethod() {
      // 公演与成员直播设置不同的视频高宽
      this.topWidth = this.rect.width;
      this.topHeight = this.rect.height;
      this.$refs.vod.playReview();
      this.showInfoHeader = false
    }
  },
  created() {
    this.getLive();
  },
  components: {
    videoControl
  },
  computed: {
    livePath: function() {
      // 返回各清晰度视频地址
      let streamPath = []
      if(this.type === 0){
        streamPath = this.liveInfo.playStreams
      }else {
        streamPath = [{ streamPath: this.liveInfo.playStreamPath }];
      }
      return streamPath
    },
    type: function() {
      return (
        this.$route.params.type || JSON.parse(localStorage.getItem("type")).type
      );
    },
    isLive: function() {
      let isLive = false
      if(this.type === 0){
        isLive = (this.liveInfo.status===2)
      }else{
        isLive = !this.liveInfo.review
      }
      return isLive
    },
    rect: function() {
      if (this.type === 0) {
        return { width: "900px", height: "540px" };
      } else {
        return { width: "450px", height: "800px" };
      }
    },
    title(){
      return this.$route.params.title || JSON.parse(localStorage.getItem("type")).title
    },
    ctime(){
      return this.$route.params.ctime || JSON.parse(localStorage.getItem("type")).ctime
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.live-page-container {
  padding: 10px;
  border: 1px solid #efefef;
  margin: 5px;
  border-radius: 3px;
  position: relative;
  .pic-container {
    .flex-all-center();
    text-align: center;
    background-color: #000;
    overflow: hidden;
    position: relative;
    .live-cover {
      cursor: pointer;
      width: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .flex-all-center();
      .play-btn{
        cursor: pointer;
        position: absolute;
        opacity: 0;
        transition: all 0.1s ease-out;
        transform: scale(1);
        width: 54px;
        height: 54px;
        background-size: 100% 100%;
        background-image: url(https://sta-op.douyucdn.cn/front-publish/live-master/assets/images/icon-play_e4e7e68.webp);
      }
    }
    &:hover {
      box-shadow: 0 0 9px #333;
      .mask {
        .play-btn{
          opacity: 1;
          transform: scale(1.3);
        }
      }
    }
  }
  .info-container {
    .flex-all-center();
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    .live-info {
      .flex-all-center();
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      height: 80px;
      border: 1px solid #eee;
      margin-top: 5px;
      justify-content: space-between;
      .main-title {
        font-size: 15px;
        margin-right: 10px;
      }
      .sub-title {
        font-size: 18px;
      }
    }
  }
  .comment-info {
    .praise-count,
    .comment-count,
    .share-count {
      margin: 0 5px;
    }
  }
  a {
    .flex-all-center();
  }
}
</style>