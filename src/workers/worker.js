import groupHandler from './groupHandler'

export default function(){
  return new Promise((resolve) => {
    const options = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        version: '5.3.1',
        os: 'Android',
        'Content-Length': 530
      },
      body: JSON.stringify({
        "videoTypeUtime": "2010-03-24 15:59:11",
        "musicAlbumUtime": "2010-04-18 14:45:37",
        "functionUtime": "2010-10-17 15:00:00",
        "groupUtime": "2010-10-17 17:27:00",
        "memberInfoUtime": "2010-10-20 11:55:09",
        "talkUtime": "2010-05-05 18:04:52",
        "videoUtime": "2010-05-17 18:36:32",
        "musicUtime": "2010-05-05 15:56:11",
        "urlUtime": "2010-07-19 12:10:59",
        "teamUtime": "2010-10-20 10:39:00",
        "memberPropertyUtime": "2010-02-20 18:57:48",
        "periodUtime": "2010-10-14 14:45:00"
      })
    }
    fetch('https://psync.48.cn/syncsystem/api/cache/v1/update/overview',options)
      .then(res => res.json())
      .then(data => {
        let memberList = data.content.memberInfo
        let teamList = data.content.team
        groupHandler(memberList,teamList)
        localStorage.setItem('database',JSON.stringify({dataFlag:true,timeStamp:Date.now()}))
        resolve(true)
      })
  })
}