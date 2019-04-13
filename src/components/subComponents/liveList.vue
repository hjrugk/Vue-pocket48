<template>
  <div class="live-list">
    <div class="live-header">
      <p class="live-type" v-html="livetitle"></p>
      <p class="live-more" @click="goToAllLive" v-show="$route.path ==='/home'">
        查看更多
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>
    <transition-group appear tag="div" class="list-container">
      <a
        href="javascript:;"
        @click.prevent="getLivePage(item.liveId,item.title)"
        v-for="item in list"
        :key="item.liveId"
        class="live-item"
        target="_blank"
      >
        <div class="pic-container">
          <img :src="item.picPath | picPathFormat" alt class="live-pic">
          <div class="mask"></div>
          <div class="live-title" v-html="item.title"></div>
        </div>
        <div class="live-info">
          <p :title="item.subTitle" v-html="item.subTitle" class="live-url"></p>
          <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
        </div>
      </a>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "liveItem",
  data() {
    return {
      isLive: false
    };
  },
  methods: {
    getLivePage(id,title) { // 跳转到直播页面
      if(!title.includes('回放生成中')){
        this.isLive = true
      }
      localStorage.setItem('type',JSON.stringify({type: this.type,isLive: this.isLive}))
      let url = this.$router.resolve({name:'livepage',params:{id,type: this.type,isLive: this.isLive}})
      window.open(url.href,'_blank')
    },
    goToAllLive(){ // 跳转到直播详细列表页
      if(this.type===1){
        this.$router.push('/home/memberlive/0')
      }else if(this.type===0){
        this.$router.push('/home/openlive/0')
      }
    }
  },
  props: ["list", "rect","type","livetitle"]
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.live-list{
  width: 100%;
  .live-header{
    .flex-align-center();
    margin: 0 auto;
    width: 85%;
    justify-content: space-between;
    .live-type{
      margin-left: 10px;
      font-weight: 500;
      font-size: 20px;
    }
    .live-more{
      margin-right: 20px;
      margin-bottom: 5px;
      cursor: pointer;
      color: #333;
      font-size: 14px;
      &:hover{
        color: #666;
      }
    }
  }
  .list-container{
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    width: 85%;
    padding: 10px;
    .live-item {
      padding: 5px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      .pic-container {
        .flex-align-center();
        // max-width: 240px;
        max-height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 3px #666;
        &:hover {
          box-shadow: 0 0 9px #333;
          .mask{
            visibility: visible;
          }
        }
        .live-title{
          font-size: 12px;
          position: absolute;
          bottom: 0;
          color: #fff;
          padding-left: 10px;
          margin-bottom: 10px;
        }
        .live-pic {
          width: 100%;
        }
        .mask{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.3);
          visibility: hidden;
        }
      }
      .live-info{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        width: 90%;
        .live-url{
          height: 15px;
          overflow: hidden;
        }
      }
    }
  }
  @media screen  and (max-width: 900px) {
    .list-container{
      width: 90%;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen  and (min-width: 1368px) {
    .list-container,.live-header{
      width: 1160px;
    }
  }
  @media screen  and (max-width: 610px) {
    .list-container{
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>