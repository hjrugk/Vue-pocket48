<template>
  <div class="live-list">
    <div class="live-header flex-align-center">
      <p class="live-type" v-html="livetitle"></p>
      <p class="live-more" @click="goToAllLive" v-show="$route.path ==='/home'">
        查看更多
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>
    <transition-group appear tag="div">
      <a
        href="javascript:;"
        @click.prevent="getLivePage(item.liveId)"
        v-for="item in list"
        :key="item.liveId"
        class="live-item"
        :style="{minWidth: rect.width,maxWidth: rect.maxWidth}"
        target="_blank"
      >
        <div class="pic-container flex-align-center" :style="{height:rect.height}">
          <img :src="item.picPath | picPathFormat" alt class="live-pic">
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
    return {};
  },
  methods: {
    getLivePage(id) {
      this.$router.push({name:'livepage',params:{id,type: this.type}})
    },
    goToAllLive(){
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
.live-list{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .live-header{
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
  div{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 85%;
    margin-bottom: 10px;
    .live-item {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0 5px 10px 0px;
      padding: 5px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      &:hover{
        background-color: #efefef;
        border-radius: 5px;
      }
      .pic-container {
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 3px #666;
        &:hover {
          box-shadow: 0 0 9px #333;
        }
        .live-title{
          font-size: 12px;
          position: absolute;
          bottom: 0;
          color: #fff;
          padding-left: 10px;
        }
        .live-pic {
          width: 100%;
        }
      }
      .live-info{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>