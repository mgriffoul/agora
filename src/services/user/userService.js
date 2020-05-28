import axios from 'axios'
import Cookies from 'js-cookie'

class UserService {
  getUser () {
    return axios({
      method: 'get',
      url: 'http://localhost:8090/user/test',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('Authorization')
      }
    }).then((response) => {
      return response.data
    }).catch((error) => {
      return error
    })
  }
}

export default new UserService()
