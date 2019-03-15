<template>
  <div>
    <el-form inline class="radio-list">
      <el-form-item>
        <el-select v-model="group">
          <el-option value="SNH48">SNH48</el-option>
          <el-option value="BEJ48">BEJ48</el-option>
          <el-option value="GNZ48">GNZ48</el-option>
          <el-option value="SNH48_7SENSES">7SENSES</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input type="number" v-model="num" placeholder="请输入要显示结果数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getMusicList">确定</el-button>
        <el-button @click="playOrPause" v-if="isPaused">播放</el-button>
        <el-button @click="playOrPause" v-else>暂停</el-button>
      </el-form-item>
    </el-form>
    <div class="music-list">
      <div class="music-item my-card" v-for="(item, i) in list" :key="i" @click="getPlayUrl(item.songmid)">
        <img
          class="image"
          :src="
          'http://imgcache.qq.com/music/photo/album_300/' +
            (item.albumid % 100) +
            '/300_albumpic_' +
            item.albumid +
            '_0.jpg'
        "
          alt
        >
        <div class="songinfo">
          <p class="songname" :title="item.songname" v-html="item.songname"></p>
          <p class="singername" v-html="item.singer[0].name"></p>
        </div>
      </div>
    </div>
    <audio src="none" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: "music",
  data() {
    return {
      list: [],
      group: 'SNH48',
      num: 30,
      isPaused: true
    };
  },
  methods: {
    getMusicList() {
      this.axios.get("/api/getMusicList?group=" + this.group + '&num=' + this.num).then(res => {
        let datas = res.data
        datas = datas.substring(9,datas.length-1)
        datas = JSON.parse(datas)
        this.list = datas.data.song.list
      });
    },
    getPlayUrl(songmid) {
      this.axios.get("/api/getPlayUrl?songmid=" + songmid).then(res => {
        this.$refs.audio.src =
          "http://ws.stream.qqmusic.qq.com/" +
          res.data.data.items[0].filename +
          "?fromtag=0&guid=126548448&vkey=" +
          res.data.data.items[0].vkey;
        this.$refs.audio.play();
        this.isPaused = false
      });
    },
    playOrPause(){
      if(this.$refs.audio.src === 'http://localhost:8080/none'){
        this.getPlayUrl(this.list[0].songmid)
        this.isPaused = false
      }else{
        if(this.isPaused){
          this.$refs.audio.play()
          this.isPaused = false
        }else{
          this.$refs.audio.pause()
          this.isPaused = true
        }
      }
    }
  },
  created() {
    this.getMusicList();
  }
};
</script>

<style lang="less" scoped>
  .radio-list{
    padding-bottom: 0px;
  }
.music-list{
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  margin-top: -5px;
  .music-item {
    flex: 1;
    margin: 5px;
    display: flex;
    flex-direction: column;
    min-width: 120px;
    max-width: 206px;
    justify-content: space-between;
    align-items: center;
    &:hover{
      background-color: #eee;
      box-shadow: 0 0 5px #ccc;
      cursor: pointer;
    }
    .image {
      width: 100%;
    }
    .songinfo {
      text-align: center;
      .songname{
        font-size: 14px;
        max-height: 20px;
        overflow: hidden;
      }
      .singername {
        font-size: 12px;
        height: 25px;
        color: #999;
      }
    }
  }
}
</style>
