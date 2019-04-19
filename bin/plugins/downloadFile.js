const fs = require('fs')
const request = require('request')

module.exports = function downloadFile(uri, filename, callback) {
  var stream = fs.createWriteStream(filename);
  request(uri).pipe(stream).on('close', callback);
}