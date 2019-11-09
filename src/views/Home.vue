<template>
  <div class="home">
    <div class="ads-container">
      <div class="ads-list" v-if="adsList[0]">
        <el-carousel trigger="click" height="400px" type="card" class="show-card" indicator-position="none">
          <el-carousel-item v-for="(item,index) in adsList" :key="index">
            <a :href="item.url" target="_blank" class="carousel-link">
              <div class="img-item" :style="'background-image: url(\''+'http://www.snh48.com/mobile/'+item.img+'\');background-size: 666px 400px;'"></div>
              <div class="mask"></div>
            </a>
          </el-carousel-item>
        </el-carousel>
        <el-carousel trigger="click" height="400px" class="hide-card" indicator-position="none">
          <el-carousel-item v-for="(item,index) in adsList" :key="index">
            <a :href="item.url" target="_blank" class="carousel-link">
              <div class="img-item" :style="'background-image: url(\''+'http://www.snh48.com/mobile/'+item.img+'\');background-size: 666px 400px;'"></div>
              <div class="mask"></div>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <alt-loading v-else></alt-loading>
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
      <alt-loading v-else></alt-loading>
    </div>
    <div class="live-wrapper">
      <live-list
        :type="0" :list="openLiveList.slice(0,8)"
        :rect="{width:'240px',height:'150px',maxWidth: '360px'}" 
        :livetitle="'公演直播'"
      v-if="openLiveList[0]"></live-list>
      <alt-loading v-else></alt-loading>
    </div>
    <About />
  </div>
</template>

<script>
import liveList from '@/components/live/subCons/liveList'
import altLoading from '@/components/common/altLoading'
// import akinaList from '../components/subComponents/akinaList'
import About from './About'
import groupInfo from '@/components/infomation/groupinfo'
import {mapState,mapGetters} from 'vuex'
export default {
  data() {
    return {
    };
  },
  components: {
    liveList,
    About,
    groupInfo,
    altLoading
    // akinaList
  },
  computed: {
    ...mapState(['adsList','openLiveList']),
    ...mapGetters(['memberAllLiveList'])
  }
};
</script>
<style lang="less" scoped>
.home{
  .ads-container{
    display: flex;
    justify-content: center;
    .ads-list{
      height: 400px;
      width: 100%;
    }
  }
  .el-carousel{
    width: 100%;
    text-align: center;
    z-index: 999;
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
          width: 100%!important;
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
  .home-nav{
    width: 100%;
  }
  @media screen and (max-width: 1440px) {
    .show-card{
      display: none;
    }
  }
  @media screen and (min-width: 1440px) {
    .hide-card{
      display: none;
    }
  }
}
</style>

