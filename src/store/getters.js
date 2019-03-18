export default {
  getToken: state => {
    if(localStorage.getItem('userinfo')){
      state.token = JSON.parse(localStorage.getItem('userinfo')).token
      return state.token
    }
    return state.token
  },
  getUserInfo: state => {
    if(localStorage.getItem('userinfo')){
      state.userInfo = JSON.parse(localStorage.getItem('userinfo')).userInfo
      return state.userInfo
    }
  },
  checkLogin: state => {
    if (localStorage.getItem('isLogin')){
      state.logFlag = JSON.parse(localStorage.getItem('isLogin')).logFlag
      return state.logFlag
    }
  },
  memberAllLiveList: state => {
    let liveList = state.memberLiveList
    let reviewList = state.memberReviewList
    let list = [...liveList,...reviewList]
    if(list.length>8){
      list = list.slice(0,8)
    }
    return list
  }
}