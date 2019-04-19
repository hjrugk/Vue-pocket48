<template>
  <div class="user-info my-card">
    <div class="base-info" v-if="jujuInfo.info.avatar">
      <p class="avatar">
        <img :src="jujuInfo.info.avatar | picPathFormat" alt>
      </p>
      <div>
        <p class="name">
          {{jujuInfo.info.nickname}}
          <el-tag size="mini" v-html="'lv.'+jujuInfo.info.level"></el-tag>
        </p>
        <span v-html="'ID：'+jujuInfo.info.userId"></span>
        <span v-html="'关注：' + jujuInfo.friendsNum" style="margin-left: 10px;"></span>
      </div>
    </div>
    <!-- <recommend v-if="jujuInfo.info.avatar" :recommend="jujuInfo.recommend"></recommend> -->
    <alt-loading v-else></alt-loading>
  </div>
</template>
<script>
import altLoading from "../subComponents/altLoading";
export default {
  name: "userInfo",
  data() {
    return {
      id: this.$route.params.id,
      jujuInfo: {
        info: {},
        friendsNum: 0,
        recommend: {}
      }
    };
  },
  components: {
    altLoading
  },
  methods: {
    async getJuJuInfo() {
      // 获取聚聚信息
      const res = await this.ajax(
        "/getUserInfo",
        { userId: this.id, token: this.$store.getters.getToken },
        "POST"
      );
      let info = res.content.baseUserInfo;
      let friendsNum = res.content.baseUserInfo.friends;
      this.jujuInfo = { info, recommend: {}, friendsNum };
    }
  },
  mounted() {
    this.getJuJuInfo();
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.user-info {
  text-align: center;
  padding: 20px;
  margin: 5px;
  .avatar {
    overflow: hidden;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid #ccc;
      height: 80px;
    }
  }
  .base-info {
    .flex-all-center();
    margin-bottom: 20px;
    .name {
      margin-left: 20px;
    }
  }
  .base-info > div > span {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
  }
}
</style>

