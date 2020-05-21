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
    logUser (state, authentication) {
      state.authentication = { ...authentication }
    }
  },
  actions: {
  },
  modules: {
  }
})
