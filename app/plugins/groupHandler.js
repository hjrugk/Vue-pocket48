const Group = require('../schema/groupSchema')

module.exports = function (membersList) {
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

  new Group({name: '1000',list:snh}).save()
  new Group({name: '1100',list:bej}).save()
  new Group({name: '1200',list:gnz}).save()
  new Group({name: '1300',list:shy}).save()
  new Group({name: '1400',list:ckg}).save()
  new Group({name: '1500',list:idft}).save()
  new Group({name: '1600',list:oversea}).save()
  new Group({name: '-1',list:other}).save()
  new Group({name: '998',list:legend}).save()

  return {
    '1000': snh,
    '1100': bej,
    '1200': gnz,
    '1300': shy,
    '1400': ckg,
    '1500': idft,
    '1600': oversea,
    '-1': other,
    '998': legend,
    '1': membersList
  }
}