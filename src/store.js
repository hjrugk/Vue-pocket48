import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friends: [],
    token: '',
    logFlag: false,
    roomFlag: false,
    userInfo: {}
  },
  mutations: {
    setToken(state,info) {
      state.friends = info.friends
      state.token = info.token
    },
    changeFlag(state){
      state.logFlag = true
      state.roomFlag = true
    },
    saveUserInfo(state, userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {

  },
  getters: {

  }
})
