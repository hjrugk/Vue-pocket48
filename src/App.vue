<template>
  <div id="app">
    <div class="navbar">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo flex-menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <div class="el-menu-brand flex-all-center">
          <img class="logo-img" @click="pushToHome" src="./assets/images/login_logo.png" alt="">
          <span class="brand-name" @click="pushToHome">口袋48</span>
        </div>
        <el-menu-item class="none" index="/home">首页</el-menu-item>
        <el-menu-item class="none" index="/roomlist" v-show="$store.getters.checkLogin">聚聚</el-menu-item>
        <el-submenu class="none" index="/music">
          <template slot="title">发现</template>
          <el-menu-item index="/music">音乐</el-menu-item>
          <el-menu-item index="/video">视频</el-menu-item>
          <el-menu-item index="/film">影视</el-menu-item>
          <el-menu-item index="/variety">综艺</el-menu-item>
        </el-submenu>
        <el-menu-item class="none" index="/login" v-if="!$store.getters.checkLogin">登录</el-menu-item>
        <el-menu-item class="none" index="/login" v-else>账户</el-menu-item>
        <el-menu-item class="none" index="/about">关于</el-menu-item>
        <el-submenu class="responsive" index="/">
          <template slot="title">菜单</template>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/roomlist" v-show="$store.getters.checkLogin">聚聚</el-menu-item>
          <el-menu-item index="/music">发现</el-menu-item>
          <el-menu-item index="/login" v-if="!$store.getters.checkLogin">登录</el-menu-item>
          <el-menu-item index="/login" v-else>账户</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
    };
  },
  methods: {
    pushToHome(){
      this.$router.push('/')
    }
  },
  watch: {
    $route: function () { // 当路由地址变化后，停止播放音频
      this.activeIndex = '/'+this.$router.history.current.fullPath.split('/')[1]
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.init()
      // eslint-disable-next-line
      RongIMLib.RongIMVoice.stop()
    }
  }
};
</script>

<style scoped lang="less">
#app{
  .navbar{
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #545c64;
    .el-menu.el-menu--horizontal{
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
        justify-content: flex-start;
        user-select: none;
        .logo-img{
          height: 40px;
        }
        .brand-name{
          font-size: 25px;
          margin-left: 10px;
          color: #fff;
          width: 100px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .none{
        display: none;
      }
      .responsive{
        display: flex!important;
      }
    }
  }
}
</style>
