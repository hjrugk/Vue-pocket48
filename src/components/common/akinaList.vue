<template>
  <div class="live-list">
    <transition-group appear tag="div" class="list-container">
      <a
        href="javascript:;"
        @click.prevent="goToLivePage(item.aid)"
        v-for="item in list"
        :key="item.aid"
        class="live-item"
        target="_blank"
      >
        <div class="pic-container">
          <img :src="item.pic" :alt="item.title" class="live-pic">
          <div class="mask"></div>
        </div>
        <div class="live-info">
          <p :title="item.title" v-html="item.title" class="live-url"></p>
        </div>
      </a>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "akinaList",
  data() {
    return {};
  },
  methods: {
    goToLivePage(id) {
      this.$router.push({ name: "bilibili", params: { id } });
    }
  },
  props: ["list"]
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.live-list {
  width: 100%;
  .live-header {
    width: 85%;
    margin: 0 auto;
    .flex-align-center();
    justify-content: space-between;
    .live-type {
      margin-left: 10px;
      font-weight: 500;
      font-size: 20px;
    }
    .live-more {
      margin-right: 20px;
      margin-bottom: 5px;
      cursor: pointer;
      color: #333;
      font-size: 14px;
      &:hover {
        color: #666;
      }
    }
  }
  .list-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    width: 85%;
    margin: 0 auto;
    padding: 10px;
    .live-item {
      padding: 5px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      .pic-container {
        .flex-align-center();
        max-height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 3px #666;
        &:hover {
          box-shadow: 0 0 9px #333;
          .mask {
            visibility: visible;
          }
        }
        .live-title {
          font-size: 12px;
          position: absolute;
          bottom: 0;
          color: #fff;
          padding-left: 10px;
        }
        .live-pic {
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          visibility: hidden;
        }
      }
      .live-info {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        width: 90%;
        .live-url {
          height: 15px;
          overflow: hidden;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .list-container {
      width: 90%;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1368px) {
    .list-container,
    .live-header {
      width: 1160px;
    }
  }
  @media screen and (max-width: 610px) {
    .list-container {
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>