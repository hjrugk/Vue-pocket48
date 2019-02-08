<template>
  <div>
    <div v-for="(item, i) in team" :key="i">
      <p v-html="'Team ' + item"></p>
      <div class="member-list">
        <div class="member-item" v-for="item in memberList" :key="item.member_id" v-show="item.team - group === (i+1)">
          <img :src="item.avatar | picPathFormat" alt="" class="member-avatar">
          <p class="member-name" v-html="item.real_name"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { splitTeam } from "../plugins/teamHandler";
  export default {
    name: "groupmemberinfo",
    data() {
      return {
        memberList: [],
        group: this.$route.params.group,
        team: []
      }
    },
    methods: {
      getMemberList(){
        this.axios.get('/api/allmemberinfo?group=' + this.group)
          .then(res => {
            this.memberList = res.data
          })
      }
    },
    created() {
      this.getMemberList()
      this.team = splitTeam(this.group)
    }
  }
</script>

<style lang="less" scoped>
.member-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .member-item{
    width: 100px;
    .member-avatar{
      width: 50px;
    }
  }
}
</style>