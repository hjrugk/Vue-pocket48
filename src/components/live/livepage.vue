<template>
  <div class="live-page-container my-card">
    <a class="flex-all-center" href="javascript:;" v-if="type===1">
      <div class="pic-container flex-all-center" @click="playReview" ismember :style="{width: topWidth}">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <a class="flex-all-center" href="javascript:;" v-if="type===0">
      <div class="pic-container flex-all-center">
        <img :src="picPath | picPathFormat" @error="altImg" alt class="live-cover" v-show="picPath">
      </div>
    </a>
    <div class="video-container flex-justify-center" v-if="type===1" v-show="isReview" :class="{hidden:liveInfo.liveType===2}">
      <div class="info-header flex-justify-center" v-show="!visibility">
        <div :style="{width: topWidth}">
          <div>
            <p @click="toggleTopList">贡献榜</p>
          </div>
          <span></span>
        </div>
      </div>
      <div class="top-container flex-justify-center" v-show="visibility">
        <div class="top-list" :style="{width: topWidth}">
          <div class="header">
            <span></span>
            <h3>贡献榜</h3>
            <span class="close" @click="toggleTopList">&times;</span>
          </div>
          <div class="top-item flex-all-center" v-for="(item, index) in topList" :key="index">
            <span class="flex-align-center">
              <span class="top-avatar">
                <img :src="item.userAvatar | picPathFormat" alt="" width="40" height="40">
              </span>
              <span class="top-name" v-html="item.userName"></span><br>
            </span>
            <span class="top-money" v-html="'贡献度：'+item.money"></span>
          </div>
        </div>
      </div>
      <div class="barrage-container flex-justify-center">
        <div class="barrage-list" :style="{width: topWidth}">
          <div class="barrage-item" v-for="(item, index) in barrages" :key="index">
            <p :class="{'sender-name': item.name}" v-html="item.name"></p>
            <p :class="{'sender-content': item.name}" v-html="item.content"></p>
          </div>
        </div>
      </div>
      <video src="" controls ref="video" id="review-video" width="450" height="800"></video>
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
      barrages: [],
      topList: [],
      visibility: false,
      topWidth: '450px'
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
          this.topList = this.liveInfo.topList
          player.play()
          this.loadBarrages()
        }
        player.on('ERROR',() => {
          this.$message.error('无法播放')
        })
        this.$refs.video.onerror = () => {
          this.$message.error('无法播放')
        }
        this.$refs.video.ontimeupdate = () => {
          if(this.isReview){
            if(player.currentTime >= this.barrageList.times[0]){
              if(this.barrages.length===3){
                this.barrages.shift()
                this.barrages.push(this.barrageList.barrages[0])
              }else{
                this.barrages.push(this.barrageList.barrages[0])
              }
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
    },
    toggleTopList(){
      this.visibility = !this.visibility
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
    color: white;
    .info-header{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          background-color: rgba(0,0,0,0.3);
          padding: 5px;
          border-radius: 5px;
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
    .top-container{
      padding: 10px 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      .top-list{
        height: 800px;
        background-color: rgba(0,0,0,0.6);
        overflow: scroll;
        padding-bottom: 10px;
        box-sizing: border-box;
        .header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          h3{
            display: inline-block;
            margin-right: -40px;
          }
          .close{
            font-size: 25px;
            margin-right: 20px;
            box-sizing: border-box;
            cursor: pointer;
          }
        }
        .top-item{
          margin-bottom: 20px;
          justify-content: space-between;
          padding: 15px;
          .top-avatar>img{
            border-radius: 50%;
            padding-right: 10px;
          }
          .top-name{
            max-width: 150px;
            padding-right: 10px;
          }
        }
      }
    }
    .barrage-container{
      width: 100%;
      height: 100px;
      position: absolute;
      bottom: 120px;
      left: 0;
      .barrage-list{
        padding-left: 10px;
        .sender-name,.sender-content{
          width: 150px;
          background-color: rgba(255,255,255,0.7);
          padding: 5px;
          font-size: 12px;
          margin: 2px 0 0 0;
          border-radius: 3px;
        }
        .sender-name{ 
          color: blue
        }
        .sender-content{
          color: #000;
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
  .hidden{
    visibility: hidden;
  }
}
</style>