<template>
  <div class="member-container">
    <el-input v-model="keywords" :disabled="group==='1'">
      <template slot="prepend">搜索成员</template>
    </el-input>
    <div class="radio-list">
      <el-radio v-model="statusCode" label="1">正式成员</el-radio>
      <el-radio v-model="statusCode" label="0">暂休成员</el-radio>
      <el-radio v-model="statusCode" label="2">其他成员</el-radio>
    </div>
    <alt-loading v-if="!team[0]"></alt-loading>
    <div v-for="(info, i) in team" :key="i" class="team-container" v-else>
      <p v-html="info.team_name" :style="'color: #'+info.color | overseaFilter" class="team-name" v-show="!keywords"></p>
      <div class="member-list">
        <transition-group mode="out-in" tag="div" class="members">
          <div
            class="member-item my-card"
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
import altLoading from '../subComponents/altLoading'
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
    async getMemberList() { // 从indexedDB获取数据
      let db = await this.openDB('group',1)
      let res = await this.findData(db,'groups',this.group)
      this.memberList = res.member
      this.team = res.team
    },
    getMemberDetail(item, info) { // 跳转到成员详细信息页面
      this.$store.dispatch("saveDetail", { item, info });
      this.$router.push({
        name: "memberdetail",
        params: { id: item.member_id }
      });
    },
    altImg(item) {
      item.avatar = "/mediasource/profile_icon.png";
    }
  },
  mounted() {
    this.getMemberList();
  },
  watch: {
    $route: function() { // 监听路由地址变化，重新请求成员信息
      this.memberList = []
      this.team = []
      this.group = this.$route.params.group;
      this.keywords = ''
      this.getMemberList();
    }
  },
  computed: { // 搜索成员，符合条件成员存储在新的数组里
    newList: function() {
      let list = [];
      this.memberList.forEach(item => {
        if (item.real_name.includes(this.keywords)) {
          list.push(item);
        }
      });
      return list;
    }
  },
  components: {
    altLoading
  },
  filters:{
    overseaFilter(val){
      if(val === 'color: #FFFFFF'){
        return 'color: #8ed2f5'
      }else{
        return val
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.member-container {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 7px;
  .team-container {
    .team-name {
      font-weight: bold;
      margin-left: 5px;
    }
    .members {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-auto-columns: auto;
      .member-item {
        .flex-all-center();
        max-height: 200px;
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
          max-height: 120px;
          .member-avatar {
            border-radius: 50%;
            width: 87%;
          }
        }
      }
    }
    @media screen and (max-width: 1100px) {
      .members{
        grid-template-columns: repeat(6, 1fr);
      }
    }
    @media screen and (max-width: 900px) {
      .members{
        grid-template-columns: repeat(5, 1fr);
      }
    }
    @media screen and (max-width: 700px) {
      .members{
        grid-template-columns: repeat(4, 1fr);
      }
    }
    @media screen and (max-width: 500px) {
      .members{
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
@media screen and (min-width: 1368px) {
  .member-container{
    width: 1160px;
  }
}
</style>