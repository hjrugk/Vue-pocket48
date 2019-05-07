const https = require('https')

module.exports =  (postData, options) => new Promise((reolve, reject) => {
  const req = https.request(options, response => {
    response.setEncoding('utf8');
    let html = ''
    response.on('data', (chunk) => {
      html += chunk
    });
    response.on('end', () => {
      reolve(html)
    });
  })

  req.on('error', (e) => {
    reject(e.message);
  });

  req.write(postData);
  req.end();
});