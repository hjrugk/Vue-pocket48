const api = {
  top: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923",
  random: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472",
  vkey: (req) => {
    return "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=" + req.query.songmid + '&filename=C400' + req.query.songmid + '.m4a&guid=126548448'
  },
  board_postData: (request) => {
    return JSON.stringify({
      "roomId":request.body.roomID, //房间id, 详见roomList
      "chatType":0,
      "lastTime":Date.now(), //截止时间
      "limit":request.body.limit || 10 //数量上限
    })
  },
  board_options: (request,postData) => {
    return {
      host: 'pjuju.48.cn',
      port: '',
      path: '/imsystem/api/im/v1/member/room/message/mainpage',
      method: 'POST',
      headers: {
        "imei": "355757010989529",
        token: request.body.token.replace(/\s/g,'+'),
        build: 167,
        os: "android",
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
  },
  login_postData: (request) => {
    return JSON.stringify({
      "password":request.body.password, //密码
      "account":request.body.account, //用户名
      "longitude":0,
      "latitude":0
    })
  },
  login_options: (postData) => {
    return {
      host: 'puser.48.cn',
      port: '',
      path: '/usersystem/api/user/v1/login/phone',
      method: 'POST',
      headers: {
        "imei": "355757010989529",
        token: '',
        build: 167,
        os: "android",
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
  },
  room_postData: (req) => {
    return JSON.stringify({
      "friends": req.body.friends
    })
  },
  room_options: (req,postData) => {
    return {
      host: 'pjuju.48.cn',
      port: '',
      path: '/imsystem/api/im/room/v1/login/user/list',
      method: 'POST',
      headers: {
        "imei": "355757010989529",
        token: req.body.token,
        build: 167,
        os: "android",
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
  },
  members_postData: () => {
    return JSON.stringify({
      "videoTypeUtime": "2010-03-24 15:59:11",
      "musicAlbumUtime": "2010-04-18 14:45:37",
      "functionUtime": "2010-10-17 15:00:00",
      "groupUtime": "2010-10-17 17:27:00",
      "memberInfoUtime": "2010-10-20 11:55:09",
      "talkUtime": "2010-05-05 18:04:52",
      "videoUtime": "2010-05-17 18:36:32",
      "musicUtime": "2010-05-05 15:56:11",
      "urlUtime": "2010-07-19 12:10:59",
      "teamUtime": "2010-10-20 10:39:00",
      "memberPropertyUtime": "2010-02-20 18:57:48",
      "periodUtime": "2010-10-14 14:45:00"
    })
  },
  members_options: (postData) => {
    return {
      host: 'psync.48.cn',
      port: '',
      path: '/syncsystem/api/cache/v1/update/overview',
      method: 'POST',
      headers: {
        os: "android",
        version: "5.3.1",
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
  },
  allLive_postData: () => {
    return JSON.stringify({
      "lastTime": 0, //截止时间,毫秒时间戳,0为当前
      "groupId": 0, //团体id,详见syncsystemOverview
      "type": 0,
      "memberId": 0, //成员id,详见syncsystemOverview
      "giftUpdTime": Date.now(), //礼物更新时间，用于更新礼物
      "limit": 20 //录播获取数量上限
    })
  },
  allLive_options: (postData) => {
    return {
      host: 'plive.48.cn',
      port: '',
      path: '/livesystem/api/live/v1/memberLivePage',
      method: 'POST',
      headers: {
        os: "android",
        version: "5.0.1",
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
  }
}

module.exports = api