import openDB from './openDB'

export default async function(membersList,teamList) {
  const snh = []
  const bej = []
  const gnz = []
  const shy = []
  const ckg = []
  const idft = []
  const oversea = []
  const other = []
  const legend = []
  const jxl = []
  const ut = []
  const zt = []
  const ylc = []
  const gr = []
  const zb = []
  const hw = []
  const qt = [{teamName:'官方账号',color:'90CCEA',groupId:0}]
  const mx = [{team_name:'明星殿堂',color:'48474F',groupId:999}]

  let myDB = await openDB('group',1)
  let memberTransaction=myDB.transaction('members','readwrite');
  let memberStore=memberTransaction.objectStore('members');

  membersList.forEach(item => {
    memberStore.add(item);
    switch (parseInt(item.groupId)) {
      case 10:
        snh.push(item)
        break
      case 11:
        bej.push(item)
        break
      case 12:
        gnz.push(item)
        break
      case 13:
        shy.push(item)
        break
      case 14:
        ckg.push(item)
        break
      case 15:
        idft.push(item)
        break
      case 16:
        oversea.push(item)
        break
      case 0:
        other.push(item)
        break
      default:
        legend.push(item)
    }
  })
  
  teamList.forEach(item => {
    switch (parseInt(item.groupId)) {
      case 10:
        jxl.push(item)
        break
      case 11:
        ut.push(item)
        break
      case 12:
        zt.push(item)
        break
      case 13:
        ylc.push(item)
        break
      case 14:
        gr.push(item)
        break
      case 15:
        zb.push(item)
        break
      case 16:
        hw.push(item)
        break
    }
  })
  
  let groupList = [
    {name: '1000',member:snh,team: jxl},
    {name: '1100',member:bej,team: ut},
    {name: '1200',member:gnz,team: zt},
    {name: '1300',member:shy,team: ylc},
    {name: '1400',member:ckg,team: gr},
    {name: '1500',member:idft,team: zb},
    {name: '1600',member:oversea,team: hw},
    {name: '-1',member:other,team: qt},
    {name: '998',member:legend,team: mx},
    {name: '1',member:membersList,team: teamList}
  ]
  
  let groupTransaction = myDB.transaction('groups','readwrite')
  let groupStore = groupTransaction.objectStore('groups')

  groupList.forEach(item => {
    groupStore.add(item)
  })
}