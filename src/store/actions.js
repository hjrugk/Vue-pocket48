import ajax from '../plugins/ajax'

export default {
  saveDetail({
    commit
  }, info) {
    commit('saveDetail', info)
  },
  async getAllLive({
    commit
  }) { // 获取成员直播
    const res1 = await ajax('/getAllLive', {
      record: false,
      userId: 0
    })
    const res2 = await ajax('/getAllLive', {
      record: true,
      userId: 0
    })
    let liveList = res1.content.liveList || [];
    let reviewList = res2.content.liveList || [];
    let newList = [...liveList, ...reviewList]
    commit('saveAllLive', {
      newList
    })
  },
  async getOpenLive({
    commit
  }) { // 获取公演直播
    const res = await ajax('getOpenLive')
    commit('saveOpenLive', {
      list: res.content.liveList
    })
  },
  async getRoomList({
    commit
  }, {
    token,
    friends
  }) { // 获取关注成员房间列表
    let list = []
    for (let i = 0; i < friends.length; i++) {
      const res = await ajax('/getRoomInfo', {
        token: token,
        userId: friends[i]
      }, 'POST')
      if (res.success) {
        list.push(res.content)
      }
    }
    commit('saveRoomList', {
      list
    })
  },
  // async getSwipeAds({
  //   commit
  // }) { // 从官网获取轮播图
  //   const res = await ajax('getForSwipeAds')
  //   let adsList = res.ad
  //   commit('saveAdsList', {
  //     list: [...adsList]
  //   })
  // },
  async getComplete({
    commit
  }) {
    commit('saveComplete')
  },
  // async getAkinaVideos({
  //   commit
  // }) {
  //   const res = await ajax('/getOpenLive', )
  //   commit('saveAkinaVideos', {
  //     list: res.content.liveList
  //   })
  // },
  async checkIsLogin(){
    if(localStorage.getItem('userinfo')){
      let userInfo = JSON.parse(localStorage.getItem('userinfo'))
      const res = await ajax('/getUserInfo',{token:userInfo.token,userId:userInfo.userInfo.userId},'POST')
      if(!res.success){
        localStorage.removeItem('isLogin')
        localStorage.removeItem('userinfo')
        this.$message.error('登录已失效，请重新登录')
        return setTimeout(function(){
          window.location.reload()
        },3000)
      }
    }
  }
}