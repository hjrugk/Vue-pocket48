<template>
  <div class="live-list">
    <transition-group>
      <a
        :href="'http://48live.jarvay.cn/#/flvjs/'+item.liveId"
        v-for="item in list"
        :key="item.liveId"
        class="live-item my-card"
        :style="{width: rect.width}"
        target="_blank"
      >
        <div
          class="pic-container flex-align-center"
          :style="{height:rect.height}"
        >
          <img :src="item.picPath | picPathFormat" alt class="live-pic">
        </div>
        <p v-html="new Date(item.startTime).toLocaleDateString()" class="live-time"></p>
        <p class="live-title" v-html="item.title"></p>
        <p v-html="item.subTitle" class="live-url"></p>
      </a>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "liveItem",
    data() {
      return {}
    },
    methods: {},
    props: ['list','rect']
  }
</script>

<style lang="less" scoped>
  .live-list > span {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .live-item {
      display: block;
      margin: 0 5px 10px 0px;
      padding: 5px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      &:hover {
        background-color: #efefef;
      }
      .pic-container {
        overflow: hidden;
        .live-pic {
          width: 100%;
        }
      }
      .live-time,.live-title,.live-url {
        font-size: 14px;
      }
    }
  }
</style>