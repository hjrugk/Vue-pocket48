const express = require('express')
const api = require('./api.js')
const bodyParser = require('body-parser')
const getData = require('./request')

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
    res.send(html)
  })
})

// 获取所有直播信息
app.get('/api/getAllLive', (req, res) => {
  const allLive_postData = api.allLive_postData()

  const allLive_options = api.allLive_options(allLive_postData)

  getData(allLive_postData,allLive_options,html => {
    res.send(html)
  })
})

app.listen(3000, ()=>{
  console.log('Server is running')
})