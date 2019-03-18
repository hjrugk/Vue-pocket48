import axios from 'axios'
axios.defaults.baseURL = '/api'

export default function ajax (url, data={}, method='GET') {
  return new Promise((resolve, reject) => {
    // 执行ajax请求
    let promise
    if(method === 'GET'){
      // 准备query数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){ // 拼接请求地址
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' +  dataStr
      }
      promise = axios.get(url)
    }else {
      promise = axios.post(url,data)
    }
    // 成功执行resolve
    promise.then(response => {
      resolve(response.data)
    })
    .catch(error => { // 失败执行reject
      reject(error)
    })

  })
}