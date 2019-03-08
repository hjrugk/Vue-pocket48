<template>
  <div class="live-list">
    <transition-group appear tag="div">
      <a
        href="javascript:;"
        @click.prevent="getLivePage(item.liveId)"
        v-for="item in list"
        :key="item.liveId"
        class="live-item my-card"
        :style="{minWidth: rect.width,maxWidth: rect.maxWidth}"
        target="_blank"
      >
        <div class="pic-container flex-align-center" :style="{height:rect.height}">
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
    return {};
  },
  methods: {
    getLivePage(id) {
      this.$router.push({name:'livepage',params:{id,type: this.type}})
    }
  },
  props: ["list", "rect","type"]
};
</script>

<style lang="less" scoped>
.live-list{
  width: 100%;
  display: flex;
  justify-content: center;
  div{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 10px;
    .live-item {
      flex: 1;
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
      .live-time,
      .live-title,
      .live-url {
        font-size: 14px;
      }
    }
  }
}
</style>