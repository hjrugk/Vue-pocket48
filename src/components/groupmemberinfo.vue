<template>
  <div class="member-container">
    <el-input v-model="keywords">
      <template slot="prepend">搜索成员</template>
    </el-input>
    <div class="radio-list">
      <el-radio v-model="statusCode" label=1>正式成员</el-radio>
      <el-radio v-model="statusCode" label=0>暂休成员</el-radio>
      <el-radio v-model="statusCode" label=2>其他成员</el-radio>
    </div>
    <div v-for="(t, i) in team" :key="i" class="team-container">
      <p v-html="'Team ' + t" :style="'color: #'+colorList[i].color" class="team-name"></p>
      <p v-if="!memberList[0]" class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
      <div class="member-list">
        <transition-group mode="out-in">
          <div class="member-item my-card flex-all-center"
               :style="'border: 1px solid #'+colorList[i].color"
               v-for="item in newList" :key="item.member_id"
               v-show="item.team - group === (i+1) && item.status==statusCode"
               @click="getMemberDetail(item,t,colorList[i].color)"
          >
            <p class="avatar-container">
              <img :src="item.avatar | picPathFormat" alt=""
                   @error="altImg(item)" class="member-avatar"
              >
            </p>
            <p class="member-name" v-html="item.real_name"></p>
          </div>
        </transition-group>
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
        keywords: '',
        colorList: [],
        statusCode: 1,
        statusVal: ['正式成员', '暂休成员','其他成员']
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
      getMemberDetail(item,t,color){
        this.$store.commit('saveTeam',{item,t,color})
        this.$router.push({name: 'memberDetail',params: {id: item.member_id}})
      },
      altImg(item){
        item.avatar = './assets/alt_avatar.png'
      },
      setColor(){
        let team = JSON.parse(localStorage.getItem('teamList'))
        this.colorList = team.filter(item => {
          return ((item.team_id-parseInt(this.group))>0 && (item.team_id-parseInt(this.group))<8)
        })
      }
    },
    mounted() {
      if (!localStorage.getItem('memberInfo')){
        this.getMemberList()
      } else{
        this.memberList = JSON.parse(localStorage.getItem('memberInfo'))[this.group]
      }
      this.team = splitTeam(this.group)
      if(this.group){
        this.setColor()
      }
    },
    watch: {
      '$route': function () {
        this.memberList = []
        this.group = this.$route.params.group
        this.getMemberList()
        this.team = splitTeam(this.group)
      },
      'group': function () {
        this.setColor()
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
  .v-enter,
  .v-leave-to{
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
.member-container{
  margin: 7px;
  .radio-list{
    padding: 15px 10px 10px 10px;
  }
  .team-container{
    .team-name{
      font-weight: bold;
      margin-left: 5px;
    }
    .alt_icon{
      padding-left: 2px;
    }
    .member-list>span{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .member-item{
        width: 95px;
        height: 200px;
        border: 1px solid #ddd;
        padding: 5px;
        margin-right: 8px;
        margin-bottom: 8px;
        text-align: center;
        flex-wrap: wrap;
        cursor: pointer;
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