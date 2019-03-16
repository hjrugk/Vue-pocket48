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
    <div class="live-pic flex-all-center" v-if="type === 2">
      <div :style="{width: topwidth}">
        <el-carousel indicator-position="none" arrow="never" :height="'700px'">
          <el-carousel-item v-for="item in radiocover" class="flex-all-center" :key="item">
            <img :src="item | picPathFormat" alt @error="altImg(item)">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-if="showInfo" @click="showInfo = !showInfo">
      <popup-info style="color:#000;" :id="userId"></popup-info>
    </div>
    <div id="player" :style="{width: topwidth,height: topHeight}">
      
    </div>
  </div>
</template>
<script>
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
      playerOptions: {
        id: 'ali-video',
        width: '100%',
        height: '100%',
        autoplay: true,
        source: this.path,
        isLive: this.isLive,
        defaultDefinition: 'LD',
        preload: true
      },
      originBarrageList: {
        barrages: [],
        times: []
      }
    }
  },
  props: ['path','type','topwidth',"radiocover","toplist","lrcpath",'topHeight','isLive'],
  methods: {
    playReview(){ // 点击直播封面时开始播放
      if(this.type===0 && this.isLive === true) return this.$message.error('直播还未开始')
      // eslint-disable-next-line
      this.player = new Aliplayer(this.playerOptions)
      this.player.on('ready', () => {
        this.loadedDataHandler()
      })
      this.player.on('error', () => {
        this.$message.error('无法播放')
        this.player = null
      })
      this.player.on('timeupdate', () => {
        if(this.isReview && this.barrageList.times.length !==0){
          this.barrageHandler()
        }
      })
      this.player.on('completeSeek',() => { // 回看时的加载弹幕逻辑
        if(this.barrageList.times[0]){
          this.barrageList = JSON.parse(JSON.stringify(this.originBarrageList))
          let index = this.barrageList.times.findIndex(item => {
            return parseInt(item)>=this.player.getCurrentTime()
          })
          this.barrageList.barrages = this.barrageList.barrages.slice(index,this.barrageList.barrages.length-1)
          this.barrageList.times = this.barrageList.times.slice(index,this.barrageList.times.length-1)
          this.barrages = []
          this.barrageHandler()
        }
      })
    },
    loadBarrages(){ // 载入弹幕列表
      this.axios.post('/api/getBarrages',{url:this.lrcpath})
        .then(res => {
          this.barrageList = res.data
          this.originBarrageList = JSON.parse(JSON.stringify(res.data))
        })
    },
    toggleTopList(){ // 开/关显示贡献榜
      this.visibility = !this.visibility
    },
    getUserInfo(id){ // 获取聚聚信息，弹窗呈现
      this.userId = id
      this.showInfo = true
    },
    barrageHandler(){ // 将获取到的弹幕列表渲染到页面中
      if(this.player.getCurrentTime() >= this.barrageList.times[0]){
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
    loadedDataHandler(){ // 显示视频，并播放，加载弹幕
      this.isReview = true
      this.topList = this.toplist
      this.player.play()
      this.loadBarrages()
    }
  },
  components: {
    popupInfo
  },
  mounted(){
    this.player = null
    document.getElementById('player').innerHTML = ''
    let video = document.createElement('video')
    video.id = 'ali-video'
    document.getElementById('player').append(video)
  },
  beforeDestroy() {
    this.player = null 
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
  .live-pic{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    div{
      img{
        z-index: 98;
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
    text-align: center;
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
    bottom: 150px;
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

