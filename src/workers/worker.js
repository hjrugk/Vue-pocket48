import groupHandler from './groupHandler'

export default function(){
  return new Promise((resolve) => {
    fetch('./dataBase.json')
      .then(res => res.json())
      .then(data => {
        let memberList = data.content.starInfo
        let teamList = data.content.teamInfo
        groupHandler(memberList,teamList)
        localStorage.setItem('database',JSON.stringify({dataFlag:true,timeStamp:Date.now()}))
        resolve(true)
      })
  })
}