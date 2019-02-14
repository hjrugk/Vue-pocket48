export function splitTeam(team) {
  let subTeam = []
  switch (team) {
    case '1000':
      subTeam = ['SII','NII','HII','X','XII','FT','预备生']
      break
    case '1100':
      subTeam = ['B','E','J','预备生']
      break
    case '1200':
      subTeam = ['G','NIII','Z','预备生']
      break
    case '1300':
      subTeam = ['S','H','预备生']
      break
    case '1400':
      subTeam = ['C','K','预备生']
      break
    case '1500':
      subTeam = ['IDFT']
      break
    case '1600':
      subTeam = ['海外练习生']
      break
    case '998':
      subTeam = ['明星殿堂']
      break
    case '-1':
      subTeam = ['官方账号']
      break
    default:
      subTeam = ['全部成员']
  }
  return subTeam
}
export function transformGroupId(group) {
  switch (group.toLowerCase()) {
    case 'snh48':
      group = '1000'
      break
    case 'bej48':
      group = '1100'
      break
    case 'gnz48':
      group = '1200'
      break
    case 'shy48':
      group = '1300'
      break
    case 'ckg48':
      group = '1400'
      break
    case 'idft':
      group = '1500'
      break
    case '海外练习生':
      group = '1600'
      break
    case 'other':
      group = '-1'
      break
    case 'legend':
      group = '998'
      break
    default:
      group = '1'
  }
  return group
}
export function transformGroupName(id) {
  let name = ''
  switch (id) {
    case '1000':
      name = 'snh'
      break
    case '1100':
      name = 'bej'
      break
    case '1200':
      name = 'gnz'
      break
    case '1300':
      name = 'shy'
      break
    case '1400':
      name = 'ckg'
      break
    case '1500':
      name = 'idft'
      break
    case '1600':
      name = 'oversea'
      break
    case '998':
      name = 'legend'
      break
    case '-1':
      name = 'other'
      break
    default:
      name = 'all'
  }
  return name
}