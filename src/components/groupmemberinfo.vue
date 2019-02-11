<template>
  <div class="member-container">
    <el-input v-model="keywords">
      <template slot="prepend">搜索成员</template>
    </el-input>
    <div v-for="(t, i) in team" :key="i" class="team-container">
      <p v-html="'Team ' + t" class="team-name"></p>
      <p v-if="!memberList[0]" class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
      <div class="member-list">
        <div class="member-item"
             v-for="item in newList" :key="item.member_id"
             v-show="item.team - group === (i+1) && item.status===1"
             @click="getMemberDetail(item,t)"
        >
          <p class="avatar-container"><img :src="item.avatar" alt="" @error="altImg(item)" class="member-avatar"></p>
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
        team: [],
        keywords: ''
      }
    },
    methods: {
      getMemberList(){
        this.axios.get('/api/allmemberinfo')
          .then(res => {
            this.memberList = res.data[this.group]
            this.$store.commit('saveMemberInfo',res.data)
          })

      },
      getMemberDetail(item,t){
        this.$router.push({name: 'memberDetail',params: {id: item.member_id,item,t}})
      },
      altImg(item){
        item.avatar = './assets/alt_avatar.png'
      }
    },
    mounted() {
      if (!localStorage.getItem('memberInfo')){
        this.getMemberList()
      } else{
        this.memberList = JSON.parse(localStorage.getItem('memberInfo'))[this.group]
      }
      this.team = splitTeam(this.group)
    },
    watch: {
      '$route': function () {
        this.memberList = []
        this.group = this.$route.params.group
        this.getMemberList()
        this.team = splitTeam(this.group)
      }
    },
    computed: {
      'newList': function () {
        let list = []
        this.memberList.forEach(item => {
          if(item.real_name.includes(this.keywords)){
            list.push(item)
          }
        })
        return list
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
    .alt_icon{
      padding-left: 2px;
    }
    .member-list{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .member-item{
        width: 98px;
        height: 213px;
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
        box-shadow: 0 0 1px #ccc;
        background-color: #fff;
        &:hover{
          background-color: #efefef;
        }
        .avatar-container{
          width: 98px;
          height: 130px;
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