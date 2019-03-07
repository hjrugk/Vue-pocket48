<template>
  <div class="video-container flex-justify-center" v-show="isReview">
    <div class="info-header flex-justify-center" v-show="!visibility">
      <div :style="{width: topwidth}">
        <div>
          <p @click="toggleTopList">贡献榜 <i class="el-icon-arrow-right"></i></p>
        </div>
        <span></span>
      </div>
    </div>
    <div class="top-container flex-justify-center" v-show="visibility">
      <div class="top-list" :style="{width: topwidth}">
        <div class="header">
          <span></span>
          <h3>贡献榜</h3>
          <span class="close" @click="toggleTopList">&times;</span>
        </div>
        <div class="top-item" :class="{' flex-all-center':index!==0}" v-for="(item, index) in toplist" :key="index">
          <span :class="{'flex-align-center':index!==0,isTheTop:index===0}">
            <span class="top-avatar">
              <img @click="getUserInfo(item.userId)" :src="item.userAvatar | picPathFormat" alt="" width="40" height="40">
            </span><br>
            <span class="top-name" v-html="item.userName"></span>
          </span><br>
          <span class="top-money" v-html="'贡献度：'+item.money"></span>
        </div>
      </div>
    </div>
    <div class="barrage-container flex-justify-center">
      <div class="barrage-list" :style="{width: topwidth}">
        <div class="barrage-item" v-for="(item, index) in barrages" :key="index">
          <p :class="{'sender-name': item.name}" v-html="item.name"></p>
          <p :class="{'sender-content': item.name}" v-html="item.content"></p>
        </div>
      </div>
    </div>
    <div class="live-pic flex-all-center" v-show="type === 2">
      <div :style="{width: topwidth}">
        <el-carousel indicator-position="none" arrow="never" height="800px">
          <el-carousel-item v-for="item in radiocover" class="flex-all-center" :key="item">
            <img :src="item | picPathFormat" alt @error="altImg(item)">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-if="showInfo" @click="showInfo = !showInfo">
      <popup-info :id="userId"></popup-info>
    </div>
    <video src="" controls ref="video" id="review-video" width="450" height="800"></video>
  </div>
</template>
<script>
import flvjs from 'flv.js'
import typeCheck from '../../plugins/typeCheck'
import popupInfo from './popupInfo'
export default {
  name: 'videoControl',
  data(){
    return {
      isReview: false,
      barrageList: {},
      barrages: [],
      topList: [],
      visibility: false,
      showInfo: false,
      userId: 0
    }
  },
  props: ['path','type','topwidth',"radiocover","toplist","lrcpath"],
  methods: {
    playReview(){
      let type = typeCheck(this.path)
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById('review-video');
        const player = flvjs.createPlayer({
            type,
            url: this.path
        });
        player.attachMediaElement(videoElement);
        player.load();
        this.$refs.video.onloadeddata = () => {
          this.isReview = true
          this.topList = this.toplist
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
              if(this.barrages.length===10){
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
      this.axios.post('/api/getBarrages',{url:this.lrcpath})
        .then(res => {
          this.barrageList = res.data
        })
    },
    toggleTopList(){
      this.visibility = !this.visibility
    },
    getUserInfo(id){
      this.userId = id
      this.showInfo = true
    }
  },
  components: {
    popupInfo
  }
}
</script>
<style lang="less" scoped>
.video-container{
  padding: 10px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  color: white;
  .live-pic{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    div{
      z-index: 0;
      img{
        z-index: 90;
        width: 100%;
      }
    }
  }
  .info-header{
    position: absolute;
    top: 5px;
    left: 5px;
    width: 100%;
    z-index: 99;
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        background-color: rgba(0,0,0,0.3);
        padding: 5px 20px;
        font-size: 13px;
        border-radius: 15px;
        margin-left: 5px;
        margin-top: 20px;
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
      box-sizing: border-box;
      animation: enter 0.5s ease;
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
        .isTheTop{
          img{
            width: 50px;
            height: 50px;
            text-align: center;
          }
          span{
            line-height: 1.5;
          }
        }
        .top-avatar img{
          border-radius: 50%;
          padding-right: 10px;
          cursor: pointer;
        }
        .top-name{
          max-width: 150px;
          padding-right: 10px;
        }
        .top-money{
          font-size: 13px;
          color: #ddd;
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
      z-index: 95;
      height: 180px;
      overflow: scroll;
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
.hidden{
  visibility: hidden;
}
@keyframes enter {
  0% {height: 0}
  100% {height: 800px}
}
</style>

