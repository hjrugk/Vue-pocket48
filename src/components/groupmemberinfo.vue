<template>
  <div class="member-container">
    <div v-for="(t, i) in team" :key="i" class="team-container">
      <p v-html="'Team ' + t" class="team-name"></p>
      <p v-if="!memberList[0]">成员列表加载中</p>
      <div class="member-list">
        <div class="member-item"
             v-for="item in memberList" :key="item.member_id"
             v-show="item.team - group === (i+1)"
             @click="getMemberDetail(item,t)"
        >
          <p class="avatar-container"><img :src="item.avatar | picPathFormat" alt="" class="member-avatar"></p>
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
      },
      getMemberDetail(item,t){
        this.$router.push({name: 'memberDetail',params: {id: item.member_id,item,t}})
      }
    },
    mounted() {
      this.getMemberList()
      this.team = splitTeam(this.group)
    },
    watch: {
      '$route': function () {
        this.memberList = []
        this.group = this.$route.params.group
        this.getMemberList()
        this.team = splitTeam(this.group)
      }
    }
  }
</script>

<style lang="less" scoped>
.member-container{
  margin: 7px;
  .team-container{
    .team-name{
      font-weight: bold;
      margin-left: 5px;
    }
    .member-list{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .member-item{
        width: 98px;
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 5px;
        /*margin: 0 5px 10px 5px;*/
        margin-right: 10px;
        margin-bottom: 5px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        cursor: pointer;
        .avatar-container{
          .member-avatar{
            width: 100%;
            border-radius: 50%;
          }
        }
        .member-name{
          margin-top: 10px;
        }
      }
    }
  }
}
</style>