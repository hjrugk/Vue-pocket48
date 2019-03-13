<template>
  <div class="video-container flex-justify-center" :style="{height:topHeight}" id="container" v-show="isReview">
    <div class="info-header flex-justify-center" v-show="!visibility" v-if="topHeight==='800px'">
      <div :style="{width: topwidth}">
        <div>
          <p @click="toggleTopList">贡献榜 <i class="el-icon-arrow-right"></i></p>
        </div>
        <span></span>
      </div>
    </div>
    <div class="top-container flex-justify-center" v-show="visibility" v-if="topHeight==='800px'">
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
    <div class="barrage-container flex-justify-center" v-if="topHeight==='800px'">
      <div class="barrage-list" :style="{width: topwidth}" v-if="barrageList.barrages[0]">
        <div class="barrage-item" v-for="(item, index) in barrages" :key="index">
          <p :class="{'sender-name': item.name}" v-html="item.name"></p>
          <p :class="{'sender-content': item.name}" v-html="item.content"></p>
        </div>
      </div>
    </div>
    <div class="live-pic flex-all-center" v-show="type === 2">
      <div :style="{width: topwidth,height:topHeight}">
        <el-carousel indicator-position="none" arrow="never" :height="topHeight">
          <el-carousel-item v-for="item in radiocover" class="flex-all-center" :key="item">
            <img :src="item | picPathFormat" alt @error="altImg(item)">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-if="showInfo" @click="showInfo = !showInfo">
      <popup-info :id="userId"></popup-info>
    </div>
    <div id="player">

    </div>
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
      barrageList: {
        barrages: [],
        times: []
      },
      barrages: [],
      topList: [],
      visibility: false,
      showInfo: false,
      userId: 0,
      player: null,
      video: null,
      playerOptions: {
        techOrder:['flash', 'html5'],
        sourceOrder:true,
        flash:{hls:{withCredentials:false}},
        html5:{hls:{withCredentials:false}},
        sources: [
          {
            withCredentials:false,
            type: '',
            src: ''
            }
        ],
        controls: false
      }
    }
  },
  props: ['path','type','topwidth',"radiocover","toplist","lrcpath",'topHeight'],
  methods: {
    playReview(){
      let type = typeCheck(this.path)
      if(type === 'flv'){
        return this.playFlv()
      }
      this.playerOptions.sources[0].type = type
      this.playerOptions.sources[0].src = this.path
      // eslint-disable-next-line
      this.player = videojs(this.id,this.playerOptions)
      this.player.on('loadeddata', () => {
        this.loadedDataHandler()
        this.player.dimensions(parseInt(this.topwidth),parseInt(this.topHeight))
      })
      this.player.on('error', () => {
        this.$message.error('无法播放')
      })
      this.player.on('timeupdate', () => {
        if(this.isReview && this.barrageList.times.length !==0){
          this.barrageHandler()
        }
      })
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
    },
    playFlv(){
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById(this.id);
        this.player = flvjs.createPlayer({
            type: 'flv',
            url: this.path
        });
        this.player.attachMediaElement(videoElement);
        this.player.load();
        videoElement.onloadeddata = () => {
          this.loadedDataHandler()
        }
        this.player.on('ERROR',() => {
          this.$message.error('无法播放')
        })
        videoElement.onerror = () => {
          this.$message.error('无法播放')
        }
        videoElement.ontimeupdate = () => {
          if(this.isReview && this.barrageList.times.length>0){
            this.barrageHandler()
          }
        }
      }
    },
    barrageHandler(){
      if(this.player.currentTime >= this.barrageList.times[0]){
        if(this.barrages.length===10){
          this.barrages.shift()
          this.barrages.push(this.barrageList.barrages[0])
        }else{
          this.barrages.push(this.barrageList.barrages[0])
        }
        this.barrageList.times.shift()
        this.barrageList.barrages.shift()
      }
    },
    loadedDataHandler(){
      document.querySelector('video').width = parseInt(this.topwidth)
      document.querySelector('video').height = parseInt(this.topHeight)
      document.querySelector('video').controls = true
      this.isReview = true
      this.topList = this.toplist
      this.player.play()
      this.loadBarrages()
    }
  },
  components: {
    popupInfo
  },
  mounted() {
    let video = document.createElement('video')
    video.id = this.id
    video.controls = true
    video.style.backgroundColor = '#000'
    document.getElementById('player').append(video)
  },
  computed: {
    id: function(){
      let id = Math.random().toString(36).substr(2)
      id = id.replace(/[0-9]/g,'')
      return id
    }
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
  color: white;
  &:hover{
    .player-control{
      visibility: visible;
    }
  }
  .player-control{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    visibility: hidden;
    z-index: 105;
    transition: all 0.3s ease;
    .control-content{
      background-color: #000;
      color: #fff;
      display: flex;
      justify-content: space-between;
      span{
        width: 120px;
      }
      .fullscreen{
        width: 60px;
        cursor: pointer;
      }
      .progress{
        background-color: #666;
        width: 100%;
        height: 10px;
        #progress-bar{
          background-color: #fff;
          width: 0px;
          height: 10px;
          position: relative;
          #progress-dot{
            background-color: #fff;
            box-shadow: 0px 0px 2px #000;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: absolute;
            top: -5px;
          }
        }
      }
    }
  }
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

