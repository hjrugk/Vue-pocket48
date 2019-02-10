<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item
          v-for="(value,key, i) in $store.state.memberInfo"
          :key="i" :index=key @click="getList(key)"
        >{{key.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { transformGroupId } from "../plugins/teamHandler";
  export default {
    name: "allmemberinfo",
    data() {
      return {
        membersList: [],
        snh: [],
        bej: [],
        gnz: [],
        ckg: [],
        shy: [],
        idft: [],
        oversea: [],
        legend: [],
        other: []
      }
    },
    methods: {
      getAllMembers(){
        if(!localStorage.getItem('memberInfo')){
          this.axios.get('/api/allmemberinfo?group=1')
            .then(res => {
              console.log(res);
              this.membersList = res.data
            })
        }
      },
      getList(group){
        group = transformGroupId(group)
        this.$router.push('/home/allmemberinfo/' + group)
      }
    },
    mounted() {
      this.getAllMembers()
    },
    watch: {
      'membersList':  function() {
        if(!localStorage.getItem('memberInfo')){
          this.snh = this.membersList.filter(item => (item.team<1010 && item.team>1000))
          this.bej = this.membersList.filter(item => (item.team<1110 && item.team>1100))
          this.gnz = this.membersList.filter(item => (item.team<1210 && item.team>1200))
          this.shy = this.membersList.filter(item => (item.team<1310 && item.team>1300))
          this.ckg = this.membersList.filter(item => (item.team<1410 && item.team>1400))
          this.idft = this.membersList.filter(item => (item.team<1510 && item.team>1500))
          this.oversea = this.membersList.filter(item => (item.team>1600))
          this.other = this.membersList.filter(item => (item.team===0))
          this.legend = this.membersList.filter(item => (item.team===999))
          this.$store.commit('saveMemberInfo',{
            snh: this.snh,
            bej: this.bej,
            gnz: this.gnz,
            shy: this.shy,
            ckg: this.ckg,
            idft: this.idft,
            oversea: this.oversea,
            other: this.other,
            legend: this.legend
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>