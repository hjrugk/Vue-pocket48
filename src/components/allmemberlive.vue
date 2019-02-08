<template>
  <div>
    <p>直播</p>
    <p v-for="item in liveList" :key="item.liveId">
      <span v-html="item.title"></span>
       ---
      <a v-html="item.subTitle" :href="item.streamPath"></a>
    </p>
    <p>录播</p>
    <p v-for="item in reviewList" :key="item.liveId">
      <span v-html="item.title"></span>
      ---
      <a v-html="item.subTitle" :href="item.streamPath"></a>
    </p>
  </div>
</template>

<script>
  export default {
    name: "allmemberlive",
    data() {
      return {
        liveList: [],
        reviewList: []
      }
    },
    methods: {
      getAllLive(){
        this.axios.get('/api/getAllLive')
          .then(res => {
            this.liveList = res.data.content.liveList
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

</style>