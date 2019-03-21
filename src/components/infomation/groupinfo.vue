<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
        <div class="group-brand color-item" style="background-color: #fff">所有团队</div>
        <el-menu-item
          v-for="item in groupList"
          :style="{backgroundColor: item.color}"
          class="color-item"
          router
          :key="item.id"
          :index="item.id"
          @click="getList(item.id)"
          :disabled="!isComplete"
          v-show="item.id !== '1'"
        >{{item.name.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "groupinfo",
  data() {
    return {
      groupList: [ // 团队列表
        {id:'1',name:'全团',color: '#8ed2f5'},
        {id:'1000',name:'snh48',color: '#8ed2f5'},
        {id:'1100',name:'bej48',color: '#ff2472'},
        {id:'1200',name:'gnz48',color: '#9fbf40'},
        {id:'1300',name:'shy48',color: '#e200cc'},
        {id:'1400',name:'ckg48',color: '#946200'},
        {id:'1500',name:'idft',color: '#b4006e'},
        {id:'1600',name:'海外练习生',color: '#8ed2f5'}
        ],
      activeIndex: ''
    };
  },
  methods: { // 加载成员列表页面
    getList(group) {
      this.$router.push({ name: "memberlist", params: { group } });
    }
  },
  mounted() {
    this.activeIndex = this.$route.params.group
  },
  computed: {
    ...mapState(['isComplete'])
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.member-list{
  width: 100%;
  .el-menu--horizontal>.el-menu-item{
    color: #fff
  }
  .color-item{
    color: #fff;
    text-align: center;
  }
  .el-menu-demo{
    .flex-menu();
    li{
      max-width: 180px;
      min-width: 140px;
    }
    .group-brand{
      flex: 1;
      color: #000;
      min-width: 120px;
      font-size: 14px;
      border-left: 1px solid #e6e6e6;
      user-select: none;
      .flex-all-center();
    }
  }
}
</style>