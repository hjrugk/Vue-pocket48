const https = require('https')

module.exports = function (postData, options, callback) {
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
  } else {
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