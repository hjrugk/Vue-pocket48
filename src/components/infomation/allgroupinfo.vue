<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item
          v-for="item in groupList"
          router
          :key="item.id"
          :index="item.name"
          @click="getList(item.name)"
        >{{item.name.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "allgroupinfo",
  data() {
    return {
      groupList: [
        {id:10,name:'snh48'},
        {id:11,name:'bej48'},
        {id:12,name:'gnz48'},
        {id:13,name:'shy48'},
        {id:14,name:'ckg48'},
        {id:15,name:'idft'},
        {id:16,name:'海外练习生'}
        ]
    };
  },
  methods: {
    getList(group) {
      group = group.toLowerCase();
      group = this.transformGroupId(group);
      this.$router.push({ name: "groupmemberinfo", params: { group } });
    }
  }
};
</script>

<style lang="less" scoped>
</style>