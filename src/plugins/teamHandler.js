export function splitTeam(team) {
  let subTeam = []
  switch (team) {
    case '1000':
      subTeam = [
        {name:'SII',color:"90CCEA"},
        {name:'NII',color:"AD85BA"},
        {name:'HII',color:"F39800"},
        {name:'X',color:"B1D61B"},
        {name:'XII',color:"00BE6E"},
        {name:'FT',color:"41b400"},
        {name:'预备生',color:"a7b0ba"}]
      break
    case '1100':
      subTeam = [{name:'B',color:"FF2471"}, {name:'E',color:"0CC8C3"}, {name:'J',color:"006ab7"}, {name:'预备生',color:"a7b0ba"}]
      break
    case '1200':
      subTeam = [{name:'G',color:"AAC913"}, {name:'NIII',color:"FFD700"}, {name:'Z',color:"ea627c"}, {name:'预备生',color:"a7b0ba"}]
      break
    case '1300':
      subTeam = [{name:'SIII',color:"e70095"}, {name:'HIII',color:"4f008c"}, {name:'预备生',color:"a7b0ba"}]
      break
    case '1400':
      subTeam = [{name:'C',color:"9d6124"}, {name:'K',color:"ff5043"}, {name:'预备生',color:"a7b0ba"}]
      break
    case '1500':
      subTeam = [{name:'IDFT',color:"b4006e"}]
      break
    case '1600':
      subTeam = [{name:'海外练习生',color:"a7b0ba"}]
      break
    case '998':
      subTeam = [{name:'明星殿堂',color:"a7b0ba"}]
      break
    case '-1':
      subTeam = [{name:'官方账号',color:"a7b0ba"}]
      break
    default:
      subTeam = [{name:'全部成员',color:"a7b0ba"}]
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