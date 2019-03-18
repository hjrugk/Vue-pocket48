export default {
  setToken(state, token) {
    state.token = token
  },
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  postGroupInfo(state, group) {
    return state.memberInfo[group]
  },
  saveDetail(state, info) {
    state.detail = info
    localStorage.setItem('detail',JSON.stringify(info))
  },
  saveScrollTop(state){
    state.scrollTop = true
  },
  saveAllLive(state,{liveList,reviewList}){
    state.memberLiveList = liveList
    state.memberReviewList = reviewList
  },
  saveOpenReview(state,{list}){
    state.openReviewList = list
  },
  saveOpenLive(state,{list}){
    state.openLiveList = list
  },
  saveRoomList(state,{list}){
    state.roomList = list
  },
  saveAdsList(state,{list}){
    state.adsList = list
  },
  saveJuJuInfo(state,{info,recommend,friendsNum}){
    state.jujuInfo = {info,recommend,friendsNum}
  }
}