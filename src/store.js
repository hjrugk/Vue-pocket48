import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friends: localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).friends:[],
    token: localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).token:'',
    logFlag: localStorage.getItem('isLogin')?true:false,
    roomFlag: localStorage.getItem('isLogin')?true:false,
    userInfo: localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).userInfo:{},
    memberInfo: localStorage.getItem('memberInfo')?JSON.parse(localStorage.getItem('memberInfo')):{}
  },
  mutations: {
    setToken(state,info) {
      state.friends = info.friends
      state.token = info.token
    },
    changeFlag(state){
      state.logFlag = true
      state.roomFlag = true
      localStorage.setItem('isLogin',JSON.stringify({logFlag: state.logFlag,roomFlag: state.roomFlag}))
    },
    saveUserInfo(state, userInfo){
      state.userInfo = userInfo
    },
    saveMemberInfo(state,info){
      state.memberInfo = info
      localStorage.setItem('memberInfo',JSON.stringify(info))
    },
    postGroupInfo(state,group){
      return state.memberInfo[group]
    }
  },
  actions: {

  },
  getters: {

  }
})
