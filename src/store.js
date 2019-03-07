import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    logFlag: false,
    userInfo: {},
    detail: {},
    scrollTop: false
  },
  mutations: {
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
    }
  },
  actions: {
    saveDetail(context,info){
      context.commit('saveDetail',info)
    }
  },
  getters: {
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
    }
  }
})