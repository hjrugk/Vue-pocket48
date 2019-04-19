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
    localStorage.setItem('detail', JSON.stringify(info))
  },
  saveScrollTop(state) {
    state.scrollTop = true
  },
  saveAllLive(state, {
    newList
  }) {
    state.memberLiveList = newList
  },
  saveOpenLive(state, {
    list
  }) {
    state.openLiveList = list
  },
  saveRoomList(state, {
    list
  }) {
    state.roomList = list
  },
  saveAdsList(state, {
    list
  }) {
    state.adsList = list
  },
  saveComplete(state) {
    state.isComplete = true
  },
  saveAkinaVideos(state, {
    list
  }) {
    state.akinaVideos = list
  }
}