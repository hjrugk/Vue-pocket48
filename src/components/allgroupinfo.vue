<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item
          v-for="item in groupList" router
          :key="item.group_id" :index="item.group_name" @click="getList(item.group_name)"
        >{{item.group_name.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { transformGroupId } from "../plugins/teamHandler";
  export default {
    name: "allgroupinfo",
    data() {
      return {
        groupList: [],
      }
    },
    methods: {
      getList(group){
        group = group.toLowerCase()
        group = transformGroupId(group)
        this.$router.push({path:'/home/allgroupinfo/groupmemberinfo/' + group})
      },
      getGroupInfo(){
        this.axios.get('/api/allgroupinfo')
          .then(res => {
            this.groupList = res.data
            this.groupList.shift()
          })
      }
    },
    mounted() {
      this.getGroupInfo()
    }
  }
</script>

<style lang="less" scoped>

</style>