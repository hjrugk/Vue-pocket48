<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo flex-menu" mode="horizontal" :default-active="activeIndex">
        <div class="group-brand color-item flex-all-center" style="background-color: #fff">所有团队</div>
        <el-menu-item
          v-for="item in groupList"
          :style="{backgroundColor: item.color}"
          class="color-item"
          router
          :key="item.id"
          :index="item.id"
          @click="getList(item.id)"
          :disabled="item.id==='1'"
          v-show="item.id !== '1'"
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
        {id:'1',name:'全团',color: '#ffffff'},
        {id:'1000',name:'snh48',color: '#90ccea'},
        {id:'1100',name:'bej48',color: '#ff2471'},
        {id:'1200',name:'gnz48',color: '#aac913'},
        {id:'1300',name:'shy48',color: '#e70095'},
        {id:'1400',name:'ckg48',color: '#9d6124'},
        {id:'1500',name:'idft',color: '#b4006e'},
        {id:'1600',name:'海外练习生',color: '#ffffff'}
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
.member-list{
  width: 100%;
  .el-menu--horizontal>.el-menu-item{
    color: #fff
  }
  .color-item{
    color: #fff;
    text-align: center;
    &:nth-child(9){
      color: #000;
      border-right: 1px solid #e6e6e6;
    }
  }
  .el-menu-demo{
    .group-brand{
      flex: 1;
      color: #000;
      width: 150px;
      font-size: 14px;
      border-left: 1px solid #e6e6e6;
      user-select: none;
    }
  }
}
</style>