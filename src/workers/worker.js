import groupHandler from './groupHandler'
import ajax from '../plugins/ajax'

export default function () {
  return new Promise((resolve) => {
    ajax('/getAllMemberList')
      .then(res => {
        console.log(res)
        let memberList = res.content.starInfo
        let teamList = res.content.teamInfo
        groupHandler(memberList, teamList)
        localStorage.setItem('database', JSON.stringify({
          dataFlag: true,
          timeStamp: Date.now()
        }))
        resolve(true)
      })
  })
}