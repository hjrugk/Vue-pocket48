import ajax from '../plugins/ajax'

export default {
  saveDetail({commit},info){
    commit('saveDetail',info)
  },
  async getAllLive({commit},{limit,id}){ // 获取成员直播
    const res = await ajax('getAllLive',{limit,id})
    let liveList = res.content.liveList || [];
    let reviewList = res.content.reviewList;
    commit('saveAllLive',{liveList,reviewList})
  },
  async getOpenReview({commit},{isReview,limit=8}) { // 获取公演录播
    const res = await ajax('getOpenLive',{isReview,limit})
    commit('saveOpenReview',{list:res.content.liveList})      
  },
  async getOpenLive({commit}) { // 获取公演直播
    const res = await ajax('getOpenLive')
    commit('saveOpenLive',{list:res.content.liveList})      
  },
  async getRoomList({commit},{ token, friends }) { // 获取关注成员房间列表
    const res = await ajax('/getRoomList',{ token, friends },'POST')
    commit('saveRoomList',{list:res.content})
  },
  async getSwipeAds({commit}){ // 从官网获取轮播图
    const res = await ajax('getForSwipeAds')
    let one = res.split('" </div>");')[0]
    let two = one.split('+')
    let adsList = []
    let list = [
      {url:two[3],img:two[4]},
      {url:two[8],img:two[9]},
      {url:two[13],img:two[14]},
      {url:two[18],img:two[19]},
      {url:two[23],img:two[24]},
      {url:two[28],img:two[29]}]
    list.map(item => {
      if(item.url && item.url.includes('http')){
        adsList.push(
          {
            url: 'http'+item.url.split('http')[1].split('target')[0].split('\\')[0],
            img:item.img.split("\\")[1].replace('"','')
          }
        )
      }
    })
    commit('saveAdsList',{list:adsList})
  },
  async getComplete({commit}){
    commit('saveComplete')
  }
}