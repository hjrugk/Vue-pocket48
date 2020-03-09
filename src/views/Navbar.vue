<template>
  <div class="navbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#654ea3"
      text-color="#FFF"
      active-text-color="#FFFFFF"
      router
    >
      <div class="el-menu-brand">
        <img class="logo-img" @click="pushToHome" src="images/login_logo.png" alt="">
        <span class="brand-name" @click="pushToHome">VUE48</span>
      </div>
      <el-menu-item class="none" index="/home">首页</el-menu-item>
      <el-menu-item class="none" index="/roomlist" v-show="$store.getters.checkLogin">聚聚</el-menu-item>
      <el-submenu popper-class="none" index="/discovery">
        <template slot="title">发现</template>
        <el-menu-item index="/discovery/music">音乐</el-menu-item>
        <el-menu-item index="/discovery/video">视频</el-menu-item>
        <!-- <el-menu-item index="/discovery/couple">CP</el-menu-item> -->
      </el-submenu>
      <el-menu-item class="none" index="/login" v-if="!$store.getters.checkLogin">登录</el-menu-item>
      <el-menu-item class="none" index="/login" v-else>我的</el-menu-item>
      <el-submenu class="responsive" index="/">
        <template slot="title">菜单</template>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/roomlist" v-show="$store.getters.checkLogin">聚聚</el-menu-item>
        <el-menu-item index="/login" v-if="!$store.getters.checkLogin">登录</el-menu-item>
        <el-menu-item index="/login" v-else>我的</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/home",
      TITLE: document.getElementsByTagName('title')[0],
    }
  },
  methods: {
    pushToHome(){
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/global';
.navbar{
  display: flex;
  flex: 0;
  justify-content: center;
  width: 100%;
  background: #654ea3;
  .el-menu-demo{
    .flex-menu();
  }
  .el-menu--horizontal{
    border-bottom: none;
  }
  .el-menu{
    width: 85%;
    .responsive{
      display: none;
    }
    .el-menu-brand{
      width: 300px;
      height: 60px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      user-select: none;
      .logo-img{
        height: 40px;
      }
      .brand-name{
        font-size: 25px;
        color: #fff;
        margin-left: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .none{
      display: none!important;
    }
    .responsive{
      display: flex!important;
    }
  }
}
@media screen and (min-width: 1368px){
  .el-menu{
    width: 1170px!important;
  }
}
</style>

