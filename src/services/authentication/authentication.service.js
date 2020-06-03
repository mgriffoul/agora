import axios from 'axios'
import Cookies from 'js-cookie'
import {
  AGORA_API_BASE_URL,
  AUTHENTICATION_ENDPOINT
} from '../../constants'
import getErrorMessage from '../message/errorMessageService'

class AuthenticationService {
  signUp (user) {
    return axios({
      method: 'post',
      url: AGORA_API_BASE_URL + AUTHENTICATION_ENDPOINT + '/signup',
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
        return response.data
      }
    }).catch(function (apiError) {
      const error = { message: '', serverError: true }
      if (apiError?.response?.status === 400) {
        error.message = getErrorMessage(apiError?.response?.data?.message, user)
        error.serverError = false
        throw error
      }
      error.message = getErrorMessage('SERVER_ERROR', user)
      throw error
    })
  }

  signIn (user) {
    return axios
      .post(AGORA_API_BASE_URL + AUTHENTICATION_ENDPOINT + '/signin', {
        mail: user.mail,
        password: user.password,
        timeout: 2000,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.data.jwtToken) {
          Cookies.set('Authorization', response.data.jwtToken)
        }
        return response.data
      }).catch(function (apiError) {
        const error = { message: '', serverError: true }
        if (apiError?.response?.status === 400) {
          error.message = getErrorMessage(apiError?.response?.data?.message, user)
          error.serverError = false
          throw error
        }
        error.message = getErrorMessage('SERVER_ERROR', user)
        throw error
      })
  }

  logout () {
    Cookies.remove('Authorization')
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
