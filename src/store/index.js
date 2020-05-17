import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: {
      token: Cookies.get('Authorization') || '',
      user: {
        role: '',
        status: '',
        username: '',
        mail: ''
      }
    }
  },
  getters: {
    userMail: state => {
      return state.authentication.user.mail
    },
    token: state => {
      return state.authentication.token
    }
  },
  mutations: {
    logUser (state, userInfo) {
      state.authentication.user.mail = userInfo.signedUpUser.mail
      state.authentication.user.username = userInfo.signedUpUser.username
      state.authentication.token = userInfo.jwtToken
      console.log(userInfo)
    },
    registerToken (state, token) {
      state.authentication.token = token
    }
  },
  actions: {

  },
  modules: {
  }
})
