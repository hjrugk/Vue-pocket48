<template>
  <div class="top-container" v-if="topHeight==='800px'">
    <div class="top-list" :style="{width: topWidth}">
      <div class="header">
        <span></span>
        <h3>贡献榜</h3>
        <span class="close" @click="toggleTopList">&times;</span>
      </div>
      <div
        class="top-item"
        :class="{' flex-all-center':index!==0}"
        v-for="(item, index) in topList"
        :key="index"
      >
        <span :class="{'flex-align-center':index!==0,isTheTop:index===0}">
          <span class="top-avatar">
            <img
              @click="getUserInfo(item)"
              :src="item.userAvatar | picPathFormat"
              alt
              width="40"
              height="40"
            >
          </span>
          <br>
          <span class="top-name" v-html="item.userName"></span>
        </span>
        <br>
        <span class="top-money" v-html="'贡献度：'+item.money"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["topWidth", "topList", "topHeight"],
  methods: {
    toggleTopList() {
      this.$emit("togglevisibility");
    },
    getUserInfo(info) {
      this.$emit("getuserinfo", info);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/global";
.top-container {
  .flex-justify-center();
  padding: 10px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  text-align: center;
  .top-list {
    height: 800px;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: scroll;
    box-sizing: border-box;
    animation: enter 0.5s ease;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        display: inline-block;
        margin-right: -40px;
      }
      .close {
        font-size: 25px;
        margin-right: 20px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
    .top-item {
      margin-bottom: 20px;
      justify-content: space-between;
      padding: 15px;
      .isTheTop {
        img {
          width: 50px;
          height: 50px;
          text-align: center;
        }
        span {
          line-height: 1.5;
        }
      }
      .top-avatar img {
        border-radius: 50%;
        padding-right: 10px;
        cursor: pointer;
      }
      .top-name {
        max-width: 150px;
        padding-right: 10px;
      }
      .top-money {
        font-size: 13px;
        color: #ddd;
      }
    }
  }
  @keyframes enter {
    0% {
      height: 0;
    }
    100% {
      height: 800px;
    }
  }
  .flex-all-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
  }
}
</style>


