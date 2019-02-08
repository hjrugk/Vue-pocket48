<template>
  <div>
    <div>
      直播
      <p v-if="!liveList[0]">当前没有直播</p>
      <div v-for="item in liveList" :key="item.liveId">
        <img :src="item.picPath | picPathFormat" alt="" class="livePic">
        <p v-html="item.title"></p>
        ---
        <a v-html="item.subTitle" :href="item.streamPath"></a>
      </div>
    </div>
    <div>
      录播
      <p v-if="!reviewList[0]">加载中</p>
      <div v-for="item in reviewList" :key="item.liveId">
        <img :src="item.picPath | picPathFormat" alt="" class="livePic">
        <p v-html="item.title"></p>
        ---
        <a v-html="item.subTitle" :href="item.streamPath"></a>
      </div>
      <el-button type="primary" @click="getMoreLive" v-if="$route.path==='/home/allmemberlive'">加载更多</el-button>
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
.livePic{
  width: 50px;
}
</style>