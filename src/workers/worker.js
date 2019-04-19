import groupHandler from './groupHandler'

export default function () {
  const URL = "https://pocketapi.48.cn/user/api/v1/client/update/group_team_star"

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Host': 'pocketapi.48.cn',
      'accept': '*/*',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'User-Agent': 'PocketFans201807/6.0.0 (iPhone; iOS 12.2; Scale/2.00)',
      'Accept-Encoding': 'gzip, deflate',
      'appInfo': JSON.stringify({
        "vendor": "apple",
        "deviceId": "0",
        "appVersion": "6.0.0",
        "appBuild": "190409",
        "osVersion": "12.2.0",
        "osType": "ios",
        "deviceName": "iphone",
        "os": "ios"
      })
    },
    body: JSON.stringify({})
  }
  return new Promise((resolve) => {
    fetch(URL, options)
      .then(res => res.json())
      .then(data => {
        let memberList = data.content.starInfo
        let teamList = data.content.teamInfo
        groupHandler(memberList, teamList)
        localStorage.setItem('database', JSON.stringify({
          dataFlag: true,
          timeStamp: Date.now()
        }))
        resolve(true)
      })
  })
}