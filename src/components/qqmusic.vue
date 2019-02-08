<template>
  <div>
    <div class="el-card" v-for="(item, i) in list" :key="i">
      <img
        class="image"
        :src="
          'http://imgcache.qq.com/music/photo/album_300/' +
            (item.data.albumid % 100) +
            '/300_albumpic_' +
            item.data.albumid +
            '_0.jpg'
        "
        alt=""
      />
      <div class="songinfo">
        <p class="songname" v-html="item.data.songname"></p>
        <p class="singername" v-html="item.data.singer[0].name"></p>
      </div>
      <el-button
        type="text"
        @click="getPlayUrl(item.data.songmid)"
        >播放</el-button
      >
    </div>
    <audio src ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: "qqmusic",
  data() {
    return {
      list: []
    };
  },
  methods: {
    getMusicList() {
      // if (localStorage.getItem("musicList")) {
      //   this.list = JSON.parse(localStorage.getItem("musicList"));
      // } else {
        this.axios.get("/api/getMusicList").then(res => {
          this.list = res.data.songlist;
          // localStorage.setItem("musicList", JSON.stringify(res.data.songlist));
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
.el-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image {
    width: 80px;
    height: 80px;
  }
  .songinfo{
    text-align: center;
    .singername{
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
