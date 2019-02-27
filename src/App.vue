<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo flex-menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/roomlist" v-show="$store.state.logFlag">聚聚</el-menu-item>
      <el-submenu index="/music">
        <template slot="title">发现</template>
        <el-menu-item index="/music">音乐</el-menu-item>
        <el-menu-item index="/video">视频</el-menu-item>
        <el-menu-item index="/film">影视</el-menu-item>
        <el-menu-item index="/variety">综艺</el-menu-item>
      </el-submenu>
      <el-menu-item index="/login" v-if="!$store.state.logFlag">登录</el-menu-item>
      <el-menu-item index="/login" v-else>账户</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/"
    };
  },
  methods: {},
  watch: {
    $route: function () {
      this.activeIndex = '/'+this.$router.history.current.fullPath.split('/')[1]
    }
  }
};
</script>

<style>
</style>
