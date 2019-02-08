<template>
  <div id="app">
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="/music">
        <template slot="title">音乐榜</template>
        <el-menu-item index="/qq">QQ音乐</el-menu-item>
        <el-menu-item index="/netease">网易云</el-menu-item>
        <el-menu-item index="/kugou">酷狗</el-menu-item>
      </el-submenu>
      <el-menu-item index="/roomlist" v-show="$store.state.logFlag">关注房间</el-menu-item>
      <el-menu-item index="/login" v-if="!$store.state.logFlag">登录</el-menu-item>
      <el-menu-item index="/login" v-else>账户</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  data() {
    return {
      activeIndex: '/'
    };
  },
  methods: {

  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
