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
    return axios(AGORA_API_BASE_URL + USER_ENDPOINT + '/update', {
      mail: user.mail,
      password: user.username,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => 'ok').catch(() => 'pas ok')
  }
}

export default new UserService()
