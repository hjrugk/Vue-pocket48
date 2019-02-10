<template>
  <div class="live-container">
    <h2 class="title">直播</h2>
    <p v-if="!liveList[0]" class="instead-info">当前没有直播</p>
    <div class="live-list">
      <a @click.prevent="getOneLive(item.liveId)" v-for="item in liveList" :key="item.liveId" class="live-item">
        <div class="pic-container">
          <img :src="item.picPath | picPathFormat" alt="" class="live-pic">
        </div>
        <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
        <p class="live-title" v-html="item.title"></p>
        <p class="live-url" v-html="item.subTitle"></p>
      </a>
    </div>
    <h2 class="title">录播</h2>
    <p v-if="!reviewList[0]" class="instead-info">加载中</p>
    <div class="live-list">
      <a @click.prevent="getOneLive(item.liveId)" v-for="item in reviewList" :key="item.liveId" class="live-item">
        <div class="pic-container">
          <img :src="item.picPath | picPathFormat" alt="" class="live-pic">
        </div>
        <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
        <p class="live-title" v-html="item.title"></p>
        <p v-html="item.subTitle" class="live-url"></p>
      </a>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="getMoreLive" v-if="$route.path !=='/home' && reviewList[0]">加载更多</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "allmemberlive",
    data() {
      return {
        liveList: [],
        reviewList: [],
        limit: 8,
        id: this.$route.params.id || 0
      }
    },
    methods: {
      getAllLive(){
        this.axios.get('/api/getAllLive?limit=8&id=' + this.id)
          .then(res => {
            this.liveList = res.data.content.liveList
            this.reviewList = res.data.content.reviewList
          })
      },
      getMoreLive(){
        this.limit += 8
        this.axios.get('/api/getAllLive?limit=' + this.limit + '&id=' + this.id)
          .then(res => {
            this.reviewList = res.data.content.reviewList
          })
      },
      getOneLive(id){
        this.$router.push({name: 'livepage',params: {id,type:1}})
      }
    },
    mounted() {
      this.getAllLive()
    }
  }
</script>

<style lang="less" scoped>
.live-container{
  margin: 10px;
  .title,.instead-info{
    margin-left: 5px;
  }
  .live-list{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .live-item{
      display: block;
      width: 148px;
      margin: 0 5px 10px 5px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      background-color: #fff;
      box-shadow: 0 0 1px #ccc;
      &:hover{
        background-color: #efefef;
      }
      .pic-container{
        display: flex;
        align-items: center;
        height: 160px;
        .live-pic{
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
    display: flex;
    justify-content: center;
  }
}
</style>