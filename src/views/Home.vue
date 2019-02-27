<template>
  <div class="home">
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/home/groupinfo">所有成员</el-menu-item>
      <el-menu-item index="/home/memberlive/0">成员直播</el-menu-item>
      <el-menu-item index="/home/openlive/0">公演直播</el-menu-item>
    </el-menu>
    <memberlive></memberlive>
  </div>
</template>

<script>
import memberlive from "../components/live/memberlive";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    memberlive: memberlive
  }
};
</script>
