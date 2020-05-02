import axios from 'axios'
import Cookies from 'js-cookie'

const AGORA_API_BASE_URL = 'http://localhost:8090/authentication/'

class AuthenticationService {
  signUp (user, changeErrorState, validAndRedirect, resetErrorState) {
    return axios({
      method: 'post',
      url: AGORA_API_BASE_URL + 'signup',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 2000,
      data: {
        username: user.username,
        password: user.password,
        mail: user.mail
      }
    }).then(response => {
      if (response.status === 200) {
        Cookies.set('Authorization', response.data.jwtToken)
        resetErrorState()
        validAndRedirect()
        return response.data
      }
    }).catch(function (error) {
      if (error.response && error.response.status === 400) {
        changeErrorState(false, true, error.response.data.message)
        throw error.response.data.message
      } else {
        changeErrorState(true, false, 'Oups... Désolé. Un problème technique est survenu, veuillez réessayer ultérieurement.')
        throw error
      }
    })
  }

  logout () {
    Cookies.remove('Authorization')
  }

  login (user) {
    return axios
      .post(AGORA_API_BASE_URL + 'signin', {
        username: user.username,
        password: user.password,
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.data.jwtToken) {
          Cookies.set('Authorization', response.data.jwtToken)
        }
        return response.data
      }).catch(function (error) {
        console.error(error)
      })
  }

  healthCheck () {
    return axios.get('http://localhost:8090/check', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('Authorization')
      }
    }).then(response => {
      if (response.status === 200) {
        return response.data.message
      }
    })
  }
}

export default new AuthenticationService()
