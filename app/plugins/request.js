const https = require('https')

module.exports = function (postData, options, callback) {
  // 判断是否需要发送数据
  if (postData) {
    const req = https.request(options, response => {
      response.setEncoding('utf8');
      let html = ''
      response.on('data', (chunk) => {
        html += chunk
      });
      response.on('end', () => {
        callback(html)
      });
    })

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
  } else { // 没有发送数据，发送get请求
    https.get(options, response => {
      let html = ''
      response.on('data', chunk => {
        html += chunk
      })
      response.on('end', () => {
        callback(html)
      })
    });
  }
};