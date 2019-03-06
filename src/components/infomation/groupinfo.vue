<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
        <el-menu-item
          v-for="item in groupList"
          router
          :key="item.id"
          :index="item.id"
          @click="getList(item.id)"
          :disabled="item.id==='1'"
        >{{item.name.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "groupinfo",
  data() {
    return {
      groupList: [
        {id:'1',name:'全团'},
        {id:'1000',name:'snh48'},
        {id:'1100',name:'bej48'},
        {id:'1200',name:'gnz48'},
        {id:'1300',name:'shy48'},
        {id:'1400',name:'ckg48'},
        {id:'1500',name:'idft'},
        {id:'1600',name:'海外练习生'}
        ],
      activeIndex: ''
    };
  },
  methods: {
    getList(group) {
      this.$router.push({ name: "memberlist", params: { group } });
    }
  },
  mounted() {
    this.activeIndex = this.$route.params.group
  }
};
</script>

<style lang="less" scoped>
</style>