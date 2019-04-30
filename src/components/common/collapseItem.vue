<template>
  <div class="collapse-item">
    <collapseContent 
      @changelivelist="changelivelist"
      v-for="team in teams" :team="team" :key="team.teamId" :memberList="memberList"
      v-show="team.teamName!=='预备生'&&team.teamName!=='明星殿堂'&&team.status===1" />
  </div>
</template>
<script>
import collapseContent from './collapseContent'
export default {
  data() {
    return {
      memberList: [],
      teams: []
    }
  },
  props: {
    groupId: String
  },
  methods: {
    async getMemberList() {
      // 从indexedDB获取数据
      let db = await this.openDB("group", 1);
      let res = await this.findData(db, "groups", this.groupId);
      this.memberList = res.member;
      this.teams = res.team;
    },
    changelivelist({userId}){
      this.$emit('changelivelist',{userId})
    }
  },
  mounted(){
    this.getMemberList()
  },
  components: {
    collapseContent
  }
}
</script>
<style lang="less" scoped>

</style>