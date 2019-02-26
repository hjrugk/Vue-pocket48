<template>
  <div>
    <div class="member-list">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item
          v-for="item in groupList"
          router
          :key="item.group_id"
          :index="item.group_name"
          @click="getList(item.group_name)"
        >{{item.group_name.toUpperCase()}}</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "allgroupinfo",
  data() {
    return {
      groupList: []
    };
  },
  methods: {
    getList(group) {
      group = group.toLowerCase();
      group = this.transformGroupId(group);
      this.$router.push({ name: "groupmemberinfo", params: { group } });
    },
    getGroupInfo() {
      this.axios.get("/api/allgroupinfo").then(res => {
        localStorage.setItem("teamList", JSON.stringify(res.data.content.team));
        localStorage.setItem("urlList", JSON.stringify(res.data.content.url));
        this.groupList = res.data.content.group;
        localStorage.setItem(
          "groupList",
          JSON.stringify(res.data.content.group)
        );
        this.groupList.shift();
      });
    }
  },
  mounted() {
    if (localStorage.getItem("groupList")) {
      this.groupList = JSON.parse(localStorage.getItem("groupList"));
      this.groupList.shift();
    } else {
      this.getGroupInfo();
    }
  }
};
</script>

<style lang="less" scoped>
</style>