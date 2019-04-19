const getData = require('./request')

const barrage = {
  times: [],
  lyrics: [],
  index: -1,
  zeroTime: 0,
  loadLrc: function (url, callback) {
    getData(JSON.stringify(null), url, (html) => {
      this.parseLrc(html, () => {
        callback({
          times: this.times,
          barrages: this.lyrics
        })
      })
    })
  },
  parseLrc: function (data, callback) {
    this.times = [];
    this.lyrics = [];
    let array = data.split("\n");
    //遍历每一行歌词
    array.map(item => {
      let res = item.split(']');
      let timestr = res[0].split('[')[1];
      if (timestr) {
        let res2 = timestr.split(":");
        let hour = parseInt(res2[0]) * 60 * 60
        let min = parseInt(res2[1]) * 60;
        let sec = parseFloat(res2[2]);
        let time = parseFloat((hour + min + sec).toFixed(2));
        this.times.push(time)
      }
      // //提取歌词
      if (res[1]) {
        let lrc = res[1];
        let barrageObj = lrc.split('\t')
        this.lyrics.push({
          name: barrageObj[0],
          content: barrageObj[1]
        });
      }
    });
    //保存第一句歌词时间
    this.zeroTime = this.times[0];
    callback()

  }
}

module.exports = barrage