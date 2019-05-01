<template>
  <div class="topic-container">
    <TopicHeader :couple="couple" :coupleName="couple.coupleName" :mblogData="mblogData"
      v-if="coupleMember.memberOne.abbr" />
    <TopicNav @receiveTwice="receiveTwice" :channelFlag="channelFlag" @toggleChannel="toggleChannel" />
    <AkinaList v-show="channelFlag" :list="tagVideoList" v-if="tagVideoList[0]" />
    <div v-if="isSuccess">
      <mBlogAnalysis :two="two" v-show="!channelFlag" :memberOne="coupleMember.memberOne" :memberTwo="coupleMember.memberTwo" />
    </div>
    <altLoading v-if="!channelFlag&&!isSuccess" />
  </div>
</template>
<script>
import TopicHeader from './topicHeader'
import TopicNav from './topicNav'
import mBlogAnalysis from './mBlogAnalysis'
import AkinaList from '@/components/common/akinaList'
import altLoading from '@/components/common/altLoading'
export default {
  name: 'topic',
  data(){
    return {
      coupleId: this.$route.params.coupleId,
      tagVideoList: [],
      coupleMember: {
        memberOne: {},
        memberTwo: {}
      },
      mblogData: {},
      channelFlag: true,
      isSuccess: false,
      two: {}
    }
  },
  components: {
    TopicHeader,
    AkinaList,
    TopicNav,
    mBlogAnalysis,
    altLoading
  },
  methods: {
    async getTopicVideoList(){
      const res = await this.ajax('/getTopicVideoList',{coupleId:this.coupleId})
      this.tagVideoList = res.data
    },
    async getMemberDetail(){
      let db = await this.openDB("group", 1);
      const memberOne = await this.findData(db, "members", this.couple.memberOne);
      const memberTwo = await this.findData(db, "members", this.couple.memberTwo);
      this.coupleMember.memberOne = memberOne
      this.coupleMember.memberTwo = memberTwo
    },
    async getContainerDetail(){
      const res = await this.ajax('/getContainerDetail',{containerId: this.couple.containerId})
      this.mblogData = res.data
    },
    toggleChannel(channel){
      this.channelFlag = channel
    },
    async receiveTwice(){
      const two = await this.ajax('getMBlogData',{weiboUid: this.coupleMember.memberTwo.wbUid})
      this.two = await two.data.userInfo
      this.isSuccess = true
    }
  },
  mounted(){
    this.getMemberDetail()
    this.getTopicVideoList()
    this.getContainerDetail()
  },
  computed: {
    couple(){
      return JSON.parse(localStorage.getItem('CACHE_OF_COUPLE'))
    }
  }
}
</script>
<style lang="less" scoped>
.topic-container{
  width: 100%;
}
</style>

