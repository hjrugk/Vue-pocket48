<template>
  <div class="home">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/home/allgroupinfo">所有成员</el-menu-item>
      <el-menu-item index="/home/allmemberlive/0">成员直播</el-menu-item>
      <el-menu-item index="/home/openlive/0">公演直播</el-menu-item>
    </el-menu>
    <allmemberlive></allmemberlive>
  </div>
</template>

<script>
  import allmemberlive from "../components/allmemberlive";
  export default {
  data() {
    return {

    };
  },
  methods: {

  },
    components: {
    'allmemberlive': allmemberlive
    }
}
</script>
