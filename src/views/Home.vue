<template>
  <div class="home">
    <el-menu
      class="el-menu-demo"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/home/allmemberinfo">所有成员</el-menu-item>
      <el-menu-item index="/home/allmemberlive">所有直播</el-menu-item>
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
