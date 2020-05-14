import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: {
      token: String,
      user: {
        role: String,
        status: String,
        username: String,
        mail: String
      }
    }
  },
  getters: {
    userMail: state => {
      return state.authentication.user.mail
    }
  },
  mutations: {
    logUser (state, userInfo) {
      state.authentication.user.mail = userInfo.signedUpUser.mail
      state.authentication.user.username = userInfo.signedUpUser.username
      state.authentication.token = userInfo.jwtToken
      console.log(userInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
