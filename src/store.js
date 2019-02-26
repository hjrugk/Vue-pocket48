import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')).token : '',
    logFlag: localStorage.getItem('isLogin') ? true : false,
    roomFlag: localStorage.getItem('isLogin') ? true : false,
    userInfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')).userInfo : {},
    memberInfo: localStorage.getItem('memberInfo') ? JSON.parse(localStorage.getItem('memberInfo')) : {},
    detail: {}
  },
  mutations: {
    setToken(state, info) {
      state.token = info.token
    },
    changeFlag(state) {
      state.logFlag = true
      state.roomFlag = true
      localStorage.setItem('isLogin', JSON.stringify({
        logFlag: state.logFlag,
        roomFlag: state.roomFlag
      }))
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    saveMemberInfo(state, info) {
      state.memberInfo = info
      localStorage.setItem('memberInfo', JSON.stringify(info))
    },
    postGroupInfo(state, group) {
      return state.memberInfo[group]
    },
    saveTeam(state, info) {
      state.detail = info
      localStorage.setItem('detail',JSON.stringify(info))
    }
  },
  actions: {

  },
  getters: {

  }
})