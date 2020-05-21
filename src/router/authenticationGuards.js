import Store from '../store'
import Cookies from 'js-cookie'

const BEFORE_ENTER_HOME = (to, from, next) => {
  const tokenStore = Store.getters.token
  const cookieToken = Cookies.get('Authorization')

  if (!tokenStore && !cookieToken) {
    next('/signin')
  } else if (!tokenStore && cookieToken) {
    Store.commit('registerToken', cookieToken)
  } else if (!cookieToken && tokenStore) {
    Cookies.set('Authorization', tokenStore)
  }
  next()
}

export { BEFORE_ENTER_HOME }
