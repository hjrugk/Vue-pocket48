<template>
  <div class="home">
    <el-carousel trigger="click" height="350px" v-if="adsList[0]">
      <el-carousel-item v-for="(item,index) in adsList" :key="index">
        <a :href="item.url" target="_blank">
          <div :style="'background-image: url(\''+'http://www.snh48.com/'+item.img+'\')'"></div>
          <div class="mask"></div>
        </a>
      </el-carousel-item>
    </el-carousel>
    <div class="alt_bg" v-else></div>
    <div class="home-nav">
      <group-info></group-info>
    </div>
    <div class="live-wrapper">
      <live-list 
        :type="1" :list="memberList" 
        :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
        :livetitle="'成员直播'"
        v-if="memberList[0]"
        ></live-list>
      <div v-else class="alt_bg"></div>
    </div>
    <div class="live-wrapper">
      <live-list 
        :type="0" :list="openList" 
        :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
        :livetitle="'公演直播'"
        v-if="openList[0]"
        ></live-list>
      <div v-else class="alt_bg"></div>
    </div>
  </div>
</template>

<script>
import liveList from '../components/subComponents/liveItem'
import groupInfo from '../components/infomation/groupinfo'
export default {
  data() {
    return {
      memberList: [],
      openList: [],
      adsList: []
    };
  },
  methods: {
    getMemberLive() { // 获取首页显示的成员直播列表
      this.axios.get("/api/getAllLive?limit=8&id=0").then(res => {
        let liveList = res.data.content.liveList;
        let reviewList = res.data.content.reviewList;
        let list = [...liveList,...reviewList]
        if(list.length>8){
          list.splice(8)
        }
        this.memberList = list
      });
    },
    getOpenLive() { // 获取首页显示的公演直播列表
      this.axios.get("/api/getOpenLive?isReview=1").then(res => {
        this.openList = res.data.content.liveList;
      });
    },
    getSwipeAds(){ // 从官网获取轮播图
      this.axios.get('/api/getForSwipeAds')
        .then(res => {
          // console.log(res)
          let one = res.data.split('" </div>");')[0]
          let two = one.split('+')
          let list = [
            {url:two[3],img:two[4]},
            {url:two[8],img:two[9]},
            {url:two[13],img:two[14]},
            {url:two[18],img:two[19]},
            {url:two[23],img:two[24]},
            {url:two[28],img:two[29]}]
          // console.log(list)
          list.map(item => {
            this.adsList.push(
              {
                url: 'http'+item.url.split('http')[1].split('target')[0].split('\\')[0],
                img:item.img.split("\\")[1].replace('"','')
              }
              )
          })
          // let list = res.data.ad
          // this.adsList = list
        })
    }
  },
  components: {
    liveList,
    groupInfo
  },
  mounted() {
    this.getMemberLive()
    this.getOpenLive()
    this.getSwipeAds()
  }
};
</script>
<style lang="less" scoped>
.home{
  .alt_bg{
    height: 350px;
    background-color: #fff;
    width: 100%;
  }
  .el-carousel{
    width: 100%;
    text-align: center;
    .el-carousel__container{
      .el-carousel__item{
        display: flex;
        justify-content: center;
        a{
          width: 85%;
          display: block;
          position: relative;
          &:hover{
            .mask{
              visibility: visible;
            }
          }
          div{
            height: 350px;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
          .mask{
            background-color: rgba(0,0,0,0.2);
            visibility: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
        }
        @media screen and (max-width: 768px) {
          a{
            width: 100%;
          }
        }
      }
    }
  }
  .home-nav{
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    .nav-menu{
      width: 85%;
      display: flex;
      justify-content: center;
      .nav-item{
        flex: 1;
        height: 60px;
        cursor: pointer;
      }
    }
  }
  .live-wrapper{
    background-color: #fff;
    .alt_bg{
      height: 550px;
    }
  }
}
</style>

