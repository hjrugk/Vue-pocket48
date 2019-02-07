const https= require('https');
const express = require('express')
const api = require('./api.js')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api/getMusicList', (req,res) => {
  https.get(api.top, response => {
    let html = ''
    response.on('data',chunk=>{
      html += chunk
    })
    response.on('end',()=>{
      res.send(html)
    })
  });
})

app.get('/api/getPlayUrl', (req,res) => {
  https.get(api.vkey + req.query.songmid + '&filename=C400' + req.query.songmid + '.m4a&guid=126548448', response => {
    let html = ''
    response.on('data',chunk=>{
      html += chunk
    })
    response.on('end',()=>{
      res.send(html)
    })
  });
})

app.post('/api/getRoomBoard', (request,res) => {
  const room_postData = JSON.stringify({
    "roomId":request.body.roomID, //房间id, 详见roomList
    "chatType":0,
    "lastTime":Date.now(), //截止时间
    "limit":request.body.limit || 10 //数量上限
  })

  const room_options = {
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
      'Content-Length': Buffer.byteLength(room_postData)
    }
  };

  const req = https.request(room_options, response => {
    response.setEncoding('utf8');
    let html = ''
    response.on('data', (chunk) => {
      html += chunk
    });
    response.on('end', () => {
      res.send(html)
    });
  })

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

// write data to request body
  req.write(room_postData);
  req.end();
})


app.post('/api/login', (request, res) => {
  const login_postData = JSON.stringify({
    "password":request.body.password, //密码
    "account":request.body.account, //用户名
    "longitude":0,
    "latitude":0
  })

  const login_options = {
    host: 'puser.48.cn',
    port: '',
    path: '/usersystem/api/user/v1/login/phone',
    method: 'POST',
    headers: {
      "imei": "355757010989529",
      token: "0",
      build: 167,
      os: "android",
      'Content-Type': 'application/json;charset=utf-8',
      'Content-Length': Buffer.byteLength(login_postData)
    }
  }

  const req = https.request(login_options, response => {
    response.setEncoding('utf8');
    let html = ''
    response.on('data', (chunk) => {
      html += chunk
    });
    response.on('end', () => {
      res.send(html)
    });
  })
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

// write data to request body
  req.write(login_postData);
  req.end();
})

app.post('/api/getRoomList', (request, res) => {
  const room_postData = JSON.stringify({
    "friends": request.body.friends
  })

  const room_options = {
    host: 'pjuju.48.cn',
    port: '',
    path: '/imsystem/api/im/room/v1/login/user/list',
    method: 'POST',
    headers: {
      "imei": "355757010989529",
      token: request.body.token,
      build: 167,
      os: "android",
      'Content-Type': 'application/json;charset=utf-8',
      'Content-Length': Buffer.byteLength(room_postData)
    }
  }

  const req = https.request(room_options, response => {
    response.setEncoding('utf8');
    let html = ''
    response.on('data', (chunk) => {
      html += chunk
    });
    response.on('end', () => {
      res.send(html)
    });
  })
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

// write data to request body
  req.write(room_postData);
  req.end();
})

app.listen(3000, ()=>{
  console.log('Server is running')
})