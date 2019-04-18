<template>
  <div class="open-live-container">
    <live-list 
      :type="0" :list="openLiveList" 
      :rect="{width:'300px',height:'180px',maxWidth: '400px'}" 
      :livetitle="'直播'"
      v-if="openLiveList[0].teamList"></live-list>
    <div v-else class="live-header">
      <p class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
    </div>
      <akina-list
        :type="0" :list="akinaVideos"
        :rect="{width:'300px',height:'180px',maxWidth: '400px'}" 
        :livetitle="'录播'"
      ></akina-list>
    <div class="button" @click="getMoreAkina">
      <i class="el-icon-arrow-down" v-if="akinaVideos[0]"></i>
    </div>
  </div>
</template>

<script>
  import liveList from '../subComponents/liveList'
  import akinaList from '../subComponents/akinaList'
  import {mapState} from 'vuex'
export default {
  name: "openlive",
  data() {
    return {
      limit: 8,
      openLiveList: []
    };
  },
  methods: {
    async getOpenLive() { // 获取公演列表
      const res = await this.ajax('getOpenLive')
      this.openLiveList = res.content.liveList
    },
    async getMoreAkina(){ // 获取B站up寒影AkiNa录播
      this.limit += 8
      this.$store.dispatch('getAkinaVideos',{limit:this.limit})
    }
  },
  created() {
    this.getOpenLive();
  },
  components: {
    liveList,
    akinaList
  },
  computed: {
    ...mapState(['akinaVideos'])
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.open-live-container {
  .live-header{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 320px;
    .alt_icon{
      width: 1160px;
    }
  }
  .button{
    .button-container();
    .flex-all-center();
  }
}
</style>