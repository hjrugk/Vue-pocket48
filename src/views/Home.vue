<template>
  <div class="home">
    <el-carousel trigger="click" height="350px" v-if="adsList[0]">
      <el-carousel-item v-for="(item,index) in adsList" :key="index">
        <a :href="item.url" target="_blank" class="carousel-link">
          <div class="img-item" :style="'background-image: url(\''+'http://www.snh48.com/'+item.img+'\')'"></div>
          <div class="mask"></div>
        </a>
      </el-carousel-item>
    </el-carousel>
    <div class="alt_bg" v-else>
      <img class="alt-img" src="../assets/images/loading.gif" alt="">
    </div>
    <div class="home-nav">
      <group-info></group-info>
    </div>
    <div class="live-wrapper">
      <live-list 
        :type="1" :list="memberAllLiveList.slice(0,8)" 
        :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
        :livetitle="'成员直播'"
        v-if="memberAllLiveList[0]"
        ></live-list>
      <div v-else class="alt_bg">
        <img src="../assets/images/loading.gif" alt="">
      </div>
    </div>
    <div class="live-wrapper">
      <live-list
        :type="0" :list="akinaVideos.slice(0,8)"
        :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
        :livetitle="'公演直播'"
      v-if="akinaVideos[0]"></live-list>
      <div v-else class="alt_bg">
        <img src="../assets/images/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import liveList from '../components/subComponents/liveList'
// import akinaList from '../components/subComponents/akinaList'
import groupInfo from '../components/infomation/groupinfo'
import {mapState,mapGetters} from 'vuex'
export default {
  data() {
    return {
    };
  },
  components: {
    liveList,
    groupInfo,
    // akinaList
  },
  computed: {
    ...mapState(['adsList','akinaVideos']),
    ...mapGetters(['memberAllLiveList'])
  }
};
</script>
<style lang="less" scoped>
.home{
  .alt_bg{
    height: 350px;
    background-color: #fff;
    width: 100%;
    text-align: center;
    overflow: hidden;
    .alt-img{
      height: 350px;
    }
  }
  .el-carousel{
    width: 100%;
    text-align: center;
    .el-carousel__container{
      .el-carousel__item{
        display: flex;
        justify-content: center;
        .carousel-link{
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          &:hover{
            .mask{
              visibility: visible;
            }
          }
          .img-item{
            width: 85%;
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
      }
    }
    @media screen and (max-width: 768px){
      .el-carousel__item{
        .img-item{
          width: 100%;
        }
      }
    }
    @media screen and (min-width: 1368px){
      .el-carousel__item{
        .img-item{
          width: 1170px!important;
        }
      }
    }
  }
  .live-wrapper{
    .alt_bg{
      height: 550px;
    }
  }
}
</style>

