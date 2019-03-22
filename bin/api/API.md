# API

1. 最新音乐排行榜 TOP100

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`

2. 随机推荐

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472`

3. 音乐搜索

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱`
   * 参数：
  
     * p 页数
     * n 每页结果数
     * w 搜索关键词

4. 专辑封面

   * 拼接URL `"http://imgcache.qq.com/music/photo/album_300/" + albumid%100 + "/300_albumpic_" + albumid + "_0.jpg"`

5. 播放地址

   * 获取token

     * 请求方法 `GET`
     * 请求地址 `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' + songmid + '&filename=C400' + songmid + '.m4a&guid=126548448`
     * 参数

       * `songmid` 获取到的 `songmid`
       * `filename` 拼接方式为 `'C400' + songid + '.m4a'`

     * 数据格式

      ```json
      res.data
        cid: 205361747
        code: 0
        data:
          expiration: 80400
          items: Array(1)
            0:
              filename: "C400003u97bM1qKjX6.m4a"
              songmid: "003u97bM1qKjX6"
              subcode: 0
              vkey: "4C16B86489CEF164085F999780790433A060034B93B40EB6AD67A8C96D1AB47E2B43BDF6A7C797E75BFB03DD8FD1B9A5843AFCB3E58BD68D"
        userip: "117.132.38.138"
      ```

   * 播放地址拼接 `'http://ws.stream.qqmusic.qq.com/' + filename+'?fromtag=0&guid=126548448&vkey=' + vkey`  