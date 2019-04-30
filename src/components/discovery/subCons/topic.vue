<template>
  <div class="topic-container">
    <TopicHeader :coupleName="couple.coupleName" :mblogData="mblogData" 
      :memberOne="coupleMember.memberOne" :memberTwo="coupleMember.memberTwo" 
      v-if="coupleMember.memberOne.abbr" />
      <TopicNav />
    <AkinaList :list="tagVideoList" v-if="tagVideoList[0]" />
  </div>
</template>
<script>
import TopicHeader from './topicHeader'
import TopicNav from './topicNav'
import AkinaList from '@/components/common/akinaList'
export default {
  data(){
    return {
      coupleId: this.$route.params.coupleId,
      couple: this.$route.params.couple,
      tagVideoList: [],
      coupleMember: {
        memberOne: {},
        memberTwo: {}
      },
      mblogData: {}
    }
  },
  components: {
    TopicHeader,
    AkinaList,
    TopicNav
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
    }
  },
  mounted(){
    this.getMemberDetail()
    this.getTopicVideoList()
    this.getContainerDetail()
  }
}
</script>
<style lang="less" scoped>
.topic-container{
  width: 100%;
}
</style>

