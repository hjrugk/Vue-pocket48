<template>
  <div class="open-live-container">
    <h2>公演直播</h2>
    <div class="open-live-list">
      <p v-if="!liveList[0]" class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
      <transition-group>
        <a @click.prevent="getOneLive(item.liveId)" class="open-live-item my-card" v-for="item in liveList" :key="item.liveId">
          <div class="pic-container flex-all-center">
            <img :src="item.picPath | picPathFormat" alt="" class="live-cover">
          </div>
          <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
          <p class="live-title" v-html="item.title"></p>
          <p v-html="item.subTitle" class="live-url"></p>
        </a>
      </transition-group>
    </div>
    <h2>公演录播</h2>
    <div class="open-live-list">
      <p v-if="!reviewList[0]" class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
      <transition-group>
        <a @click.prevent="getOneLive(item.liveId)" class="open-live-item my-card" v-for="item in reviewList" :key="item.liveId">
          <div class="pic-container flex-all-center">
            <img :src="item.picPath | picPathFormat" alt="" class="live-cover">
          </div>
          <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
          <p class="live-title" v-html="item.title"></p>
          <p v-html="item.subTitle" class="live-url"></p>
        </a>
      </transition-group>
    </div>
    <div class="button-container flex-all-center" @click="getMoreLive">
      <i class="el-icon-arrow-down" v-if="reviewList[0]"></i>
      <!--<el-button type="primary" v-if="reviewList[0]">加载更多</el-button>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "openlive",
    data() {
      return {
        liveList: [],
        limit: 8,
        reviewList: []
      }
    },
    methods: {
      getOpenLive(){
        this.axios.get('/api/getOpenLive')
          .then(res => {
            this.liveList = res.data.content.liveList
          })
      },
      getMoreLive() {
        this.limit += 8
        this.axios.get('/api/getOpenLive?isReview=1&limit=' + this.limit)
          .then(res => {
            this.reviewList = res.data.content.liveList
          })
      },
      getOneLive(id){
        this.$router.push({name: 'livepage',params: {id,type:0}})
      },
      getReviewLive(){
        this.axios.get('/api/getOpenLive?isReview=1')
          .then(res => {
            this.reviewList = res.data.content.liveList
          })
      }
    },
    created() {
      this.getOpenLive()
      this.getReviewLive()
    }
  }
</script>

<style lang="less" scoped>
.open-live-container{
  padding: 10px;
  .open-live-list>span{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .open-live-item{
      display: block;
      margin: 0 5px 10px 5px;
      padding: 7px;
      text-decoration: none;
      color: #000;
      max-width: 400px;
      cursor: pointer;
      &:hover{
        background-color: #efefef;
      }
      .pic-container{
        height: 230px;
        .live-cover{
          width: 100%;
        }
      }
      .live-time{
         font-size: 14px;
       }
      .live-title{
        font-size: 14px;
      }
      .live-url{
        font-size: 14px;
      }

    }
  }
  .button-container{
    margin-top: 10px;
    height: 40px;
    .el-icon-arrow-down{
      font-size: 25px;
    }
    &:hover{
      cursor: pointer;
      background-color: #ccc;
    }
  }
}
</style>