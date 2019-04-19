const express = require('express');
const api = require('../api/api')
const getData = require('../plugins/request')
const downloadFile = require('../plugins/downloadFile')
const fs = require('fs')
const barrage = require('../plugins/barrage')
const http = require('http')
const path = require('path')

let router = express.Router()

//设置允许跨域访问该服务.
router.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// 获取qq音乐top100
router.get('/api/getMusicList', (req, res) => {
  getData(JSON.stringify(null), api.keySearch(req), (html) => {
    res.send(html)
  })
})

// 获取qq音乐播放链接
router.get('/api/getPlayUrl', (req, res) => {
  getData(JSON.stringify(null), api.vkey(req), html => {
    res.send(html)
  });
})

// 获取成员房间留言
router.post('/api/getRoomBoard', (request, res) => {
  const board_postData = api.board_postData(request)

  const board_options = api.board_options(request, board_postData);

  getData(board_postData, board_options, (html) => {
    res.send(html)
  })
})

// 登录口袋48，获取token
router.post('/api/login', (req, res) => {
  const login_postData = api.login_postData(req)

  const login_options = api.login_options(login_postData)

  getData(login_postData, login_options, (html) => {
    res.send(html)
  })
})

router.post('/api/checkToken', (req, res) => {
  const token_postData = api.token_postData(req)

  const token_options = api.token_options(req)

  getData(token_postData, token_options, (html) => {
    res.send(html)
  })
})

// 获取关注成员列表
router.post('/api/getRoomList', (req, res) => {
  const room_postData = api.room_postData(req)

  const room_options = api.room_options(req, room_postData)

  getData(room_postData, room_options, (html) => {
    res.send(html)
  })
})

// 获取所有直播信息
router.get('/api/getAllLive', (req, res) => {
  const allLive_postData = api.allLive_postData(req)

  const allLive_options = api.allLive_options(allLive_postData)

  getData(allLive_postData, allLive_options, html => {
    res.send(html)
  })
})

// 获取公演直播
router.get('/api/getOpenLive', (req, res) => {
  const openLive_postData = api.openLive_postData(req)

  const openLive_options = api.openLive_options(openLive_postData)

  getData(openLive_postData, openLive_options, html => {
    res.send(html)
  })
})

// 获取直播详情
router.get('/api/getLivePage', (req, res) => {
  const livePage_postData = api.livePage_postData(req)

  const livePage_options = api.livePage_options(livePage_postData)

  getData(livePage_postData, livePage_options, html => {
    res.send(html)
  })
})

router.get('/api/getOpenPage', (req, res) => {
  const openPage_postData = api.openPage_postData(req)

  const openPage_options = api.openPage_options(openPage_postData)

  getData(openPage_postData, openPage_options, html => {
    res.send(html)
  })
})

// 获取成员房间留言
router.post('/api/getComments', (req, res) => {
  const comment_postData = api.comment_postData(req)

  const comment_options = api.comment_options(req, comment_postData)

  getData(comment_postData, comment_options, html => {
    res.send(html)
  })
})

// 登陆打卡
router.post('/api/getCheck', (req, res) => {
  const check_postData = api.check_postData()

  const check_options = api.check_options(req, check_postData)

  getData(check_postData, check_options, html => {
    res.send(html)
  })
})

// 翻牌内容
router.post('/api/getAnswer', (req, res) => {
  const flip_postData = api.flip_postData(req)

  const flip_options = api.flip_options(req, flip_postData)

  getData(flip_postData, flip_options, html => {
    res.send(html)
  })
})

// 成员房间语音留言
router.post('/api/getAudio', (req, res) => {
  downloadFile(req.body.url, path.join(__dirname, '../../Cache/pocket-room-audio.amr'), () => {
    let str = fs.readFileSync(path.join(__dirname, '../../Cache/pocket-room-audio.amr'))
    res.send({
      status: 200,
      message: str.toString('base64')
    })
  })
})

// 获取弹幕
router.post('/api/getBarrages', (req, res) => {
  barrage.loadLrc(req.body.url, function (data) {
    res.send(data)
  })
})

// 获取聚聚信息
router.post('/api/getUserInfo', (req, res) => {
  const userInfo_postData = api.userInfo_postData(req)
  const userInfo_options = api.userInfo_options(req)
  getData(userInfo_postData, userInfo_options, html => {
    res.send(html)
  })
})

// 获取轮播图
router.get('/api/getForSwipeAds', (req, res) => {
  http.get('http://www.snh48.com/js/topFlashImg.js', response => {
    let html = ''
    response.on('data', chunk => {
      html += chunk
    })
    response.on('end', () => {
      res.send(html)
    })
  });
})

// 从B站获取公演录播
router.get('/api/getAkinaVideos', (req, res) => {
  getData(JSON.stringify(null), api.akina_options(req), html => {
    res.send(html)
  })
})

router.post('/api/getRoomInfo', (req, res) => {
  const roomInfo_postData = api.roomInfo_postData(req)
  const roomInfo_options = api.roomInfo_options(req)
  getData(roomInfo_postData, roomInfo_options, html => {
    res.send(html)
  })
})

module.exports = router;