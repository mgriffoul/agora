import axios from 'axios'
import Cookies from 'js-cookie'
import { AGORA_API_BASE_URL, USER_ENDPOINT } from '../../constants'

class UserService {
  getUser () {
    return axios({
      method: 'get',
      url: AGORA_API_BASE_URL + USER_ENDPOINT,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('Authorization')
      }
    }).then((response) => {
      return response.data
    }).catch((error) => {
      return error
    })
  }

  updateUser (user) {
    return axios({
      method: 'post',
      url: AGORA_API_BASE_URL + USER_ENDPOINT + '/update',
      data: user,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('Authorization')
      }
    }).then((response) => {
      return response.data
    }).catch((error) => {
      return error.message
    })
  }
}

export default new UserService()
