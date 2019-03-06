<template>
  <div class="member-container">
    <el-input v-model="keywords">
      <template slot="prepend">搜索成员</template>
    </el-input>
    <div class="radio-list">
      <el-radio v-model="statusCode" label="1">正式成员</el-radio>
      <el-radio v-model="statusCode" label="0">暂休成员</el-radio>
      <el-radio v-model="statusCode" label="2">其他成员</el-radio>
    </div>
    <div v-for="(info, i) in team" :key="i" class="team-container">
      <p v-html="info.team_name" :style="'color: #'+info.color" class="team-name" v-show="!keywords"></p>
      <p v-if="!memberList[0]" class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
      <div class="member-list">
        <transition-group mode="out-in">
          <div
            class="member-item my-card flex-all-center"
            :style="'border: 1px solid #'+info.color"
            v-for="item in newList"
            :key="item.member_id"
            v-show="item.team === info.team_id && item.status.toString()===statusCode"
            @click="getMemberDetail(item,info)"
          >
            <p class="avatar-container">
              <img
                :src="item.avatar | picPathFormat"
                alt
                @error="altImg(item)"
                class="member-avatar"
              >
            </p>
            <p class="member-name" v-html="item.real_name"></p>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "memberlist",
  data() {
    return {
      memberList: [],
      group: this.$route.params.group,
      team: [],
      keywords: this.$route.params.memberName || "",
      statusCode: '1',
      statusVal: ["正式成员", "暂休成员", "其他成员"]
    };
  },
  methods: {
    getMemberList() {
      this.axios.get("/api/getMemberList?group="+this.group).then(res => {
        this.memberList = res.data.member;
        this.team = res.data.team
      });
    },
    getMemberDetail(item, info) {
      this.$store.dispatch("saveDetail", { item, info });
      this.$router.push({
        name: "memberdetail",
        params: { id: item.member_id }
      });
    },
    altImg(item) {
      item.avatar = "./assets/alt_avatar.png";
    }
  },
  mounted() {
    this.getMemberList();
  },
  watch: {
    $route: function() {
      this.memberList = []
      this.team = []
      this.group = this.$route.params.group;
      this.getMemberList();
    }
  },
  computed: {
    newList: function() {
      let list = [];
      this.memberList.forEach(item => {
        if (item.real_name.includes(this.keywords)) {
          list.push(item);
        }
      });
      return list;
    }
  }
};
</script>

<style lang="less" scoped>
.member-container {
  margin: 7px;
  .team-container {
    .team-name {
      font-weight: bold;
      margin-left: 5px;
    }
    .alt_icon {
      padding-left: 2px;
    }
    .member-list > span {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .member-item {
        width: 95px;
        height: 200px;
        border: 1px solid #ddd;
        padding: 5px;
        margin-right: 8px;
        margin-bottom: 8px;
        text-align: center;
        flex-wrap: wrap;
        cursor: pointer;
        &:hover {
          background-color: #efefef;
        }
        .avatar-container {
          width: 98px;
          height: 130px;
          .member-avatar {
            width: 100%;
            border-radius: 50%;
          }
        }
        .member-name {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>