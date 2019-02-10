<template>
  <div class="live-container">
    <h2 class="title">直播</h2>
    <p v-if="!liveList[0]" class="instead-info">当前没有直播</p>
    <div class="live-list">
      <a :href="item.streamPath" v-for="item in liveList" :key="item.liveId" class="live-item">
        <img :src="item.picPath | picPathFormat" alt="" class="live-pic">
        <p class="live-title" v-html="item.title"></p>
        <p class="live-url" v-html="item.subTitle"></p>
      </a>
    </div>
    <h2 class="title">录播</h2>
    <p v-if="!reviewList[0]" class="instead-info">加载中</p>
    <div class="live-list">
      <a :href="item.streamPath" v-for="item in reviewList" :key="item.liveId" class="live-item">
        <img :src="item.picPath | picPathFormat" alt="" class="live-pic">
        <p class="live-title" v-html="item.title"></p>
        <a class="live-url">
          <p v-html="item.subTitle"></p>
        </a>
      </a>
    </div>
    <el-button type="primary" @click="getMoreLive" v-if="$route.path==='/home/allmemberlive'">加载更多</el-button>
  </div>
</template>

<script>
  export default {
    name: "allmemberlive",
    data() {
      return {
        liveList: [],
        reviewList: [],
        limit: 8
      }
    },
    methods: {
      getAllLive(){
        this.axios.get('/api/getAllLive?limit=8')
          .then(res => {
            this.liveList = res.data.content.liveList
            this.reviewList = res.data.content.reviewList
          })
      },
      getMoreLive(){
        this.limit += 8
        this.axios.get('/api/getAllLive?limit=' + this.limit)
          .then(res => {
            this.reviewList = res.data.content.reviewList
          })
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
      width: 150px;
      margin: 0 5px 10px 5px;
      padding: 5px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 3px;
      text-decoration: none;
      color: #000;
      .live-pic{
        width: 150px;
        height: 150px;
      }
      .live-title{
        font-size: 12px;
      }
      .live-url{
        font-size: 14px;
      }
    }
  }
}
</style>