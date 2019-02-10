const express = require('express')
const api = require('./api.js')
const bodyParser = require('body-parser')
const getData = require('./request')
const groupHandler = require('./groupHandler')
const http = require('http')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 获取qq音乐top100
app.get('/api/getMusicList', (req,res) => {
  getData(null,api.top, (html) => {
    res.send(html)
  })
})

// 获取qq音乐播放链接
app.get('/api/getPlayUrl', (req,res) => {
  getData(null,api.vkey(req), html => {
      res.send(html)
  });
})

// 获取成员房间留言
app.post('/api/getRoomBoard', (request,res) => {
  const board_postData = api.board_postData(request)

  const board_options = api.board_options(request,board_postData);

  getData(board_postData,board_options,(html) => {
    res.send(html)
  })
})

// 登录口袋48，获取token
app.post('/api/login', (req,res) => {
  const login_postData = api.login_postData(req)

  const login_options = api.login_options(login_postData)

  getData(login_postData,login_options,(html) => {
    res.send(html)
  })
})

// 获取关注成员列表
app.post('/api/getRoomList', (req, res) => {
  const room_postData = api.room_postData(req)

  const room_options = api.room_options(req,room_postData)

  getData(room_postData,room_options,(html) => {
    res.send(html)
  })
})

// 获取所有成员信息
app.get('/api/allmemberinfo', (req, res) => {
  const members_postData = api.members_postData()

  const members_options = api.members_options(members_postData)

  getData(members_postData,members_options,html => {
    const group = groupHandler(JSON.parse(html).content.memberInfo)
    res.send(group[req.query.group])
  })
})

app.get('/api/allgroupinfo', (req, res) => {
  const members_postData = api.members_postData()

  const members_options = api.members_options(members_postData)

  getData(members_postData,members_options,html => {
    res.send(JSON.parse(html).content.group)
  })
})

// 获取所有直播信息
app.get('/api/getAllLive', (req, res) => {
  const allLive_postData = api.allLive_postData(req)

  const allLive_options = api.allLive_options(allLive_postData)

  getData(allLive_postData,allLive_options,html => {
    res.send(html)
  })
})

app.get('/api/getOpenLive', (req,res) => {
  const openLive_postData = api.openLive_postData(req)

  const openLive_options = api.openLive_options(openLive_postData)

  getData(openLive_postData,openLive_options,html => {
    res.send(html)
  })
})

app.get('/api/getLivePage', (req,res) => {
  const livePage_postData = api.livePage_postData(req)

  const livePage_options = api.livePage_options(livePage_postData)

  getData(livePage_postData,livePage_options,html => {
    res.send(html)
  })
})

app.post('/api/getComments', (req,res) => {
  const comment_postData = api.comment_postData(req)

  const comment_options = api.comment_options(req,comment_postData)

  getData(comment_postData,comment_options,html => {
    res.send(html)
  })
})

app.listen(3000, ()=>{
  console.log('Server is running')
})