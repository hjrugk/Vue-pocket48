<template>
  <div>
    <el-form inline  class="radio-list">
      <el-form-item>
        <el-select v-model="group">
          <el-option value="SNH48">SNH48</el-option>
          <el-option value="BEJ48">BEJ48</el-option>
          <el-option value="GNZ48">GNZ48</el-option>
          <el-option value="7SENSES">7SENSES</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input type="number" v-model="num" placeholder="请输入要显示结果数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getMusicList">确定</el-button>
      </el-form-item>
    </el-form>
    <div class="my-card" v-for="(item, i) in list" :key="i">
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
        <p class="songname" v-html="item.songname"></p>
        <p class="singername" v-html="item.singer[0].name"></p>
      </div>
      <el-button type="text" @click="getPlayUrl(item.songmid)">播放</el-button>
    </div>
    <audio src ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: "qqmusic",
  data() {
    return {
      list: [],
      group: 'SNH48',
      num: 30
    };
  },
  methods: {
    getMusicList() {
      // if (localStorage.getItem("musicList")) {
      //   this.list = JSON.parse(localStorage.getItem("musicList"));
      // } else {
      this.axios.get("/api/getMusicList?group=" + this.group + '&num=' + this.num).then(res => {
        let datas = res.data
        datas = datas.substring(9,datas.length-1)
        datas = JSON.parse(datas)
        this.list = datas.data.song.list
      });
      // }
    },
    getPlayUrl(songmid) {
      this.axios.get("/api/getPlayUrl?songmid=" + songmid).then(res => {
        this.$refs.audio.src =
          "http://ws.stream.qqmusic.qq.com/" +
          res.data.data.items[0].filename +
          "?fromtag=0&guid=126548448&vkey=" +
          res.data.data.items[0].vkey;
        this.$refs.audio.play();
      });
    }
  },
  created() {
    this.getMusicList();
  }
};
</script>

<style lang="less" scoped>
.my-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image {
    width: 80px;
    height: 80px;
  }
  .songinfo {
    text-align: center;
    .singername {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
