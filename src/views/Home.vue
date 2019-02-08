<template>
  <div class="home">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/home/allmemberinfo">所有成员</el-menu-item>
      <el-menu-item index="/home/allmemberlive">成员直播</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>
