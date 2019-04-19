<template>
  <div class="recommand-info">
    <div class="recommand-layer" v-if="showInfo===3">
      <div class="first" v-for="(item, index) in recommend" :key="index">
        <span class="text">{{index | translate}}</span>
        <span class="image" @click="getMemberDetail(item.info.real_name)">
          <img :src="item.info.avatar | picPathFormat" alt>
        </span>
        <span class="text" v-html="item.info.real_name"></span>
        <span class="money">
          <span>贡献度</span>
          <br>
          <span v-html="item.money"></span>
        </span>
      </div>
    </div>
    <alt-loading v-else></alt-loading>
  </div>
</template>
<script>
import altLoading from "../subComponents/altLoading";
export default {
  data() {
    return {
      showInfo: 0
    };
  },
  filters: {
    translate: function(val) {
      let newVal = "";
      switch (val) {
        case "first":
          newVal = "首推";
          break;
        case "second":
          newVal = "二推";
          break;
        case "third":
          newVal = "三推";
          break;
        default:
          break;
      }
      return newVal;
    }
  },
  methods: {
    async getMemberName(id, key) {
      // 获取所推成员信息
      if (id !== 0 && this.recommend[key].show) {
        let db = await this.openDB("group", 1);
        const res = await this.findData(db, "members", id);
        this.recommend[key].info = res;
        this.showInfo++;
      } else {
        this.recommend[key].info = {
          real_name: "保密",
          avatar: "/mediasource/profile_icon.png"
        };
        this.showInfo++;
      }
    },
    triggerMethod() {
      // 生成所推成员数组
      for (const key in this.recommend) {
        this.getMemberName(this.recommend[key].memberId, key);
      }
    },
    getMemberDetail(memberName) {
      // 跳转到成员列表页面
      if (memberName !== "保密") {
        let n = [];
        if (memberName.includes("-")) {
          n = memberName.split("-");
        } else {
          n = [memberName];
        }
        this.$router.push({
          name: "memberlist",
          params: { group: "1", memberName: n[n.length - 1] }
        });
      }
    }
  },
  mounted() {
    this.triggerMethod();
  },
  props: ["recommend"],
  components: {
    altLoading
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.recommand-info {
  .flex-all-center();
  width: 100%;
  .first {
    .flex-align-center();
    width: 300px;
    justify-content: space-between;
    margin-bottom: 1px;
    padding: 10px;
    .text {
      width: 80px;
    }
    .image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid #ccc;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .money {
      font-size: 12px;
      color: #999;
      span {
        line-height: 2;
      }
    }
  }
  .alt_bg {
    width: 100%;
    height: 300px;
    overflow: hidden;
    text-align: center;
    .alt-img {
      height: 300px;
    }
  }
}
</style>

