<template>
  <div class="live-page-container">
    <a class="pic-container" :href="id | liveUrlFormat" target="_blank" v-if="type===1">
      <img :src="liveInfo.picPath | picPathFormat" alt="" class="live-cover">
    </a>
    <a class="pic-container" href="javascript:;" target="_blank" v-if="type===0">
      <img :src="liveInfo.picPath | picPathFormat" alt="" class="live-cover">
    </a>
    <div class="live-info">
      <p v-html="liveInfo.title" class="main-title"></p>
      <p v-html="liveInfo.subTitle" class="sub-title"></p>
    </div>
    <p v-html="new Date(liveInfo.startTime).toLocaleDateString()" class="live-time"></p>
    <div class="comment-info" v-if="type===0">
      <span class="praise-count" v-html="liveInfo.count.praiseCount"></span>
      <span class="comment-count" v-html="liveInfo.count.commentCount"></span>
      <span class="share-count" v-html="liveInfo.count.shareCount"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "livepage",
    data() {
      return {
        id: this.$route.params.id,
        type: this.$route.params.type,
        liveInfo: {}
      }
    },
    methods: {
      getLive(){
        this.axios.get('/api/getLivePage?type=' + this.type + '&id=' + this.id)
          .then(res => {
            this.liveInfo = res.data.content
          })
      }
    },
    created() {
      this.getLive()
    }
  }
</script>

<style lang="less" scoped>
.live-page-container{
  padding: 10px;
  border: 1px solid #efefef;
  margin: 5px;
  border-radius: 3px;
  .pic-container{
    text-align: center;
    display: block;
    .live-cover{
      max-width: 800px;
      width: 100%;
    }
  }
  .live-info{
    border-top: 1px solid #ccc;
    margin-top: 5px;
    .main-title{
      font-size: 18px;
      margin-right: 10px;
    }
    .sub-title{
      font-size: 15px;
    }
  }
  .comment-info{
    .praise-count{
      margin-right: 10px;
    }
    .comment-count{
      margin-right: 10px;
    }
  }
}
</style>