<template>
  <div class="live-page-container my-card">
    <div class="info-container">
      <div class="live-info" :style="{width: rect.width}" v-if="liveInfo.picPath">
        <div class="live-title">
          <span v-html="liveInfo.subTitle" class="sub-title"></span><br>
          <span v-html="liveInfo.title" class="main-title"></span>
        </div>
        <div v-html="new Date(liveInfo.startTime).toLocaleDateString()" class="live-time"></div>
        <div class="comment-info" v-if="type===0">
          <i class="el-icon-view"></i>
          <span class="praise-count" v-html="count.praise"></span>
          <i class="el-icon-edit-outline"></i>
          <span class="comment-count" v-html="count.comment"></span>
          <i class="el-icon-share"></i>
          <span class="share-count" v-html="count.share"></span>
        </div>
      </div>
    </div>
    <a href="javascript:;" v-if="type===1 && picPath">
      <div class="pic-container" @click="triggerMethod" :style="rect">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <a href="javascript:;" v-if="type===0 && picPath">
      <div class="pic-container" @click="triggerMethod" :style="rect">
        <img width="100%" :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <video-control 
      :path="livePath" 
      :type="liveInfo.liveType" 
      :topwidth="topWidth"
      :topHeight="topHeight"
      :radiocover="radioCover"
      ref="vod"
      :toplist="liveInfo.topList"
      :lrcpath="liveInfo.lrcPath"
      :isLive="isLive"
      v-if="liveInfo.picPath"></video-control>
  </div>
</template>

<script>
import videoControl from '../subComponents/videoControl'
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
      topWidth: '',
      topHeight: ''
    };
  },
  methods: {
    async getLive() { // 获取直播信息
      const res = await this.ajax('/getLivePage',{type:this.type,id:this.id})
      this.liveInfo = res.content;
      let Title = document.getElementsByTagName('title')[0]
      Title.innerText = this.liveInfo.subTitle + '--' + this.liveInfo.title
      if(this.type===0){ // 公演
        this.count.praise = res.content.count.praiseCount
        this.count.comment = res.content.count.commentCount
        this.count.share = res.content.count.shareCount
      }
      if(res.content.liveType === 2){ // 电台
        let path = res.content.picPath
        if(path.includes(',')){
          this.radioCover = path.split(',')
        }else{
          this.radioCover = path
        }
      }
      this.picPath = res.content.picPath || '/';
    },
    altImg() {
      this.picPath = "/";
    },
    triggerMethod(){ // 公演与成员直播设置不同的视频高宽
      this.topWidth = this.rect.width
      this.topHeight = this.rect.height
      this.$refs.vod.playReview()
    }
  },
  created() {
    this.getLive();
  },
  components: {
    videoControl
  },
  computed: {
    livePath: function () { // 返回各清晰度视频地址
      if(this.type===0){
        return this.liveInfo.streams
      }else{
        return [{streamPath:this.liveInfo.streamPath}]
      }
    },
    type: function(){
      return this.$route.params.type || JSON.parse(localStorage.getItem('type')).type
    },
    isLive: function(){
      return JSON.parse(localStorage.getItem('type')).isLive
    },
    rect: function() {
      if(this.type === 0){
        return {width: '900px',height: '540px'}
      }else{
        return {width: '450px',height: '800px'}
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.live-page-container {
  padding: 10px;
  border: 1px solid #efefef;
  margin: 5px;
  border-radius: 3px;
  position: relative;
  .pic-container{
    .flex-all-center();
    text-align: center;
    background-color: #000;
    .live-cover {
      cursor: pointer;
      width: 100%;
    }
  }
  .info-container{
    .flex-all-center();
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
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
    .praise-count,.comment-count,.share-count {
      margin-right: 10px;
      margin-left: 2px;
    }
  }
  a{
    .flex-all-center();
  }
}
</style>