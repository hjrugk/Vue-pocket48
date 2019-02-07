const https = require('https')
const querystring = require('querystring')
const url = require('url')

const postData = JSON.stringify({
  "roomId":18863978, //房间id, 详见roomList
  "chatType":0,
  "lastTime":Date.now(), //截止时间
  "limit":10 //数量上限
})

const options = {
  host: 'pjuju.48.cn',
  port: '',
  path: '/imsystem/api/im/v1/member/room/message/mainpage',
  method: 'POST',
  headers: {
    "imei": "355757010989529",
    token: "XYgqASaLsEJtGai73dAhFrA/zExY+a+QV6RbKoEH0Gmw8+mUssEMebmvWsyRu+TgOY4eAF9ifbM\u003d",
    build: 167,
    os: "android",
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, response => {
  response.setEncoding('utf8');
  let html = ''
  response.on('data', (chunk) => {
    html += chunk
  });
  response.on('end', () => {
    console.log(html)
  });
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();