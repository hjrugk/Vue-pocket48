<template>
  <div class="home">
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/home/allgroupinfo">所有成员</el-menu-item>
      <el-menu-item index="/home/allmemberlive/0">成员直播</el-menu-item>
      <el-menu-item index="/home/openlive/0">公演直播</el-menu-item>
    </el-menu>
    <allmemberlive></allmemberlive>
  </div>
</template>

<script>
import allmemberlive from "../components/live/allmemberlive";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    allmemberlive: allmemberlive
  }
};
</script>
