<template>
  <div class="video-container" :style="{height:topHeight}" id="container" v-show="isReview">
    <div class="info-header" v-show="!visibility" v-if="topHeight==='800px'">
      <div :style="{width: topwidth}">
        <div>
          <p @click="toggleTopList">
            贡献榜
            <i class="el-icon-arrow-right"></i>
          </p>
        </div>
        <span></span>
      </div>
    </div>
    <top-list
      :topHeight="topHeight"
      :topWidth="topwidth"
      v-show="visibility"
      :topList="topList"
      @getuserinfo="getUserInfo"
      @togglevisibility="toggleTopList"
    ></top-list>
    <Barrages
      :topWidth="topwidth"
      :barrages="barrages"
      v-show="topHeight==='800px'"
      v-if="barrageList.barrages[0]"
    />
    <radio-cover :carouselTime="carouselTime" :type="type" :topWidth="topwidth" :radiocover="radiocover"></radio-cover>
    <div v-if="showInfo" @click="showInfo = !showInfo">
      <popup-info :info="userInfo" style="color:#000;"></popup-info>
    </div>
    <div id="player" :style="{width: topwidth,height: topHeight}">
      <div id="ali-video"></div>
    </div>
  </div>
</template>
<script>
import radioCover from "./radioCover";
import topList from "./topList";
import popupInfo from "@/components/common/popupInfo";
import Barrages from "./barrages";
export default {
  name: "videoControl",
  data() {
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
      userInfo: {},
      player: {},
      playerOptions: {
        id: "ali-video",
        width: "100%",
        height: "100%",
        source: "",
        autoplay: true,
        enableStashBufferForFlv: false
      },
      originBarrageList: {
        barrages: [],
        times: []
      },
      streamsIndex: 0
    };
  },
  props: [
    "path",
    "type",
    "topwidth",
    "radiocover",
    "toplist",
    "lrcpath",
    "topHeight",
    "isLive",
    "carouselTime"
  ],
  methods: {
    playReview() {
      // 点击直播封面时开始播放
      this.player = {};
      let tmp = Date.now()
      let stime = JSON.parse(localStorage.getItem('type')).ctime
      if(tmp < parseInt(stime)) return this.$message.error('直播还未开始')
      this.playerOptions.source = this.path[0].streamPath;
      if(this.playerOptions.source.includes('rtmp')){
        // return this.$message.error('暂不支持rtmp流直播')
        this.playerOptions.useFlashPrism = true
      }
      this.playerOptions.isLive = this.isLive;
      // eslint-disable-next-line
      this.player = new Aliplayer(this.playerOptions);
      if(this.isLive) {
        this.loadedDataHandler();
      }
      // if(this.live && !this.radiocover) {
      // }
      this.player.on("ready", () => {
        this.loadedDataHandler();
      });
      this.player.on("error", () => {
        this.$message.error("无法播放");
      });
      this.player.on("timeupdate", () => {
        if (this.isReview && this.barrageList.times.length !== 0) {
          this.barrageHandler();
        }
      });
      this.player.on("completeSeek", () => {
        // 回看时的加载弹幕逻辑
        if (this.barrageList.times[0]) {
          this.barrageList = JSON.parse(JSON.stringify(this.originBarrageList));
          let index = this.barrageList.times.findIndex(item => {
            return parseInt(item) >= this.player.getCurrentTime();
          });
          this.barrageList.barrages = this.barrageList.barrages.slice(
            index,
            this.barrageList.barrages.length - 1
          );
          this.barrageList.times = this.barrageList.times.slice(
            index,
            this.barrageList.times.length - 1
          );
          this.barrages = [];
          this.barrageHandler();
        } else {
          return;
        }
      });
    },
    async loadBarrages() {
      // 载入弹幕列表
      // if (!this.lrcpath) return;
      const res = await this.ajax(
        "/getBarrages",
        { url: this.lrcpath },
        "POST"
      );
      this.barrageList = res;
      this.originBarrageList = JSON.parse(JSON.stringify(res));
    },
    toggleTopList() {
      // 开/关显示贡献榜
      this.visibility = !this.visibility;
    },
    getUserInfo(info) {
      // 获取聚聚信息，弹窗呈现
      this.userInfo = info;
      this.showInfo = true;
    },
    barrageHandler() {
      // 将获取到的弹幕列表渲染到页面中
      if (this.player.getCurrentTime() >= this.barrageList.times[0]) {
        if (this.barrages.length === 10) {
          this.barrages.shift();
          this.barrages.push(this.barrageList.barrages[0]);
        } else {
          this.barrages.push(this.barrageList.barrages[0]);
        }
        this.barrageList.times.shift();
        this.barrageList.barrages.shift();
      }
    },
    loadedDataHandler() {
      // 显示视频，并播放，加载弹幕
      this.isReview = true;
      this.topList = this.toplist;
      if (this.player.play()) {
        this.player.play();
      }
      this.loadBarrages();
    }
  },
  components: {
    popupInfo,
    topList,
    radioCover,
    Barrages
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/global.less";
.video-container {
  padding: 10px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  .flex-justify-center();
  .info-header {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 100%;
    z-index: 99;
    .flex-justify-center();
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 5px 20px;
        font-size: 13px;
        border-radius: 15px;
        margin-left: 5px;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
  video {
    height: 100%;
  }
}
.hidden {
  visibility: hidden;
}
</style>

