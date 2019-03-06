const Group = require('../schema/groupSchema')
const Member = require('../schema/memberSchema')

module.exports = function (membersList,teamList) {
  const snh = []
  const bej = []
  const gnz = []
  const shy = []
  const ckg = []
  const idft = []
  const oversea = []
  const other = []
  const legend = []
  membersList.forEach(item => {
    new Member({mid: item.member_id,info:item}).save()
    switch (parseInt(item.team / 100)) {
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

  const jxl = []
  const ut = []
  const zt = []
  const ylc = []
  const gr = []
  const zb = []
  const hw = []
  const qt = []
  const mx = []
  teamList.forEach(item => {
    switch (parseInt(item.team_id / 100)) {
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
      case 0:
        qt.push(item)
        break
      default:
        mx.push(item)
    }
  })

  new Group({name: '1000',member:snh,team: jxl}).save()
  new Group({name: '1100',member:bej,team: ut}).save()
  new Group({name: '1200',member:gnz,team: zt}).save()
  new Group({name: '1300',member:shy,team: ylc}).save()
  new Group({name: '1400',member:ckg,team: gr}).save()
  new Group({name: '1500',member:idft,team: zb}).save()
  new Group({name: '1600',member:oversea,team: hw}).save()
  new Group({name: '-1',member:other,team: qt}).save()
  new Group({name: '998',member:legend,team: mx}).save()

  return {
    '1000': {member:snh,team:jxl},
    '1100': {member:bej,team: ut},
    '1200': {member:gnz,team: zt},
    '1300': {member:shy,team: ylc},
    '1400': {member:ckg,team: gr},
    '1500': {member:idft,team: zb},
    '1600': {member:oversea,team: hw},
    '-1': {member:other,team: qt},
    '998': {member:legend,team: mx},
    '1': {member:membersList,team:teamList}
  }
}