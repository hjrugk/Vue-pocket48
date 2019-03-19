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
        localStorage.setItem('database',JSON.stringify({dataFlag:true}))
        resolve(true)
      })
  })
}
async function groupHandler(membersList,teamList) {
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
  const qt = []
  const mx = []
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
  let myDB = await openDB('group',1)
  let memberTransaction=myDB.transaction('members','readwrite');
  let memberStore=memberTransaction.objectStore('members');
  membersList.forEach(item => {
    memberStore.add(item);
  })
  let groupTransaction = myDB.transaction('groups','readwrite')
  let groupStore = groupTransaction.objectStore('groups')
  groupList.forEach(item => {
    groupStore.add(item)
  })
}
function openDB(name,version){
  return new Promise((resolve,reject) => {
    let request = indexedDB.open(name,version);
    request.onerror = function() {
      reject("openDB error!");
    };
    request.onsuccess = function(e) {
      resolve(e.target.result)
    };
    request.onupgradeneeded = function(e) {
      let db = e.target.result;
      if(!db.objectStoreNames.contains('members')) {
        db.createObjectStore('members', {keyPath: 'member_id'});
        db.createObjectStore('groups', {keyPath: 'name'});
      }
    }
  })
}