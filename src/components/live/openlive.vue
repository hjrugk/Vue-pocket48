<template>
  <div class="open-live-container">
    <div v-if="!openLiveList[0]" class="live-header">
      <p class="alt_icon">
        <i class="el-icon-loading"></i>
      </p>
    </div>
    <live-list 
      :type="0" :list="openLiveList" 
      :rect="{width:'400px',height:'230px',maxWidth: '600px'}" 
      :livetitle="'直播'"
      v-else></live-list>
      <akina-list
        :type="0" :list="akinaVideos"
        :rect="{width:'400px',height:'230px',maxWidth: '600px'}" 
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
  padding: 10px;
  .live-header{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 320px;
    .alt_icon{
      width: 85%;
    }
  }
  .button{
    .button-container();
    .flex-all-center();
  }
}
</style>